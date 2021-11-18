/**
 * プロフィールデータ
 */
interface Profile {
    /** AboutMeの記述 */
    about_me_desc: string,
    /** スキルリスト */
    skills: string[],
    /** その他のスキル */
    other_skills: string[],
    /** スキルの詳細 */
    skills_desk: string,
    /** 学歴のリスト */
    educations: {"start":string, "end":string|null, "belong":string}[],
    /** その他の資格 */
    other_credentials: string[],
}

export type {Profile}