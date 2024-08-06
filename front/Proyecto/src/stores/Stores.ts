import { writable } from 'svelte/store';

// Crea una store exportada para `show` con un valor inicial
export const show = writable(false);
export const rol = writable("admin");
export const showProdcts = writable(false);
export const showoduct = writable(false);