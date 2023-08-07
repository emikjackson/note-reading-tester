<script>
  import { browser } from '$app/environment'
  if (browser) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext
  }
</script>

<slot />