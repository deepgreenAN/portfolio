<script lang="ts">
    import {is_dark_mode} from '$lib/darkmode_store';
</script>

<div class="flex flex-row w-full h-7 justify-between items-center bg-bgcolor bg-opacity-60 text-primary" class:is_dark_mode={$is_dark_mode}>
    <div class="hidden w-1/3 md:block"> </div>
    <div class="w-full text-center sm:w-1/2 md:w-1/3">Copyright &copy; 2021 Asami Naoto</div>
    <div class="hidden w-1/2 text-right sm:block  md:w-1/3">
        <div class="mr-4">
            This portfolio is managed in <a href="https://github.com/deepgreenAN/portfolio">this</a>
        </div>
    </div>
</div>

<style>
    .is_dark_mode {
        @apply bg-darkbgcolor text-darkprimary bg-opacity-60;
    }

    a {
        @apply hover:underline text-blue-500;
    }
</style>
