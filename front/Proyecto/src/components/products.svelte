<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";
    import { showProdcts } from "../stores/Stores";

    let showod;
    let isActiveCrud: boolean = true;
    let errorMessage = "";
    let id: number;
    let oficina: string;
    let nombres: string;
    let apellidos: string;
    let cuenta: string;
    let jefe: string;
    let puesto: string;
    let email: string;
    let contacto: string;
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
                    oficina: data.oficina,
                    nombres: data.nombres,
                    apellidos: data.apellidos,
                    cuenta: data.cuenta,
                    jefe: data.jefe,
                    puesto: data.puesto,
                    email: data.email,
                    contacto: data.contacto,
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
            oficina: oficina,
            nombres: nombres,
            apellidos: apellidos,
            cuenta: cuenta,
            jefe: jefe,
            puesto: puesto,
            email: email,
            contacto: contacto,
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
    <button class="cp3" on:click={crate}>Crear</button>
    <button class="cp3" on:click={search}>Buscar</button>
    <button class="cp3" on:click={update}>Actualizar</button>
    <button class="cp3" on:click={deletle}>Eliminar</button>
    <button class="cp3" on:click={exit}>salir</button>
  </div>
  {/if}
  {#if !showSearch || !showdelte}
        <div class="f">
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
          <button class="cp2" on:click={search}>volver</button>
          <button class="cp" >buscar</button>
          {/if}
          {#if !showdelte}
          <button class="cp2" on:click={deletle}>volver</button>
          <button class="cp" >borrar</button>
          {/if}
        </div>
      {/if}

  {#if !showUpdate || !isActiveCreate }
  <div class="crud">
  <section class="fcc">
    <label for="id">ID</label>
    <input id="id" bind:value={id} placeholder="Ingrese un ID" />
  </section>
  <section class="fcc">
    <label for="oficina">Oficina</label>
    <input
      id="oficina"
      bind:value={oficina}
      on:change={filterItem}
      placeholder="Ingrese una oficina"
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
    <label for="jefe">Jefe</label>
    <input
      id="jefe"
      bind:value={jefe}
      on:change={filterItem}
      placeholder="Ingrese jefe"
    />
  </section>
  <section class="fcc">
    <label for="puesto">Puesto</label>
    <input
      id="puesto"
      bind:value={puesto}
      on:change={filterItem}
      placeholder="Ingrese puesto"
    />
  </section>
  <section class="fcc">
    <label for="email">Email</label>
    <input
      id="email"
      bind:value={email}
      on:change={filterItem}
      placeholder="Ingrese email"
    />
  </section>
  <section class="fcc">
    <label for="contacto">Contacto</label>
    <input
      id="contacto"
      bind:value={contacto}
      on:change={filterItem}
      placeholder="Ingrese contacto"
    />
  </section>
</div>
{#if !isActiveCreate}
<button class="cp2" on:click={crate}>Volver</button>
<button class="cp2" >Guardar</button>
{/if}
{#if !showUpdate}
<button class="cp2" on:click={update}>Volver</button>
<button class="cp2" >Guardar</button>
{/if}

  {/if}
  
  </div>
<style lang="less">
  .cp2 {
    margin-top: 10px;
    height: 50px; 
    width: 100%; 
    background-color: #007bff; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    border: none; 
    border-radius: 5px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
    cursor: pointer; 
    font-size: 1rem; 
    transition: background-color 0.3s, box-shadow 0.3s; 
  }

  .crud {
    overflow: hidden;
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 1rem; 
  }

  .fcc {
    display: flex;
    flex-direction: column;
  }

  .fcc label {
    font-size: 1rem; 
    margin-bottom: 0.5rem; 
  }

  .fcc input {
    overflow: hidden;
    padding: 0.75rem;
    border: 1px solid #ced4da; 
    border-radius: 0.25rem; 
    font-size: 1rem; 
    color: #495057; 
    background-color: #fff; 
    box-sizing: border-box;
  }


  .fcc input:focus {
    border-color: #007bff; 
    outline: none; 
    box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25); 
  }

  .cp3 {
    flex: 1; 
    margin: 0 5px; 
    padding: 10px; 
    background-color: #007bff; 
    color: white; 
    border: none; 
    border-radius: 5px; /* Bordes redondeados */
    cursor: pointer; /* Cambia el cursor para indicar que es interactivo */
    font-size: 1rem; 
    transition: background-color 0.3s, box-shadow 0.3s; 
    text-align: center; 
    overflow-y: hidden;
  }

  .cp3:hover,
  .cp2:hover {
    background-color: #0056b3; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }



  @media (max-width: 768px) {
    .crud {
      grid-template-columns: 1fr; 
    }

    .cp2,
    .cp3 {
      height: 40px; /* Ajusta la altura para pantallas más pequeñas */
      font-size: 0.875rem; /* Tamaño de fuente más pequeño */
    }

    .fcc {
      flex-direction: column; /* Asegura que los campos de entrada se muestren en una sola columna */
    }
  }

  @media (min-width: 769px) and (max-width: 992px) {
    .crud {
      grid-template-columns: repeat(2, 1fr); /* Dos columnas */
    }

    .cp2,
    .cp3 {
      height: 45px; /* Ajusta la altura para pantallas medianas */
      font-size: 0.95rem; /* Tamaño de fuente ligeramente más pequeño */
    }
  }

  @media (min-width: 993px) {
    .crud {
      grid-template-columns: repeat(3, 1fr); /* Tres columnas */
    }

    .cp2,
    .cp3 {
      height: 50px; /* Altura estándar para pantallas grandes */
      font-size: 1rem; /* Tamaño de fuente estándar */
    }
  }




</style>
