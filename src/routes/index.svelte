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
    import profile_img_path from '@static/profile.png';
    import {is_dark_mode} from '$lib/darkmode_store';
    export let profile_data: Profile;
    export let works: Work[];
</script>

<svelte:head>
    <title>asami naoto portfolio home</title>
</svelte:head>

<div class="w-3/5 mx-auto flex flex-col gap-10">
    <div class="mt-5">
        <h2 class:is_dark_mode={$is_dark_mode}>AboutMe</h2>
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
        <h2 class:is_dark_mode={$is_dark_mode}>Skills</h2>
        <div class="box" class:box_is_dark_mode={$is_dark_mode}>
            <div class="flex flex-col">
                <div class="flex flex-row">
                    <div class="w-1/2 border-r-2">
                        <div class="border-b-2 pl-2"> フレームワーク・言語 </div>
                        <ul class="break-words">
                            {#each profile_data.skills as skill}
                            <li class="ml-6">{skill}</li>
                            {/each}
                        </ul>
                    </div>
                    <div class="w-1/2">
                        <div class="border-b-2 pl-2"> その他のスキル </div>
                        <ul class="break-words">
                            {#each profile_data.other_skills as other_skill}
                            <li class="ml-6">{other_skill}</li>
                            {/each}
                        </ul>
                    </div>
                </div>
                <div class="p-1 border-t-2">{@html profile_data.skills_desk}</div>
            </div>
        </div>
    </div>
    <div>
        <h2 class:is_dark_mode={$is_dark_mode}>Educations</h2>
        <div class="box" class:box_is_dark_mode={$is_dark_mode}>
            <div class="flex flex-col">
                {#each profile_data.educations as education}
                <div class="border-border border-b-2 last:border-b-0" class:is_dark_mode={$is_dark_mode}>
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
        <h2 class:is_dark_mode={$is_dark_mode}>資格・賞</h2>
        <div class="box" class:box_is_dark_mode={$is_dark_mode}>
            <ul class="break-words">
                {#each profile_data.other_credentials as credential}
                    <li class="ml-6">{credential}</li>
                {/each}
            </ul>
        </div>
    </div>
    <div>
        <h2 class:is_dark_mode={$is_dark_mode}>Works</h2>
        <div class="box" class:box_is_dark_mode={$is_dark_mode}>
            <div class="grid grid-cols-2 gap-5">
                {#each works as work}     
                    <div class="border-2 rounded p-2 border-border relative" class:is_dark_mode={$is_dark_mode}>
                        <div class="text-xl ml-4 mb-2">{work.title}</div>
                        <div class="bg-bgcolor h-40">
                            <img src={work.image_path} alt="workimage" class="h-40 mx-auto" loading="eagar">
                        </div>
                        <div>{work.desc}</div>
                        <a href={"/works/"+work.slug} sveltekit:prefetch>
                            <div class="absolute left-0 top-0 w-full h-full bg-darkbgcolor border-none opacity-0 hover:opacity-40" class:bg_hover_is_dark_mode={$is_dark_mode}></div>
                        </a>
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <div class="mb-5"></div>
</div>

<style>
    div {
        border-color: inherit;
    }
    h2 {
        @apply pl-3 text-3xl text-primary;
    }
    .box {
        @apply bg-bgcolor bg-opacity-60 border-border border-solid rounded text-primary text-opacity-100 p-2;
        box-shadow: 1.95px 1.95px 2.6px rgb(0, 0, 0, 0.15);
    }
    .box_is_dark_mode {
        @apply bg-darkbgcolor bg-opacity-60 border-darkborder border-solid rounded text-darkprimary text-opacity-100 p-2;
        box-shadow: 1.95px 1.95px 2.6px rgb(0, 0, 0, 0.25);
    }
    .is_dark_mode {
        @apply text-darkprimary border-darkborder;
    }

    .bg_is_dark_mode {
        @apply bg-darkbgcolor;
    }
    .bg_hover_is_dark_mode {
        @apply bg-bgcolor;
    }
    
</style>


