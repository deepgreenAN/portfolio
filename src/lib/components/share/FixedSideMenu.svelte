<script lang="ts">
    import SvgWrapper from "./SvgWrapper.svelte";
    import HomeSvg from "./svgs/home-svgrepo-com.svg";
    import DarkSvg from "./svgs/night-svgrepo-com_fill.svg";
    import GithubSvg from "./svgs/github-svgrepo-com.svg";
    import TwitterSvg from "./svgs/twitter-svgrepo-com.svg";
    import WantedlySvg from "./svgs/wantedly.svg";

    import {is_dark_mode} from '$lib/darkmode_store';
</script>

<div class="hidden sm:flex sm:flex-col w-10 gap-5 fixed bottom-10 left-5 content-center">
    <a href="/#header"><SvgWrapper is_dark_mode={$is_dark_mode} use_hover={true}><HomeSvg/></SvgWrapper></a>
    <div on:click={()=>{is_dark_mode.inverse()}}><SvgWrapper is_dark_mode={$is_dark_mode} use_hover={true}><DarkSvg/></SvgWrapper></div>
    <a href="https://www.wantedly.com/id/naoto_asami_a"><SvgWrapper is_dark_mode={$is_dark_mode} use_hover={true}><WantedlySvg/></SvgWrapper></a>
    <a href="https://github.com/deepgreenAN"><SvgWrapper is_dark_mode={$is_dark_mode} use_hover={true}><GithubSvg/></SvgWrapper></a>
    <a href="https://twitter.com/deepgreenAN"><SvgWrapper is_dark_mode={$is_dark_mode} use_hover={true}><TwitterSvg/></SvgWrapper></a>
</div>