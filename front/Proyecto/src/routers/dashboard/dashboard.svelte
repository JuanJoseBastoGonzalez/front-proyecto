<!-- About.svelte -->
<script>
  import { link } from "svelte-spa-router";
  import Navbar from "../../components/nav.svelte";
  import { show } from "../../stores/Stores";
  import Sidebar from "../../components/Sidebar.svelte";
  import { rol } from "../../stores/Stores";
  import Employed from "../../components/products.svelte";
  import { showProdcts } from "../../stores/Stores";

  import "./Dashboard.css";
</script>

<div class="prubea">
    <Navbar />
   <div class="f ">
    {#if $show}
    <Sidebar />
    {/if}

    <div class="content">
      {#if $showProdcts}
        <Employed />
      {/if}
    </div>
  </div>
  <div></div>

  <!-- 
  <a  href ="/" use:link>fsdfs</a> -->
</div>
