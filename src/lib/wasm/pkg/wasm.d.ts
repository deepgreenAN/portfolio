/* tslint:disable */
/* eslint-disable */
/**
*/
export function set_panic_hook(): void;

interface IAppOption {
    canvas_id: string,  // 描画するキャンパスのld 
    background_color: string,  // キャンパスの背景色 
    n_balls: number,  // 描画するポールの数
    v_abs_max: number,  // 移動速度の速さの初期値の最大値
    r_max: number,  // ボールの半径の初期値の最大値
    r_min: number,  // ポールの半径の初期値の最小値
    v_r_abs_max: number,  // ボールの半径の変化速度の速さの初期値の最大値
    color_max: number,  // 色相の最大値(<=2*PI)
    color_min: number,  // 色相の最小値(<=0)
    v_color_abs_max: number,  // 色相変化速度の速さの初期値の最大値
    is_color_vibration: boolean,  // 色相が範囲を越えたときに速度を反転させるどうか
    color_saturation: number,  // 固定された彩度
    color_value: number,  // 固定された明度
    e_max: number,  // 反発係数の初期値の最大値
    e_min: number,  // 反発係数の初期値の最小値
    is_filled: boolean,  // 描画するポールを塗りつぶすかどうか
    stroke_line_width: number  // ポールの枠線の幅
}


/**
* wasmキャンパスの外部インターフェース
* # Field
* - context: 描画するキャンパスのコンテキスト
* - balls: 描画するボール
* - app_opt: オプション
* - canvas_width: 描画で利用するキャンパスの横幅
* - canvas_height: 描画で利用するキャンパスの縦幅
*/
export class CanvasApp {
  free(): void;
/**
* Argments
* - iapp_option: Javascript側で指定するオプション
* @param {IAppOption} iapp_option
*/
  constructor(iapp_option: IAppOption);
/**
* デフォルトのオプションでコンストラクトする
* @returns {CanvasApp}
*/
  static default_option(): CanvasApp;
/**
* ボールの初期化
*/
  init(): void;
/**
* 1フレーム遷移
*/
  step(): void;
/**
* ボールの速度をランダムな値に変更する
*/
  shake(): void;
/**
* クリックに応じてボールを加速
* Argments
* - x: クリックしたx座標
* - y: クリックしたy座標
* @param {number} x
* @param {number} y
*/
  accelerate(x: number, y: number): void;
/**
* 彩度と明度を設定
* Argments
* - saturation: 彩度
* - value: 明度
* @param {number} saturation
* @param {number} value
*/
  set_saturation_and_value(saturation: number, value: number): void;
/**
* canvas_width, canvas_heightをキャンパスサイズに合わせる
*/
  adjust_canvas_size(): void;
/**
* 背景色をセットする
* Argments
* - background_color: 背景色を表すカラーコード
* @param {string} background_color
*/
  set_background_color(background_color: string): void;
/**
* 色相の範囲をセットする
* Argments
* - color_max: 色相の最大値
* - color_min: 色相の最小値
* @param {number} color_max
* @param {number} color_min
*/
  set_hue_range(color_max: number, color_min: number): void;
/**
* 塗りつぶすかどうかをセットする
* Argments
* - is_filled: 塗りつぶすかどうか
* @param {boolean} is_filled
*/
  set_is_filled(is_filled: boolean): void;
/**
* 色相を振動させるかどうかをセットする
* Argments
* - is_color_vibration: 色相が範囲を越えたときに速度を反転させるかどうか
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
  readonly __wbindgen_free: (a: number, b: number) => void;
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
