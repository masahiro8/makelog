<script>
  import { onMount } from "svelte";
  import { links } from "svelte-routing";
  import { api } from "/util/api";

  let models = [];
  onMount(async () => {
    // モデル一覧
    const res = await api.getModels();
    models = res.data
      .map(item => item)
      .sort((prev, nxt) => {
        return prev.model_id > nxt.model_id ? 1 : -1;
      });
  });

  const onClickModel = () => {};
</script>
<h1>Home</h1>
<div class="table__models" use:links>
	{#each models as { id, name_jp, model_id }, i}
    <a class="table__item" href={`/model/${id}`} replace>{model_id} {name_jp}</a>
	{/each}
</div>
<style>
  .table__models {
    max-width: 800px;
    margin: auto;
  }
  .table__item {
    display: block;
    text-align: left;
    text-decoration: none;
    border-bottom: 1px solid #efefef;
    padding: 6px;
    color: #666;
  }
  .table__item:hover {
    color: black;
    background-color: #f8f8f8;
  }
</style>