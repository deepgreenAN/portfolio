/** 作品 */
interface Work {
    /** 作品のスラグid */
    slug: string,
    /** 作品のタイトル */
    title: string,
    /** サムネ画像のパス */
    image_path: string,
    /** 簡単な説明 */
    desc: string
}

export type{Work};