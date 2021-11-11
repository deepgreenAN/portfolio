/* tslint:disable */
/* eslint-disable */
/**
*/
export function set_panic_hook(): void;

interface IAppOption {
    canvas_id: string,
    background_color: string,
    n_balls: number,
    v_abs_max: number,
    r_max: number,
    r_min: number,
    v_r_abs_max: number,
    color_max: number,
    color_min: number,
    v_color_abs_max: number,
    is_color_vibration: boolean,
    color_saturation: number,
    color_value: number,
    e_max: number,
    e_min: number,
    is_filled: boolean,
    stroke_line_width: number
}


/**
*/
export class CanvasApp {
  free(): void;
/**
* @param {IAppOption} iapp_option
*/
  constructor(iapp_option: IAppOption);
/**
* @returns {CanvasApp}
*/
  static default_option(): CanvasApp;
/**
*/
  init(): void;
/**
*/
  step(): void;
/**
*/
  shake(): void;
/**
* @param {number} x
* @param {number} y
*/
  accelerate(x: number, y: number): void;
/**
* @param {number} saturation
* @param {number} value
*/
  set_saturation_and_value(saturation: number, value: number): void;
/**
*/
  adjust_canvas_size(): void;
/**
* @param {string} background_color
*/
  set_background_color(background_color: string): void;
/**
* @param {number} color_max
* @param {number} color_min
*/
  set_hue_range(color_max: number, color_min: number): void;
/**
* @param {boolean} is_filled
*/
  set_is_filled(is_filled: boolean): void;
/**
* @param {boolean} is_color_vibration
*/
  set_is_color_vibration(is_color_vibration: boolean): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_canvasapp_free: (a: number) => void;
  readonly canvasapp_new: (a: number) => number;
  readonly canvasapp_default_option: () => number;
  readonly canvasapp_init: (a: number) => void;
  readonly canvasapp_step: (a: number) => void;
  readonly canvasapp_shake: (a: number) => void;
  readonly canvasapp_accelerate: (a: number, b: number, c: number) => void;
  readonly canvasapp_set_saturation_and_value: (a: number, b: number, c: number) => void;
  readonly canvasapp_adjust_canvas_size: (a: number) => void;
  readonly canvasapp_set_background_color: (a: number, b: number, c: number) => void;
  readonly canvasapp_set_hue_range: (a: number, b: number, c: number) => void;
  readonly canvasapp_set_is_filled: (a: number, b: number) => void;
  readonly canvasapp_set_is_color_vibration: (a: number, b: number) => void;
  readonly set_panic_hook: () => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_start: () => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
