interface Profile {
    about_me_desc: string,
    skills: string[],
    other_skills: string[],
    skills_desk: string,
    educations: {"start":string, "end":string|null, "belong":string}[],
    other_credentials: string[],
}

export type {Profile}