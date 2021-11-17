import type { RequestHandler } from '@sveltejs/kit';
import fs from "fs"
import {mdToHtml, mdToHtmlv2} from "$lib/convert_markdown";
//const convert_markdown = import("../../lib/convert_markdown");
//const {mdToHtml} = require("../../lib/convert_markdown");

const ARTICLES_DIR_PATH = "contents/works"; 

export const get: RequestHandler = async ({params}) => {
    const md_str = fs.readFileSync(ARTICLES_DIR_PATH + "/" + params.slug + ".md").toString();
    const html_with_meta = mdToHtml(md_str);
    //const html_with_meta = mdToHtmlv2(md_str);
    return {body: {...html_with_meta}}
}