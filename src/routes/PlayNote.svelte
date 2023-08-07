<script>
  import RadioButtons from '$lib/components/inputs/RadioButtons.svelte';
  import Staff from './Staff.svelte';
  import { fadeOptions, fade, waveTypeOptions, waveType } from '$lib/stores/settings'
</script>

<!-- <div>
	<label for="basic-range">Range Label</label>
	<Range on:change={(e) => fadeTime = e.detail.value} id="basic-slider" />
</div> -->

<Staff />


<RadioButtons options={fadeOptions} fontSize={16} legend='Fade time' bind:userSelected={$fade}/>

<RadioButtons options={waveTypeOptions} fontSize={16} legend='Wave type' bind:userSelected={$waveType}/>

<!-- <RadioButtons options={noteOptions} fontSize={16} legend='Note' bind:userSelected={note}/>

<RadioButtons options={octaveOptions} fontSize={16} legend='Octave' bind:userSelected={octave}/> -->

<!-- <button on:click={() => playNote(context, `${note}${octave}`, type, fade)}>Play note</button> -->