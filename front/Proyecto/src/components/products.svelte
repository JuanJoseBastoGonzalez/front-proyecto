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

    function toggProdcto() {
        isActiveCrud = !isActiveCrud;
    }

    function search() {
        showSearch = !showSearch;
    }
function update(){
    showUpdate = !showUpdate;
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
      <p>MENU PRODUCTOS</p>
      {#if !showSearch}
        <div class="f">
          <input
            class="wh"
            placeholder="Elemento a buscar"
            on:input={filterItem}
            bind:value={ElementSearch}
          />
          <button class="cp" on:click={search}>volver</button>
        </div>
      {/if}
      {#if showSearch}
        <div>
          <button class="cp" on:click={toggProdcto}>Crear</button>
          <button class="cp" on:click={search}>Buscar</button>
          <button class="cp" on:click={update}>Actualizar</button>
          <button class="cp">Eliminar</button>
        </div>
      {/if}
    {:else if !isActiveCrud  || showUpdate }
      <p>Productos</p>
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
      <section class="fcc">
        <button class="cp" on:click={toggProdcto}>Volver</button>
        <button class="cp" on:click={save}>Guardar</button>
      </section>
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
