<script lang="ts">
    import {is_dark_mode} from '$lib/darkmode_store';
</script>

<div class="w-full h-7 text-center bg-bgcolor bg-opacity-60 text-primary" class:is_dark_mode={$is_dark_mode}>
    Copyright &copy; 2021 Asami Naoto
</div>

<style>
    .is_dark_mode {
        @apply bg-darkbgcolor text-darkprimary bg-opacity-60;
    }
</style>
