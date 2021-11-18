import unified from "unified"
import remarkParse from "remark-parse"
import remarkFrontMatter from "remark-frontmatter"
import remarkExtractFrontMatter from "remark-extract-frontmatter"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkPrism from "remark-prism"
import remarkRehype from "remark-rehype"
import rehypeRaw from "rehype-raw"
import rehypeKatex from "rehype-katex"
import rehypeStringify from "rehype-stringify"
import yaml from "yaml"

/**
* メタ情報を含めたhtml
*/
interface HtmlWithMeta {
    /** htmlの文字列 */
    content: string,
    /** 記事のタイトル */
    title: string,
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
    /** 数式を使うかどうか */
    use_katex: boolean,
    /** コードを使うかどうか */
    use_code: boolean
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
        .use(remarkPrism)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeKatex, {throwOnError: true})
        .use(rehypeStringify);
    const vfile = processer.processSync(md);
    const front_matter = vfile.data as FrontMatter;

    const html_with_meta: HtmlWithMeta = {
        content: vfile.toString(),
        title: front_matter.title,
        use_katex: front_matter.use_katex,
        use_code: front_matter.use_code
        //title: "タイトルです"
    }
    // const html_with_meta: HtmlWithMeta = {
    //     content: "内容です",
    //     title: "タイトルです"
    // };

    return html_with_meta
};

/**
 * mdToHtmlのモック
 * @param md マークダウン文字列
 * @returns メタ情報を含めたhtml
 */
function mdToHtmlv2 (md: string):HtmlWithMeta {
    const html_with_meta: HtmlWithMeta = {
        content: md,
        title: "タイトルです",
        use_katex: false,
        use_code: false
    }

    return html_with_meta
};

//export default {mdToHtml};
export {mdToHtml, mdToHtmlv2};
export type {HtmlWithMeta};