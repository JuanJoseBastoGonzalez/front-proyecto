<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import { instance, showProdcts } from "../stores/Stores";

  let isActiveCrud: boolean = true;
  let errorMessage = "";
  let id: number;
  let precio: number;
  let dimencion_id: number;
  let gama_producto_id: number;
  let proveedor_id: number;
  let stock_id: number;
  let descripcion: string;
  let nombre: string;
  let ElementSearch: string = "";
  let error: string = "";
  let loading: boolean = true;
  let info: any[] = [];
  let showSearch: boolean = true;
  let showUpdate: boolean = true;
  let showDelete: boolean = true;
  let isActiveCreate: boolean = true;

  function toggleProduct() {
    isActiveCrud = !isActiveCrud;
  }

  function crate() {
    isActiveCreate = !isActiveCreate;
  }

  function search() {
    showSearch = !showSearch;
  }

  function update() {
    showUpdate = !showUpdate;
  }

  function deleteToggle() {
    showDelete = !showDelete;
  }

  function exit() {
    $showProdcts = !$showProdcts;
  }

  async function filterItem() {
    loading = true;
    try {
      const response = await axios.get(`http://localhost:8091/api/productos/${id}`);
      info = response.data.map((data: any) => ({
        id: data.id,
        precio: data.precio,
        dimencion_id: data.dimencion_id,
        gama_producto_id: data.gama_producto_id,
        proveedor_id: data.proveedor_id,
        stock_id: data.stock_id,
        descripcion: data.descripcion,
        nombre: data.nombre,
      }));
    } catch (error) {
      error = "Error al buscar el producto.";
    } finally {
      loading = false;
    }
  }

  async function save() {
    loading = true;
    const url = `http://localhost:8091/api/productos/${id}`;
    const updatedData = {
      id: id,
      precio: precio,
      dimencion_id: dimencion_id,
      gama_producto_id: gama_producto_id,
      proveedor_id: proveedor_id,
      stock_id: stock_id,
      descripcion: descripcion,
      nombre: nombre,
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

  async function deleteProduct() {
    loading = true;
    try {
      await instance.delete(`productos/${id}`);
      alert("Producto eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      errorMessage = "Error al eliminar el producto";
      alert(errorMessage);
    } finally {
      loading = false;
    }
  }

  async function createProduct() {
    loading = true;
    const url = `http://localhost:8091/api/productos`;
    const newProduct = {
      precio: precio,
      dimencion_id: dimencion_id,
      gama_producto_id: gama_producto_id,
      proveedor_id: proveedor_id,
      stock_id: stock_id,
      descripcion: descripcion,
      nombre: nombre
    };
    try {
      await axios.post(url, newProduct);
      alert("Producto creado exitosamente");
    } catch (error) {
      console.error("Error al crear el producto:", error);
      errorMessage = "Error al crear el producto";
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
      <button class="cp3" on:click={deleteToggle}>Eliminar</button>
      <button class="cp3" on:click={exit}>Salir</button>
    </div>
  {/if}
  
  {#if !showSearch || !showDelete}
    <div class="f">
      <input
        class="form-control me-2"
        bind:value={id}
        type="search"
        placeholder="ID del producto"
        aria-label="Search"
      />

      {#if !showSearch}
        <button class="cp2" on:click={search}>Volver</button>
        <button class="cp" on:click={filterItem}>Buscar</button>
      {/if}
      {#if !showDelete}
        <button class="cp2" on:click={deleteToggle}>Volver</button>
        <button class="cp" on:click={deleteProduct}>Eliminar</button>
      {/if}
    </div>
  {/if}

  {#if !showUpdate || !isActiveCreate}
    <div class="crud">
      <section class="fcc">
        <label for="id">ID</label>
        <input id="id" bind:value={id} placeholder="Ingrese un ID" />
      </section>
      <section class="fcc">
        <label for="precio">Precio</label>
        <input
          id="precio"
          type="number"
          bind:value={precio}
          placeholder="Ingrese el precio"
        />
      </section>
      <section class="fcc">
        <label for="dimencion_id">Dimensión ID</label>
        <input
          id="dimencion_id"
          type="number"
          bind:value={dimencion_id}
          placeholder="Ingrese ID de dimensión"
        />
      </section>
      <section class="fcc">
        <label for="gama_producto_id">Gama Producto ID</label>
        <input
          id="gama_producto_id"
          type="number"
          bind:value={gama_producto_id}
          placeholder="Ingrese ID de gama de producto"
        />
      </section>
      <section class="fcc">
        <label for="proveedor_id">Proveedor ID</label>
        <input
          id="proveedor_id"
          type="number"
          bind:value={proveedor_id}
          placeholder="Ingrese ID de proveedor"
        />
      </section>
      <section class="fcc">
        <label for="stock_id">Stock ID</label>
        <input
          id="stock_id"
          type="number"
          bind:value={stock_id}
          placeholder="Ingrese ID de stock"
        />
      </section>
      <section class="fcc">
        <label for="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          bind:value={descripcion}
          placeholder="Ingrese una descripción"
        ></textarea>
      </section>
      <section class="fcc">
        <label for="nombre">Nombre</label>
        <input
          id="nombre"
          bind:value={nombre}
          placeholder="Ingrese el nombre"
        />
      </section>
    </div>
    {#if !isActiveCreate}
      <button class="cp2" on:click={crate}>Volver</button>
      <button class="cp2" on:click={save}>Guardar</button>
    {/if}
    {#if !showUpdate}
      <button class="cp2" on:click={update}>Volver</button>
      <button class="cp2" on:click={save}>Guardar</button>
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
    transition:
      background-color 0.3s,
      box-shadow 0.3s;
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

  .fcc input,
  .fcc textarea {
    overflow: hidden;
    padding: 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    font-size: 1rem;
    color: #495057;
    background-color: #fff;
    box-sizing: border-box;
  }

  .fcc input:focus,
  .fcc textarea:focus {
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
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition:
      background-color 0.3s,
      box-shadow 0.3s;
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
      height: 40px;
      font-size: 0.875rem;
    }

    .fcc {
      flex-direction: column;
    }
  }

  @media (min-width: 769px) and (max-width: 992px) {
    .crud {
      grid-template-columns: repeat(2, 1fr);
    }

    .cp2,
    .cp3 {
      height: 45px;
      font-size: 0.95rem;
    }
  }

  @media (min-width: 993px) {
    .crud {
      grid-template-columns: repeat(3, 1fr);
    }

    .cp2,
    .cp3 {
      height: 50px;
      font-size: 1rem;
    }
  }
</style>
