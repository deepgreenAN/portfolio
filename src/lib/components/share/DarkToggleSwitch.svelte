<script lang="ts">
    import {is_dark_mode} from '$lib/darkmode_store';
</script>

<div class="flex flex-col gap-2 items-center cursor-pointer" on:click={()=>{is_dark_mode.inverse()}}>
    <svg
        class:is_dark_mode={$is_dark_mode}
        version="1.1"
        viewBox="0 0 512 512"
        enable-background="new 0 0 512 512"
        xmlns="http://www.w3.org/2000/svg">
        <g>
          <g>
            <path d="m 500,113.1 c -2.4,-7.5 -8.9,-13 -16.8,-14.1 L 428,91.1 403.4,42.2 c -3.5,-7 -10.7,-11.4 -18.5,-11.4 -7.8,0 -15,4.4 -18.5,11.4 L 341.8,91.1 286.6,99 c -7.8,1.1 -14.3,6.6 -16.8,14.1 -2.4,7.5 -0.3,15.8 5.4,21.3 l 39.7,37.9 -9.4,53.4 c -1.4,7.7 1.8,15.6 8.1,20.2 6.3,4.7 14.7,5.3 21.7,1.7 l 49.5,-25.5 49.5,25.5 c 3,1.5 6.2,2.3 9.5,2.3 4.3,0 8.6,-1.4 12.2,-4 6.3,-4.6 9.5,-12.5 8.1,-20.2 l -9.4,-53.4 39.7,-37.9 c 5.9,-5.5 8,-13.8 5.6,-21.3 z"/>
            <path d="m 442,361 c -14.9,3.4 -30.3,5.1 -45.7,5.1 -113.8,0 -206.4,-92.6 -206.4,-206.3 0,-41.8 12.4,-82 35.9,-116.3 4.8,-7 4.8,-16.3 0,-23.4 C 221,13 212.4,9.6 204,11.5 150,23.7 101,54.2 66,97.5 30.6,141.3 11,196.7 11,253.2 c 0,66.2 25.8,128.4 72.6,175.2 46.8,46.8 109.1,72.6 175.3,72.6 81.9,0 158.4,-40.4 204.8,-108.1 4.8,-7 4.8,-16.3 0,-23.4 -4.8,-7 -13.4,-10.4 -21.7,-8.5 z"/>
          </g>
        </g>
      </svg>

    <div class="relative">
      <div class="block bg-white w-9 h-5 rounded-full"></div>
      <div class="absolute left-0.5 top-0.5 bg-primary w-4 h-4 rounded-full transition" class:circle_is_dark_mode={$is_dark_mode}></div>
    </div>
</div>

<style>
    svg {
        @apply h-10 w-10 text-primary fill-current mx-auto;
    }
    .is_dark_mode {
        @apply text-darkprimary;
    }

    .circle_is_dark_mode {
        transform: translateX(100%);
    }
</style>