<script lang="ts">
    import "../app.css";
    import {onMount, onDestroy} from "svelte";
    import { browser } from '$app/env';
    import init, {CanvasApp} from '$lib/wasm/pkg/wasm';
    import type {IAppOption} from '$lib/wasm/pkg/wasm';
    import wasm_path from "$lib/wasm/pkg/wasm_bg.wasm?url";

    import {is_dark_mode} from '$lib/darkmode_store';
    import Header from "$lib/components/share/Header.svelte";
    import FixedSideMenu from "$lib/components/share/FixedSideMenu.svelte";
    import Footer from "$lib/components/share/Footer.svelte";

    let canvas_app: CanvasApp|null = null;
    let interval_id: number;
    const init_canvas_color = $is_dark_mode? "#000000":"#ffffff";
    const init_saturation = $is_dark_mode? 1.0:0.5;

    const PI = 3.1415

    // レスポンシブにポールの数を決定
    let ball_number: number;
    if (browser) {  // クライアント側で実行する場合
        if (window.matchMedia('(min-width: 1024px)')) {
            ball_number = 30;
        } else if (window.matchMedia('(min-width: 768px)')) {
            ball_number = 20;
        } else if (window.matchMedia('(min-width: 640px)')) {
            ball_number = 15;
        } else {
            ball_number = 10;
        }
    } else {
        ball_number = 30;
    }

    let app_opt : IAppOption = {
        canvas_id: "app-canvas",
        background_color: init_canvas_color,
        n_balls: ball_number,
        v_abs_max: 1.5,
        r_max: 50.0,
        r_min: 10.0,
        v_r_abs_max: 0.005,
        color_max: PI,
        color_min: -PI,
        v_color_abs_max: PI/360.0,
        is_color_vibration: false,
        color_saturation: init_saturation,
        color_value: 1.0,
        e_max: 1.01,
        e_min: 0.95,
        is_filled: $is_dark_mode,
        stroke_line_width: 1
    };

    onMount(async ():Promise<void> => {
        console.log("a");

        // 背景を描画するcanvasの設定
        const canvas = document.getElementById("app-canvas") as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const context = canvas.getContext("2d");
        context.fillStyle = init_canvas_color;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // CanvasApp
        await init(wasm_path);
        canvas_app = new CanvasApp(app_opt);
        canvas_app.init();

        interval_id = window.setInterval(()=>{
            canvas_app.step();
        },1000/60);
    });

    onDestroy(():void =>{
        clearInterval(interval_id);
    });

    const window_click_hundler = (e: any) => {
        const x:number = e.clientX;
        const y:number = e.clientY;
        canvas_app.accelerate(x, y);
    }

    const window_resize_hundler = (e: any) => {
        // 背景を描画するcanvasの設定
        const canvas = document.getElementById("app-canvas") as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        try{
            canvas_app.adjust_canvas_size();
        } catch(e) {
            console.log(e);
        }
        
    }

    $: if (canvas_app!=null) {
        const canvas_color: string = $is_dark_mode? "#000000":"#ffffff";
        canvas_app.set_background_color(canvas_color);
        canvas_app.set_is_filled(!$is_dark_mode);

        const saturation: number = $is_dark_mode? 1.0:0.5;
        canvas_app.set_saturation_and_value(saturation, 1.0);
    }

</script>

<div id="main-container">
    <div id="header">
        <Header/>
    </div>
    <div id="contents">
        <div class="w-9/10 mx-auto sm:w-3/5 sm:mx-auto flex flex-col">
            <div class="mt-5"></div>
            <slot></slot>
            <div class="mb-5"></div>
        </div>
    </div>
    <div id="footer">
        <Footer/>
    </div>
</div>
<FixedSideMenu/>
<canvas class="fixed top-0 left-0 -z-10" id="app-canvas"></canvas>
<svelte:window 
    on:click={window_click_hundler} 
    on:dblclick|preventDefault={()=>{canvas_app.shake()}}
    on:resize={window_resize_hundler}
/>

<style>
    #main-container {
        padding: 0px;
        margin: 0px;
        display: grid;
        grid-template-rows: auto 1fr auto;
        min-height: 100vh;
        max-width: 100vw;
    }
    #header {
        grid-row: 1/2;
    }
    #contents {
        grid-row: 2/3;
    }
    #footer {
        grid-row: 3/4;
    }
</style>
