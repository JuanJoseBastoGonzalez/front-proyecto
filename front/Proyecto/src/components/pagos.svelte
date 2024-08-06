<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";
    import { showProdcts } from "../stores/Stores";
    let showod;
    let isActiveCrud: boolean = true;
    let errorMessage = "";
    let id: number;
    let monto: number;
    let pedido:number;
    let fecha_pago:Date;
    let ElementSearch: string = "";
    let error: string = "";
    let loading: boolean = true;
    let info: any[] = [];
    let showSearch: boolean = true;
    let showUpdate:boolean=true;
    let showdelte:boolean=true;

    function toggProdcto() {
        isActiveCrud = !isActiveCrud;
    }
    let isActiveCreate:boolean=true;
    function crate(){
      isActiveCreate = !isActiveCreate;
    }

    function search() {
        showSearch = !showSearch;
    }
function update(){
    showUpdate = !showUpdate;
}
function deletle(){
  showdelte = !showdelte;
}

function exit(){
  $showProdcts = !$showProdcts;
}
    async function filterItem() {
        onMount(async () => {
            try {
                const response = await axios.get(
                    `https://jsonplaceholder.typicode.com/posts/${ElementSearch}`,
                );
                info = response.data.map((data: any) => ({
                    id: data.id,
                    monto:data.monto,
                    fecha_pago:data.fecha_pago,
                    pedido:data.pedido
                }));
            } catch (erro) {
                error = "fail";
            } finally {
                loading = false;
            }
            console.log("logrado");
        });
    }

    async function save() {
        loading = true;
        const url = "https://jsonplaceholder.typicode.com/posts/1";
        const updatedData = {
            id: id,
            monto:monto,
            fecha_pago:fecha_pago,
            pedido:pedido
        };
        try {
            const response = await axios.put(url, updatedData);
            info = response.data;
            alert("Datos actualizados con éxito");
        } catch (error) {
            console.error("Error al actualizar los datos:", error);
            errorMessage = "Error al guardar los datos";
            alert(errorMessage);
        } finally {
            loading = false;
        }
    }

    
</script>

<div class="cpw gcc">
  {#if isActiveCrud}
    <div>
    <button class="cp" on:click={crate}>Crear</button>
    <button class="cp" on:click={search}>Buscar</button>
    <button class="cp" on:click={update}>Actualizar</button>
    <button class="cp" on:click={deletle}>Eliminar</button>
    <button class="cp" on:click={exit}>salir</button>
  </div>
  {/if}
  {#if !showSearch || !showdelte}
        <div class="f">
    <!--       <input
            class="wh"
            placeholder="Elemento a buscar"
            on:input={filterItem}
            bind:value={ElementSearch}
           -->
          
           <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
              <a class="navbar-brand">Navbar</a>
              <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </nav>

          
          {#if !showSearch} 
          <button class="cp" on:click={search}>volver</button>
          <button class="cp" >buscar</button>
          {/if}
          {#if !showdelte}
          <button class="cp" on:click={deletle}>volver</button>
          <button class="cp" >borrar</button>
          {/if}
        </div>
      {/if}




<!-- Vertically centered modal -->








  {#if !showUpdate || !isActiveCreate }
  <div class="modal-dialog modal-dialog-centered">
  <p>Productos</p>
  <section class="fcc">
    <label for="id">ID</label>
    <input id="id" bind:value={id} placeholder="Ingrese un el Id del pago" />
  </section>
  <section class="fcc">
    <label for="monto">monto</label>
    <input
      id="monto"
      bind:value={monto}
      on:change={filterItem}
      placeholder="Ingrese el valor del monto"
    />
  </section>
  <section class="fcc">
    <label for="fecha_pago">Fecha de pago</label>
    <input
      id="fecha_pago"
      bind:value={fecha_pago}
      on:change={filterItem}
      placeholder="Ingrese la fecha pago de pago"
    />
  </section>
  <section class="fcc">
    <label for="pedido">Pedido</label>
    <input
      id="pedido"
      bind:value={pedido}
      on:change={filterItem}
      placeholder="Ingrese el id del pedido "
    />
  </section>
</div>
{#if !isActiveCreate}
<button class="cp" on:click={crate}>Volver</button>
<button class="cp" >Guardar</button>
{/if}
{#if !showUpdate}
<button class="cp" on:click={update}>Volver</button>
<button class="cp" >Guardar</button>
{/if}

  {/if}
  
  </div>
<style lang="less">
    .wh {
        width: 15rem;
        height: 1rem;
    }
    .cpw {
        background-color: aqua;
        height: auto;
        width: 50rem;
        margin: auto;
    }
</style>
