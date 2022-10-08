<script>
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import Model from "./pages/Model.svelte";
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
      <Model id="{params.id}" />
    </Route>
  </main>
</Router>