import { writable } from 'svelte/store';

export const windowHeight = writable(40);
export const toolSectionHeight = writable(50);
export const radioSection = writable(40);

export let loadArray = writable();
export let userUID = writable();

export let firebaseApp = writable();
export let firebaseDB = writable();