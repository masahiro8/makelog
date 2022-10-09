<script>
  import { onMount } from "svelte";
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import Model from "./pages/Model.svelte";
  import { api } from "/util/api";

  let makeTypes = [];
  let faceParts = [];
  let advices = [];
  onMount(async () => {
    // メイクタイプ
    const _makeTypes = await api.getMakeTypes();
    makeTypes = _makeTypes.data;
    console.log("makeTypes", makeTypes);

    // フェイスパーツ
    const _faceParts = await api.getFaceParts();
    faceParts = _faceParts.data;
    console.log("faceParts", faceParts);

    // フェイスパーツ
    const _advices = await api.getAdvices();
    advices = _advices.data;
    console.log("advices", advices);
  });
</script>

<style>
  main {
    font-family: sans-serif;
    text-align: center;
  }
</style>

<Router>
  <nav>
    <Link to="/">home</Link>
    <Link to="model">model</Link>
  </nav>
	<main>
    <Route path="/" component={Home} />
    <Route path="model/:id" let:params>
      <Model id="{params.id}" makeTypes="{makeTypes}" faceParts="{faceParts}" advices="{advices}" />
    </Route>
  </main>
</Router>