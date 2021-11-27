import type { RequestHandler } from '@sveltejs/kit';
import fs from "fs"

import type {Profile} from '$lib/profile';
import type {Work} from '$lib/work';
import type {MetaProperty} from '$lib/meta_property';

interface ReadMainMetaProperty {
    title: string,
    page_desc: string,
    og_image_url: string
}

interface HomeResp {
    about_me: Profile,
    works: Work[],
    meta_property: MetaProperty
}

export type {HomeResp};

const PROFILE_DIR_PATH = "contents/profile";

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
        educations: without_desc_profile.educations as {"start": string, "end": string | null, "belong": string}[],
        other_credentials: without_desc_profile.other_credentials as string[]
    };

    const works_path = PROFILE_DIR_PATH + "/works.json";
    const works = JSON.parse(fs.readFileSync(works_path, "utf8")) as Work[];

    const main_meta_property_path = PROFILE_DIR_PATH + "/main_meta_property.json";
    const read_main_meta_property = JSON.parse(fs.readFileSync(main_meta_property_path, "utf8")) as ReadMainMetaProperty;
    const meta_property: MetaProperty = {
        title: read_main_meta_property.title,
        page_path: "/",
        page_desc: read_main_meta_property.page_desc,
        og_image_url: read_main_meta_property.og_image_url,
        is_top_page: true
    }

    const home_resp: HomeResp = {
        about_me: about_me,
        works: works,
        meta_property: meta_property
    };

    return {
        body: JSON.parse(JSON.stringify(home_resp))
    }
};