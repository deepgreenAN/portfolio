<script lang="ts">
    import HomeSvg from "./svgs/HomeSvg.svelte";
    import DarkSvg from "./svgs/DarkSvg.svelte";
    import GithubSvg from "./svgs/GithubSvg.svelte";
    import TwitterSvg from "./svgs/TwitterSvg.svelte";

    //export let is_dark_mode: boolean;
</script>

<div class="flex flex-col w-10 h-60 fixed bottom-10 left-5 content-center justify-between">
    <a href="/"><HomeSvg/></a>
    <DarkSvg/>
    <a href="https://github.com/deepgreenAN"><GithubSvg/></a>
    <a href="https://twitter.com/deepgreenAN"><TwitterSvg/></a>
</div>