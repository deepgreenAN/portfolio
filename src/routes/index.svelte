<script context="module" lang="ts">
    import type {Load} from '@sveltejs/kit';
    import type {Profile} from '$lib/profile';
    import type {Work} from '$lib/work';
    import type {HomeResp} from './index.json';
    
    export const load: Load = async ({fetch}) => {
        const profile_data_res = await fetch("./index.json");
        if (profile_data_res.ok) {
            const profile_data: HomeResp = await profile_data_res.json();
            return {
                props: {
                    profile_data: profile_data.about_me,
                    works: profile_data.works
                }
            }
        } else {
            const { message } = await profile_data_res.json();
            return {error: new Error(message)};  
        }
    }; 
</script>

<script lang="ts">
    import profile_img_path from '@static/profile.png';  // profile
    import {is_dark_mode} from '$lib/darkmode_store';
    import SvgWrapper from '$lib/components/share/SvgWrapper.svelte';
    import MailSvg from '$lib/components/share/svgs/mail-svgrepo-com.svg';
    import WantedlySvg from '$lib/components/share/svgs/wantedly.svg';
    import TwitterSvg from '$lib/components/share/svgs/twitter-svgrepo-com.svg';
    import GithubSvg from '$lib/components/share/svgs/github-svgrepo-com.svg';
    import QiitaSvg from '$lib/components/share/svgs/qiita.svg';

    export let profile_data: Profile;
    export let works: Work[];

    // contact meについての変数
    const contact_me_list: {ref:string, Component:string, desc:string}[] = [
        {ref:"mailto:asami73dgreen63@gmail.com", Component:MailSvg, desc:"mail to Asami Naoto(asami73dgreen63@gmail.com)"},
        {ref:"https://www.wantedly.com/id/naoto_asami_a", Component:WantedlySvg, desc:"https://www.wantedly.com/id/naoto_asami_a"},
        {ref:"https://twitter.com/deepgreenAN", Component:TwitterSvg, desc:"https://twitter.com/deepgreenAN"},
        {ref:"https://github.com/deepgreenAN", Component:GithubSvg, desc:"https://github.com/deepgreenAN"},
        {ref:"https://qiita.com/deepgreenAN", Component:QiitaSvg, desc:"https://qiita.com/deepgreenAN"}
    ];
</script>

<svelte:head>
    <title>asami naoto portfolio home</title>
</svelte:head>

<div class="flex flex-col gap-10">
    <div>
        <h2 class:h2_is_dark_mode={$is_dark_mode}>About Me</h2>
        <div class="box" class:box_is_dark_mode={$is_dark_mode}>
            <div class="flex flex-col">
                <div class="flex flex-row">
                    <img src={profile_img_path} alt="profile" class="w-16">
                    <div class="flex flex-col ml-4 mt-2">
                        <div class="text-2xl"> 浅見直人 </div>
                        <div class="text-sm">Asami Naoto</div>
                    </div>
                </div>
                <div class="p-1 mt-2"> {@html profile_data.about_me_desc} </div>
            </div>
        </div>
    </div>
    <div>
        <h2 class:h2_is_dark_mode={$is_dark_mode}>Skills</h2>
        <div class="box" class:box_is_dark_mode={$is_dark_mode}>
            <div class="flex flex-col">
                <div class="flex flex-row">
                    <div class="w-1/2 border-r-2">
                        <div class="border-b-2 pl-2"> フレームワーク・言語 </div>
                        <ul class="break-words">
                            {#each profile_data.skills as skill}
                            <li class="ml-6">{@html skill}</li>
                            {/each}
                        </ul>
                    </div>
                    <div class="w-1/2">
                        <div class="border-b-2 pl-2"> その他のスキル </div>
                        <ul class="break-words">
                            {#each profile_data.other_skills as other_skill}
                            <li class="ml-6">{@html other_skill}</li>
                            {/each}
                        </ul>
                    </div>
                </div>
                <div class="p-1 border-t-2">{@html profile_data.skills_desk}</div>
            </div>
        </div>
    </div>
    <div>
        <h2 class:h2_is_dark_mode={$is_dark_mode}>Educations</h2>
        <div class="box" class:box_is_dark_mode={$is_dark_mode}>
            <div class="flex flex-col">
                {#each profile_data.educations as education}
                <div class="border-b-2 last:border-b-0">
                    <div class="ml-2">
                        <span>{education.start}</span>
                        {#if education.end != null}
                        <span>-</span>
                        <span>{education.end}</span>
                        {/if}
                    </div>
                    <div class="ml-4">{education.belong}</div>
                </div>
                {/each}
            </div>
        </div>
    </div>
    <div>
        <h2 class:h2_is_dark_mode={$is_dark_mode}>資格・賞</h2>
        <div class="box" class:box_is_dark_mode={$is_dark_mode}>
            <ul class="break-words">
                {#each profile_data.other_credentials as credential}
                    <li class="ml-6">{@html credential}</li>
                {/each}
            </ul>
        </div>
    </div>
    <div>
        <h2 class:h2_is_dark_mode={$is_dark_mode}>Works</h2>
        <div class="box" class:box_is_dark_mode={$is_dark_mode}>
            <div class="grid grid-cols-2 gap-5">
                {#each works as work}     
                    <div class="border-2 rounded p-2 relative">
                        <div class="text-xl ml-4 mb-2">{work.title}</div>
                        <div class="bg-bgcolor w-full aspect-w-16 aspect-h-9">
                            <img src={work.image_path} alt="workimage" class="h-full mx-auto" loading="eagar">
                        </div>
                        <div>{work.desc}</div>
                        <a href={"/works/"+work.slug} sveltekit:prefetch>
                            <div class="absolute left-0 top-0 w-full h-full rounded bg-darkbgcolor opacity-0 hover:opacity-40" class:bg_hover_is_dark_mode={$is_dark_mode}></div>
                        </a>
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <div>
        <h2 class:h2_is_dark_mode={$is_dark_mode}>Contact Me</h2>
        <div class="box" class:box_is_dark_mode={$is_dark_mode}>
            <div class="flex flex-col">
                {#each contact_me_list as ContactMe}
                    <div class="relative border-b-2 h-12 hover:underline">                    
                        <div class="flex flex-row">
                            <div class="w-12 my-auto">
                                <SvgWrapper is_dark_mode={$is_dark_mode}>
                                    <svelte:component this={ContactMe.Component}/>
                                </SvgWrapper>
                            </div>
                            <div class="ml-8 my-auto break-all">{ContactMe.desc}</div>
                        </div>
                        <a href={ContactMe.ref}>
                            <div class="absolute top-0 left-0 w-full h-full bg-darkbgcolor opacity-0 hover:opacity-40" class:bg_hover_is_dark_mode={$is_dark_mode}></div>
                        </a>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    * {
        border-color: inherit;
    }

    h2 {
        @apply pl-3 text-3xl text-primary;
    }

    .h2_is_dark_mode {
        @apply text-darkprimary border-darkborder;
    }
    .box {
        @apply bg-bgcolor bg-opacity-60 border-border border-solid rounded text-primary text-opacity-100 p-2;
        box-shadow: 1.95px 1.95px 2.6px rgb(0, 0, 0, 0.15);
    }
    .box_is_dark_mode {
        @apply bg-darkbgcolor bg-opacity-60 border-darkborder border-solid rounded text-darkprimary text-opacity-100 p-2;
        box-shadow: 1.95px 1.95px 2.6px rgb(0, 0, 0, 0.25);
    }
    .bg_hover_is_dark_mode {
        @apply bg-bgcolor;
    }
    
</style>


