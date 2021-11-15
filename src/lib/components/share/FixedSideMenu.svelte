<script lang="ts">
    import HomeSvg from "./svgs/HomeSvg.svelte";
    import DarkSvg from "./svgs/DarkSvg.svelte";
    import GithubSvg from "./svgs/GithubSvg.svelte";
    import TwitterSvg from "./svgs/TwitterSvg.svelte";
    import {is_dark_mode} from '$lib/darkmode_store';

    //export let is_dark_mode: boolean;
</script>

<div class="flex flex-col w-10 h-60 fixed bottom-5 left-5 content-center justify-between">
    <HomeSvg/>
    <DarkSvg/>
    <GithubSvg/>
    <TwitterSvg/>
</div>