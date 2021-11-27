<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import type {HtmlWithMeta} from "$lib/convert_markdown";

    const ARTICLE_URL = "/works"
    export const load: Load = async({page, fetch}) => {
        const html_with_meta_res = await fetch(ARTICLE_URL + "/" + page.params.slug + ".json");
        if (html_with_meta_res.ok) {
            let html_with_meta: HtmlWithMeta = await html_with_meta_res.json();
            html_with_meta.meta_property.page_path = page.path;
            return {props: {html_with_meta}}
        }
    };
</script>

<script lang="ts">
    import Seo from '$lib/components/share/Seo.svelte';

    export let html_with_meta: HtmlWithMeta;
    const meta_property = html_with_meta.meta_property;
    import {is_dark_mode} from '$lib/darkmode_store';
</script>

<Seo 
    title={meta_property.title}
    page_desc={meta_property.page_desc}
    page_path={meta_property.page_path}
    og_image_url={meta_property.og_image_url}
    is_top_page={false} 
/>
<svelte:head>
    <!-- <title>{html_with_meta.title}</title> -->
    {#if html_with_meta.use_code}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prism-themes@1.9.0/themes/prism-vsc-dark-plus.css"/>
    {/if}
    {#if html_with_meta.use_katex}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css" integrity="sha384-RZU/ijkSsFbcmivfdRBQDtwuwVqK7GMOw6IMvKyeWL2K5UAlyp6WonmB8m7Jd0Hn" crossorigin="anonymous">
    {/if}
</svelte:head>

<article>
    <div class="box" class:box_is_dark_mode={$is_dark_mode}>
        <div class="markdown">
            {@html html_with_meta.content}
        </div>
    </div>
</article>


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