<script>
  import { browser } from '$app/environment'
  import { onMount } from 'svelte';
  import { playNote } from '$lib/helpers.js'
  let context;
  import { fade, waveType } from '$lib/stores/settings'

  // all possible notes - should change this and "getYFromNote" to be a better Y lookup
  const allNotes = ['G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5']

  // notes to render
  const notes = ['G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5']
  const noteLength = 38; // approximate length of note with letter in it
  let width = noteLength * notes.length;
  let interval = null;
  let playedNoteIndex = -1;

  const getYFromNote = (note) => {
    const index = allNotes.findIndex(currNote => currNote === note);
    return ((allNotes.length - index) * 10) + 20;
  }

  const play = () => {
    playedNoteIndex = 0;
    interval = setInterval(() => {
      playNote(notes[playedNoteIndex], $waveType, $fade)
      playedNoteIndex = playedNoteIndex + 1;
      if (playedNoteIndex == notes.length && interval) {
        clearInterval(interval);
        interval = null;
      }
    }, 300)
  }

  const stop = () => {
    playedNoteIndex = -1;
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  $: console.log("intervaal", interval)

  // initialize audio context when rendered
  onMount(() => {
    if (browser) {
      context = new AudioContext();
    }
  });
</script>

<svg width={width} height="220px" viewBox="0 0 {width} 220" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect id="L+3" fill="#F4F4F4" x="0" y="0" width={width} height="20"></rect>
      <rect id="L+2" fill="#EAEAEA" x="0" y="20" width={width} height="20"></rect>
      <rect id="L+1" fill="#F4F4F4" x="0" y="40" width={width} height="20"></rect>
      <rect id="L4" fill="#EAEAEA" x="0" y="60" width={width} height="20"></rect>
      <rect id="L3" fill="#F4F4F4" x="0" y="80" width={width} height="20"></rect>
      <rect id="L2" fill="#EAEAEA" x="0" y="100" width={width} height="20"></rect>
      <rect id="L1" fill="#F4F4F4" x="0" y="120" width={width} height="20"></rect>
      <rect id="L-1" fill="#EAEAEA" x="0" y="140" width={width} height="20"></rect>
      <rect id="L-2" fill="#F4F4F4" x="0" y="160" width={width} height="20"></rect>
      <line x1="0" y1="60" x2={width} y2="60" id="line" stroke="#4B4B4B" stroke-linecap="square"></line>
      <line x1="0" y1="80" x2={width} y2="80" id="line" stroke="#4B4B4B" stroke-linecap="square"></line>
      <line x1="0" y1="100" x2={width} y2="100" id="line" stroke="#4B4B4B" stroke-linecap="square"></line>
      <line x1="0" y1="120" x2={width} y2="120" id="line" stroke="#4B4B4B" stroke-linecap="square"></line>
      <line x1="0" y1="140" x2={width} y2="140" id="line" stroke="#4B4B4B" stroke-linecap="square"></line>
      <line x1="0" y1="160" x2="50" y2="160" id="short-line" stroke="#4B4B4B" stroke-linecap="square"></line>
      <line x1="0" y1="180" x2="50" y2="180" id="short-line" stroke="#4B4B4B" stroke-linecap="square"></line>
      <rect id="Sidebar" stroke="#979797" fill="#D8D8D8" x="0.157142857" y="0.5" width="8.25714286" height="179"></rect>
      {#each notes as note, i}
        {@const y = getYFromNote(note)}
        {@const x = (i * 36) + 30}
        {@const play = () => playNote(note, $waveType, $fade)}
        {@const highlight = playedNoteIndex === i}
        <!-- <ellipse tabindex={0} on:keydown={play} on:click={play} class="note" class:highlight stroke="#979797" cx={x} cy={y} rx="14.5" ry="10"></ellipse> -->
        <ellipse tabindex={0} on:keydown={play} on:click={play} 
            class="note-quarter" class:highlight cx={x} cy={y} rx="14.5" ry="10"></ellipse>
        <text class="note-text" class:highlight font-family="Galvji-Bold, Galvji" font-size="14" font-weight="bold" >
          <tspan x={x - 5.2} y={y + 5}>{note.charAt(0)}</tspan>
        </text>
      {/each}
  </g>
</svg>

<button on:click={interval != null ? stop : play}>{interval != null ? 'Stop' : 'Play'}</button>

<style>
  .note {
    fill: #ffffff;
    stroke: #7aa9bb;
    transform-origin: center center;
    transform-box: fill-box;
    filter: drop-shadow(0px 1px 2px rgb(0 0 0 / 0.4));
    transition: all 0.15s ease-out;
    cursor: pointer;
  }
  .note-text {
    pointer-events: none;
    fill: #0f4960;
  }
  .note-text.highlight {
    fill: black;
  }
  .note-quarter {
    fill: black;
  }
  :hover.note, :focus.note, .note.highlight {
    fill: rgb(228, 249, 255);
    filter: drop-shadow(0px 1px 2px rgb(0 0 0 / 0.5));
  }
</style>