<script context="module" lang="ts">
    import type {Load} from '@sveltejs/kit';
    import type {Profile} from '$lib/profile';
    
    export const load: Load = async ({fetch}) => {
        const profile_data_res = await fetch("./index.json");
        if (profile_data_res.ok) {
            const profile_data: Profile = await profile_data_res.json();
            return {
                props: {profile_data}
            }
        } else {
            const { message } = await profile_data_res.json();
            return {error: new Error(message)};  
        }
    }; 
</script>

<script lang="ts">
    export let profile_data: Profile;
</script>

<div class="w-3/5 mx-auto">
    <h2 class="pl-3 text-3xl">AboutMe</h2>
    <div class="bg-gray-300 opacity-60 border-black border-2 border-solid rounded">
        <div class="p-1"> {@html profile_data.about_me_desc} </div>
        <hr>
        <div class="flex flex-row">
            <div class="w-1/2">
                <div> フレームワーク・言語 </div>
                <ul class="break-words">
                    {#each profile_data.skills as skill}
                    <li class="ml-4">{skill}</li>
                    {/each}
                </ul>
            </div>
            <div class="w-1/2">
                <div> その他のスキル </div>
                <ul class="break-words">
                    {#each profile_data.other_skills as other_skill}
                    <li class="ml-4">{other_skill}</li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>

</div>


