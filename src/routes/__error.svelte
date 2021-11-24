<script context="module" lang="ts">
    import type { ErrorLoad } from '@sveltejs/kit'
    export const load: ErrorLoad = ({error, status}) => {
        return {
            props:{
                status_code: `${status}`,
                message: `${error.message}`
            }
        }
    }
</script>

<script lang="ts">
    export let status_code: string;
    export let message: string;
    import {is_dark_mode} from '$lib/darkmode_store';
</script>

<svelte:head>
    <title>{status_code}</title>
</svelte:head>

<div class="w-3/5 mx-auto flex flex-col">
    <div class="mt-5"></div>
    <div class=box class:box_is_dark_mode={$is_dark_mode}>
        <div class="markdown">
            <h1>{status_code}</h1>
            <p>{message}</p>
        </div>
    </div>
    <div class="mb-5"></div>
</div>

<style>
    .box {
        @apply bg-bgcolor bg-opacity-60 border-border border-solid rounded text-primary text-opacity-100 p-2;
        box-shadow: 1.95px 1.95px 2.6px rgb(0, 0, 0, 0.15);
    }
    .box_is_dark_mode {
        @apply bg-darkbgcolor bg-opacity-60 border-darkborder border-solid rounded text-darkprimary text-opacity-100 p-2;
        box-shadow: 1.95px 1.95px 2.6px rgb(0, 0, 0, 0.25);
    }
</style>
