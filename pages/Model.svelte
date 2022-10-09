<script>
  import { onMount } from "svelte";
  import { api } from "/util/api";

  export let id;
  export let makeTypes;
  export let faceParts;
  export let advices;

  let _model = {
    id: null,
    model_id: null,
    name_jp: "",
    name_en: "",
    make_type: null,
    advice: null
  };

  let facePartsAdvice = [0, 0, 0, 0, 0];

  onMount(async () => {
    const res = await api.getModel(id);
    _model = {
      ...res.data
    };
    console.log(_model);
  });

  const getAdviceLimitBy = facePartsId => {
    return advices.filter(item => item.face_part_id === facePartsId);
  };

  const onChangeMakeType = () => {
    console.log(_model);
  };

  const onChange = () => {
    console.log(facePartsAdvice);
    const model = { ..._model };
    model.advice = facePartsAdvice;
    _model = model;
  };

  const submit = () => {
    console.log(_model);
  };
</script>

<div class="page">

  <div class="page__section">
    <input bind:value={_model.name_jp} />
  </div>

  <!-- メイク -->
  <div class="page__section">
    <select 
      class="select__maketypes"
      bind:value={_model.make_type}
      on:change="{onChangeMakeType}"
    >
      {#each makeTypes as makeType}
        <option value={makeType.id}>
          {makeType.name_jp}
        </option>
      {/each}
    </select>
  </div>
  <!-- アドバイスをパーツごとに設定 -->
  <div class="parts__list">
    {#each faceParts as facePart,i}
      <div class="list__item">
        <div class="list__label">{facePart.name_jp}</div>
        <div class="list__select">
          <select
            bind:value="{facePartsAdvice[i]}"
            on:change="{onChange}"
          >
            <option value="0"></option>
            {#each advices.filter(item => item.face_part_id === facePart.id) as advice}
              <option value={advice.id}>
                {advice.text}
              </option>
            {/each}
          </select>
        </div>
        <button class="list__add">+</button>
      </div>
    {/each}
  </div>
  <button on:click={submit}>submit</button>
</div>
<style>
  select {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border-color: #ccc;
    border-radius: 4px;
  }
  select:hover {
    cursor: padding;
  }
  input {
    padding: 8px;
    font-size: 16px;
    display: block;
    width: 50%;
  }

  .select__maketypes {
    width: 50%;
  }

  .page {
    max-width: 800px;
    margin: auto;
    /* border: 1px solid #ccc; */
    padding: 16px;
  }

  .page__section {
    padding: 8px 0;
    text-align: left;
  }

  .list__item {
    display: flex;
    align-content: center;
    padding: 8px 0;
  }
  .list__label {
    width: 64px;
    line-height: 42px;
    text-align: left;
  }
  .list__select {
    flex: 1;
    text-align: left;
  }
  .list__add {
    width: 32px;
    height: 32px;
    margin: 0 8px;
  }
  .list__add:hover {
    cursor: pointer;
  }
</style>