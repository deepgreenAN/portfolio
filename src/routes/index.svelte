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

<div>
    {@html profile_data.about_me_desc}
</div>

