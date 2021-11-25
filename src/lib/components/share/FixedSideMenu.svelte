<script lang="ts">
    import HomeSvg from "./svgs/HomeSvg.svelte";
    import DarkSvg from "./svgs/DarkSvg.svelte";
    import GithubSvg from "./svgs/GithubSvg.svelte";
    import TwitterSvg from "./svgs/TwitterSvg.svelte";
    import WantedlySvg from "./svgs/WantedlySvg.svelte";

    import {is_dark_mode} from '$lib/darkmode_store';
</script>

<div class="hidden sm:flex sm:flex-col w-10 gap-5 fixed bottom-10 left-5 content-center">
    <a href="/#header"><HomeSvg is_dark_mode={$is_dark_mode}/></a>
    <div on:click={()=>{is_dark_mode.inverse()}}><DarkSvg is_dark_mode={$is_dark_mode}/></div>
    <a href="https://www.wantedly.com/id/naoto_asami_a"><WantedlySvg is_dark_mode={$is_dark_mode}/></a>
    <a href="https://github.com/deepgreenAN"><GithubSvg is_dark_mode={$is_dark_mode}/></a>
    <a href="https://twitter.com/deepgreenAN"><TwitterSvg is_dark_mode={$is_dark_mode}/></a>
</div>