<script lang="ts">
    import logo_white_path from "@static/logo/logo_white.png";
    import logo_black_path from "@static/logo/logo_black.png";
    import {is_dark_mode} from "$lib/darkmode_store";

    //export let is_dark_mode: boolean;
    let logo_path: string;
    $: {
        logo_path = $is_dark_mode? logo_white_path: logo_black_path;
    }

</script>

<div class="header" class:is_dark_mode={$is_dark_mode}>
    <img src={logo_path} class="h-20 mb-2 ml-4" alt="logo">
</div>

<style>
    .header {
        @apply w-4/5 h-20 mt-2 bg-gray-200 opacity-70 mx-auto rounded-sm;
        box-shadow: 1.95px 1.95px 2.6px rgb(0, 0, 0, 0.15);
    }
    .is_dark_mode {
        @apply bg-gray-700;
        box-shadow: 1.95px 1.95px 2.6px rgb(0, 0, 0, 0.25);
    }
</style>