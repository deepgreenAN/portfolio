<script lang="ts">
    import logo_icon_path from "@static/logo_icon.svg?url";  // sttic(画像として)

    import logo_white_path from "@static/logo/logo_white.png";  // static
    import logo_black_path from "@static/logo/logo_black.png";  // static
    import {is_dark_mode} from "$lib/darkmode_store";
    import DarkToggleSwitch from "./DarkToggleSwitch.svelte";

    let logo_path: string;
    $: {
        logo_path = $is_dark_mode? logo_white_path: logo_black_path;
    }

</script>

<div class="header" class:is_dark_mode={$is_dark_mode}>
    <a href="/">
        <div class="flex flex-row items-center">
            <div class="h-16 ml-4"></div>
            <img src={logo_icon_path} class="h-16 ml-4" alt="logo_icon">
            <div class="aspect-w-5 aspect-h-1 w-80">
                <img src={logo_path} id="text-logo" alt="logo">
            </div>
        </div>
    </a>
    <div class="flex flex-row justify-end">
        <DarkToggleSwitch/>
        <div class="w-4 sm:w-32"></div>
    </div>
</div>

<style>
    .header {
        @apply max-w-full sm:w-4/5 h-20 mt-2 mx-2 sm:mx-auto bg-bgcolor opacity-70 rounded-sm flex flex-row items-center justify-between;
        box-shadow: 1.95px 1.95px 2.6px rgb(0, 0, 0, 0.15);
    }
    .is_dark_mode {
        @apply bg-darkbgcolor;
        box-shadow: 1.95px 1.95px 2.6px rgb(0, 0, 0, 0.25);
    }
    #text-logo {
        aspect-ratio: 5/1;
    }
</style>