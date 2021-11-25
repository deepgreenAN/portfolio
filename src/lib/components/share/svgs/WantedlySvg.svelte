<script lang="ts">
    export let is_dark_mode: boolean;
</script>

<style>  
    svg {
      @apply h-10 w-10 text-primary hover:text-bgcolor fill-current mx-auto;
    }
    .is_dark_mode {
      @apply text-darkprimary hover:text-darkbgcolor;
    }
</style>

<svg
    class:is_dark_mode={is_dark_mode} 
   width="141.96339mm"
   height="100.0673mm"
   viewBox="0 0 141.96339 100.0673"
   version="1.1"
   id="svg17480"
   xmlns="http://www.w3.org/2000/svg"
    >
  <g
     transform="translate(-37.441117,-92.814895)">
    <path
       id="path18140"
       d="m 179.15651,109.86063 a 16.889515,16.797735 0 0 1 -16.88952,16.79774 16.889515,16.797735 0 0 1 -16.88951,-16.79774 16.889515,16.797735 0 0 1 16.88951,-16.797734 16.889515,16.797735 0 0 1 16.88952,16.797734 z M 89.760816,93.799135 130.28167,191.5907 c 0.24819,1.12888 1.73329,1.61445 2.43217,0.0459 l 13.95056,-33.77504 c -5.46951,-4.64349 -18.88947,-40.36598 -29.18603,-63.878865 z m -51.947466,0 40.520857,97.791565 c 0.24819,1.12888 1.73329,1.61445 2.43217,0.0459 L 94.716935,157.86156 C 89.247421,153.21807 75.827468,117.49558 65.530901,93.982695 Z" />
  </g>
</svg>