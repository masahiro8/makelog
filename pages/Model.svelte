<script>
  import { onMount } from "svelte";
  import { api } from "/util/api";

  export let id;

  let _model = {
    id: null,
    model_id: null,
    name_jp: "",
    name_en: "",
    make_type: null,
    advice: null
  };

  onMount(async () => {
    const res = await api.getModel(id);
    _model = {
      ...res.data
    };
  });
</script>
<h1>Model {id}</h1>
<p>{_model.name_jp}</p>