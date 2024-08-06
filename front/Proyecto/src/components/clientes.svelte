<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";
    import { showProdcts } from "../stores/Stores";
    let showod;
    let isActiveCrud: boolean = true;
    let errorMessage = "";
    let id: number;
    let credito: number;
    let cuenta: number;
    let empleado: number;
    let ubicacion: number;
    let nombres: string;
    let apellidos: string;
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
                    credito: data.credito,
                    cuenta: data.cuenta,
                    empleado: data.empleado,
                    ubicacion: data.ubicacion,
                    nombres: data.nombres,
                    apellidos: data.apellidos
                    
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
            credito:credito,
            cuenta: cuenta,
            empleado:empleado,
            ubicacion:ubicacion,
            nombres: nombres,
            apellidos: apellidos
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
    <input id="id" bind:value={id} placeholder="Ingrese un el Id del cliente" />
  </section>
  <section class="fcc">
    <label for="credito">Credito</label>
    <input
      id="credito"
      bind:value={credito}
      on:change={filterItem}
      placeholder="Ingrese el id del credito"
    />
  </section>
  <section class="fcc">
    <label for="nombres">Nombres</label>
    <input
      id="nombres"
      bind:value={nombres}
      on:change={filterItem}
      placeholder="Ingrese nombres"
    />
  </section>
  <section class="fcc">
    <label for="apellidos">Apellidos</label>
    <input
      id="apellidos"
      bind:value={apellidos}
      on:change={filterItem}
      placeholder="Ingrese apellidos"
    />
  </section>
  <section class="fcc">
    <label for="cuenta">Cuenta</label>
    <input
      id="cuenta"
      bind:value={cuenta}
      on:change={filterItem}
      placeholder="Ingrese cuenta"
    />
  </section>
  <section class="fcc">
    <label for="empleado">Empleado</label>
    <input
      id="empleado"
      bind:value={empleado}
      on:change={filterItem}
      placeholder="Ingrese empleado encargado"
    />
  </section>
  <section class="fcc">
    <label for="ubicacion">Ubicacion</label>
    <input
      id="ubicacion"
      bind:value={ubicacion}
      on:change={filterItem}
      placeholder="Ingrese ubicacion"
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
