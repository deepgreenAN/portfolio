import init, {CanvasApp} from './wasm/pkg/wasm';
import type {IAppOption} from './wasm/pkg/wasm';
import wasm_path from "./wasm/pkg/wasm_bg.wasm?url";

interface GlobalWasmApp {
  canvas_app: CanvasApp | null,
  interval_id: number | null
};

const global_wasm_app: GlobalWasmApp = {
  canvas_app: null,
  interval_id: null
};

const PI = 3.1415

const initialize_wasm = async ():Promise<void> => {
  await init(wasm_path);
  const app_option: IAppOption = {
    canvas_id: "app-canvas",
    background_color: "#000000",
    n_balls: 30,
    v_abs_max: 1.5,
    r_max: 50.0,
    r_min: 10.0,
    v_r_abs_max: 0.005,
    color_max: PI,
    color_min: -PI,
    v_color_abs_max: PI/360.0,
    is_color_vibration: false,
    color_saturation: 1.0,
    color_value: 1.0,
    e_max: 1.01,
    e_min: 0.95
  };
  global_wasm_app.canvas_app = new CanvasApp(app_option);
  global_wasm_app.canvas_app.init();
};

export {global_wasm_app, initialize_wasm}
