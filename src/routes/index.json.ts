import type { RequestHandler } from '@sveltejs/kit';
import fs from "fs"

import type {Profile} from '$lib/profile';

const PROFILE_DIR_PATH = "content/profile";

export const get: RequestHandler = async () => {
    const about_me_desc_path = PROFILE_DIR_PATH + "/about_me_desc.txt";
    const about_me_desc = fs.readFileSync(about_me_desc_path, "utf8");

    const without_desc_profile_path = PROFILE_DIR_PATH + "/without_desc_profile.json";
    const without_desc_profile = JSON.parse(fs.readFileSync(without_desc_profile_path, "utf8"));

    const skills_desk_path = PROFILE_DIR_PATH + "/skills_desc.txt";
    const skills_desc = fs.readFileSync(skills_desk_path, "utf8");

    const about_me: Profile = {
        about_me_desc: about_me_desc,
        skills: without_desc_profile.skills as string[],
        other_skills: without_desc_profile.other_skills as string[],
        skills_desk: skills_desc,
        educations: without_desc_profile.educations as {"start": string, "end": string | null, "belong": string}
    };

    return {
        body: {...about_me}
    }
};