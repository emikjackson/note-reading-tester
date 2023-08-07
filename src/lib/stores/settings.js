import { writable } from 'svelte/store';

export const fadeOptions = [0.5, 1, 5];
export const fade = writable(fadeOptions[0]);

export const waveTypeOptions = ['sine', 'triangle', 'square', 'sawtooth']
export const waveType = writable(waveTypeOptions[0]);


