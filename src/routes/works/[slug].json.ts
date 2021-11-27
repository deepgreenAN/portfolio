import type { RequestHandler } from '@sveltejs/kit';
import fs from "fs"
import {mdToHtml} from "$lib/convert_markdown";

const ARTICLES_DIR_PATH = "contents/works";

export const get: RequestHandler = async ({params}) => {
    const md_str = fs.readFileSync(ARTICLES_DIR_PATH + "/" + params.slug + ".md").toString();
    const html_with_meta = mdToHtml(md_str);
    //const html_with_meta = mdToHtmlv2(md_str);
    return {body: JSON.parse(JSON.stringify(html_with_meta))}
}