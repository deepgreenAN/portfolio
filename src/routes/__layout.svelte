<script lang="ts">
    import "../app.css";
    import {onMount, onDestroy} from "svelte";
    import init, {CanvasApp} from '$lib/wasm/pkg/wasm';
    import type {IAppOption} from '$lib/wasm/pkg/wasm';
    import wasm_path from "$lib/wasm/pkg/wasm_bg.wasm?url";

    import Header from "$lib/components/share/Header.svelte";
    import FixedSideMenu from "$lib/components/share/FixedSideMenu.svelte";

    let canvas_app: CanvasApp|null = null;
    let interval_id: number;
    let is_dark_mode = true;
    const init_canvas_color = "#000000";
    const init_saturation = 1.0;

    const PI = 3.1415

    let app_opt : IAppOption = {
        canvas_id: "app-canvas",
        background_color: init_canvas_color,
        n_balls: 30,
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
        is_filled: false,
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
        await canvas_app.init();

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
        const canvas_color: string = is_dark_mode? "#000000":"#ffffff";
        canvas_app.set_background_color(canvas_color);
        canvas_app.set_is_filled(!is_dark_mode);

        const saturation: number = is_dark_mode? 1.0:0.5;
        canvas_app.set_saturation_and_value(saturation, 1.0);
    }

</script>

<div class="flex flex-col">
    <Header is_dark_mode={is_dark_mode}/>
    <slot />
</div>
<FixedSideMenu bind:is_dark_mode/>
<canvas class="fixed top-0 left-0 -z-10" id="app-canvas"></canvas>
<svelte:window 
    on:click={window_click_hundler} 
    on:auxclick={()=>{canvas_app.shake()}}
    on:resize={window_resize_hundler}
/>
