import unified from "unified"
import remarkParse from "remark-parse"
import remarkFrontMatter from "remark-frontmatter"
import remarkExtractFrontMatter from "remark-extract-frontmatter"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkPrism from "remark-prism"
import remarkRehype from "remark-rehype"
import remarkCodeTitle from "remark-code-titles"
import rehypeRaw from "rehype-raw"
import rehypeKatex from "rehype-katex"
import rehypeStringify from "rehype-stringify"
import yaml from "yaml"

import type {MetaProperty} from "./meta_property";

/**
* メタ情報を含めたhtml
*/
interface HtmlWithMeta {
    /** htmlの文字列 */
    content: string,
    /** 記事のメタプロパティ */
    meta_property: MetaProperty
    /** 数式を使うかどうか */
    use_katex: boolean,
    /** コードを使うかどうか */
    use_code: boolean
}

/**
 * フロントマタ情報
 */
interface FrontMatter {
    /** 記事のタイトル */
    title: string,
    /** Ogイメージのurlパス */
    og_image_url: string,
    /** ページの概要 */
    page_desc: string,
    /** 数式を使うかどうか */
    use_katex: boolean,
    /** コードを使うかどうか */
    use_code: boolean,
}


/**
 * マークダウン文字列をメタ情報を含めたhtmlに変換
 * @param md マークダウン文字列
 * @returns メタ情報を含めたhtml
 */
function mdToHtml (md: string):HtmlWithMeta {
    const processer = unified()
        .use(remarkParse)
        .use(remarkFrontMatter)
        .use(remarkExtractFrontMatter, {yaml: yaml.parse})
        .use(remarkGfm)
        .use(remarkMath)
        .use(remarkCodeTitle)
        .use(remarkPrism)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeKatex, {throwOnError: true})
        .use(rehypeStringify);
        
    const vfile = processer.processSync(md);
    const front_matter = vfile.data as FrontMatter;
    const meta_property: MetaProperty = {
        title: front_matter.title,
        page_path: "not_initialized",  // とりあえずこれで初期化
        page_desc: front_matter.page_desc,
        og_image_url: front_matter.og_image_url,
        is_top_page: false
    } 

    const html_with_meta: HtmlWithMeta = {
        content: vfile.toString(),
        meta_property: meta_property,
        use_katex: front_matter.use_katex,
        use_code: front_matter.use_code
    }

    return html_with_meta
};

export {mdToHtml};
export type {HtmlWithMeta};