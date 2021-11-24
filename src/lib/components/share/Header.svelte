<script lang="ts">
    import logo_icon_path from "@static/logo_icon.svg";
    import logo_white_path from "@static/logo/logo_white.png";
    //import logo_white_path from "logo/logo_white.png";
    import logo_black_path from "@static/logo/logo_black.png";
    //import logo_black_path from "logo/logo_black.png";
    import {is_dark_mode} from "$lib/darkmode_store";
    import DarkToggleSwitch from "./DarkToggleSwitch.svelte";

    let logo_path: string;
    $: {
        logo_path = $is_dark_mode? logo_white_path: logo_black_path;
    }

</script>

<div class="header" class:is_dark_mode={$is_dark_mode}>
    <a href="/">
        <div class="flex flex-row justify-start items-center">
            <img src={logo_icon_path} class="h-16 w-auto ml-4" alt="logo_icon">
            <img src={logo_path} class="h-20 w-auto" alt="logo">
        </div>
    </a>
    <div class="flex flex-row justify-end">
        <DarkToggleSwitch/>
        <div class="w-32"></div>
    </div>
</div>

<style>
    .header {
        @apply w-4/5 h-20 mt-2 bg-bgcolor opacity-70 mx-auto rounded-sm flex flex-row items-center justify-between;
        box-shadow: 1.95px 1.95px 2.6px rgb(0, 0, 0, 0.15);
    }
    .is_dark_mode {
        @apply bg-darkbgcolor;
        box-shadow: 1.95px 1.95px 2.6px rgb(0, 0, 0, 0.25);
    }
</style>