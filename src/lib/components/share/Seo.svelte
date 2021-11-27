<script lang="ts">
    export let title: string|null = null;  // ページのタイトル
    export let page_desc: string|null = null;  // ページの概要
    export let page_path: string|null = null;  // ページの相対パス
    export let og_image_url: string|null = null;  // Og Imageのurlかパス
    export let is_top_page: boolean = false;

    if (page_path!=null) {
        if (!page_path.endsWith("/")) {  // 末端に/がない場合
            page_path += "/";
        }
    }

    let base_url = "https://portfolio-khaki-six-33.vercel.app/";
    let absolute_url: string;
    if (page_path!=null) {
        absolute_url = base_url + page_path;
    }

    if (og_image_url!=null) {
        if (!og_image_url.startsWith("https://")) {  // 絶対パスでない場合
            og_image_url = base_url + og_image_url;
        }
    }
</script>

<svelte:head>
    <title>{title}</title>
    <meta property="og:locale" content="ja_JP"/>
    <!-- タイトル関連 -->
    {#if title!=null}
        <title>{title}</title>
        <meta property="og:title" content={title}/>
    {/if}
    <!-- 概要関連 -->
    {#if page_desc!=null}
        <meta name="description" content={page_desc}/>
        <meta property="og:description" content={page_desc}/>
    {/if}
    <!-- url関連 -->
    {#if page_path!=null}
        <link rel="canonical" href={absolute_url}/>
        <meta property="og:url" content={absolute_url}/>
    {/if}
    <!-- Og Image -->
    {#if og_image_url!=null}
        <meta property="og:image" content={og_image_url}/>
    {/if}
    <!-- トップページか記事か -->
    {#if is_top_page}
        <meta property="og:type" content="website"/>
    {:else}
        <meta property="og:type" content="article"/>
    {/if}
</svelte:head>