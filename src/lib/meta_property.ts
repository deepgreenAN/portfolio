/** ページのメタ情報 */
interface MetaProperty {
    /** ページのタイトル */
    title: string,
    /** ページの相対パス */
    page_path: string,
    /** ページの概要 */
    page_desc: string,
    /** Og Imageのurlパス */
    og_image_url: string,
    /** トップページかどうか */
    is_top_page: boolean
}

export type {MetaProperty};