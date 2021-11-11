<script lang="ts">
    import HomeSvg from "./svgs/HomeSvg.svelte";
    import DarkSvg from "./svgs/DarkSvg.svelte";
    import GithubSvg from "./svgs/GithubSvg.svelte";
    import TwitterSvg from "./svgs/TwitterSvg.svelte";

    export let is_dark_mode: boolean;
</script>

<div class="flex flex-col w-10 h-60 fixed bottom-5 left-5 content-center justify-between">
    <HomeSvg is_dark_mode={is_dark_mode}/>
    <DarkSvg bind:is_dark_mode={is_dark_mode}/>
    <GithubSvg is_dark_mode={is_dark_mode}/>
    <TwitterSvg is_dark_mode={is_dark_mode}/>
</div>