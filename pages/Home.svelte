<script>
  import { onMount } from "svelte";
  import { links } from "svelte-routing";
  import { api } from "/util/api";

  let models = [];
  onMount(async () => {
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
    <a href={`/model/${id}`} replace>{model_id} {name_jp}</a>
	{/each}
</div>