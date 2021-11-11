<script lang="ts">
    import logo_white_path from "@static/logo/logo_white.png";
    import logo_black_path from "@static/logo/logo_black.png";

    export let is_dark_mode: boolean;
    let logo_path: string;
    $: {
        logo_path = is_dark_mode? logo_white_path: logo_black_path;
    }

</script>

<div class="w-4/5 h-20 mt-2 bg-gray-200 opacity-70 mx-auto rounded-sm" class:is_dark_mode={is_dark_mode}>
    <img src={logo_path} class="h-20 mb-2 ml-4" alt="logo">
</div>

<style>
    .is_dark_mode {
        @apply bg-gray-700;
    }
</style>