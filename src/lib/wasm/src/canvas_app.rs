use rand::thread_rng;
use rand::distributions::Uniform;
use rand_distr::Distribution;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;
use js_sys::Error;
use serde::{Deserialize};

use palette::{Hsv, RgbHue, Srgb, IntoColor};

use crate::rand_ball::{Ball, get_norm, get_unit_vector};
use crate::dom_utils::*;
use crate::PI;

/// typescript側で与えるオプションのインターフェース
#[wasm_bindgen(typescript_custom_section)]
const APP_OPTION: &'static str = r#"
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
"#;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "IAppOption")]
    pub type IAppOption;
}

/// javascript側から取り込むオプションのrust側実装
#[derive(Deserialize)]
struct AppOption {
    pub canvas_id: String,  // 描画するキャンパスのld 
    pub background_color: String,  // キャンパスの背景色 
    pub n_balls: usize,  // 描画するポールの数
    pub v_abs_max: f64,  // 移動速度の速さの初期値の最大値
    pub r_max: f64,  // ボールの半径の初期値の最大値
    pub r_min: f64,  // ポールの半径の初期値の最小値
    pub v_r_abs_max: f64,  // ボールの半径の変化速度の速さの初期値の最大値
    pub color_max: f64,  // 色相の最大値(<=2*PI)
    pub color_min: f64,  // 色相の最小値(<=0)
    pub v_color_abs_max: f64,  // 色相変化速度の速さの初期値の最大値
    pub is_color_vibration: bool,  // 色相が範囲を越えたときに速度を反転させるどうか
    pub color_saturation: f64,  // 固定された彩度
    pub color_value: f64,  // 固定された明度
    pub e_max: f64,  // 反発係数の初期値の最大値
    pub e_min: f64,  // 反発係数の初期値の最小値
    pub is_filled: bool,  // 描画するポールを塗りつぶすかどうか
    pub stroke_line_width: u32  // ポールの枠線の幅
}

impl AppOption {
    /// # Argments
    /// - iapp_option: Javascript側で指定するオプション
    fn new(iapp_option: IAppOption) -> Result<AppOption, JsValue> {
        Ok(
            iapp_option.obj.into_serde::<AppOption>()
            .map_err(|_|{JsValue::from(Error::new("cannot into_serde from javascript to app_option"))})?
        )
    }

    /// デフォルトのオプション
    fn default_option() -> Self {
        Self {
            canvas_id: "canvas_app".to_string(),
            //background_color: "#ffffff".to_string(),
            background_color: "#000000".to_string(),
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
            e_min: 0.95,
            is_filled: true,
            stroke_line_width: 2
        }
    }

    /// オプションの値をバリデーション
    fn validate(&self) -> Result<(), JsValue>{
        if self.v_abs_max < 0.0 || self.v_r_abs_max < 0.0 || self.v_color_abs_max < 0.0 {
            //panic!("abs max field must be bigger than 0.0");
            return Err(JsValue::from(Error::new("abs max field must be bigger than 0.0")));
        }
        if self.r_min > self.r_max || self.color_min > self.color_max || self.e_min > self.e_max {
            //panic!("_min field must smaller than _max field");
            return Err(JsValue::from(Error::new("*_min field must smaller than *_max field")));
        }
        if self.color_min < -PI || PI < self.color_max {
            return Err(JsValue::from(Error::new("must color_min >= -PI and PI >= color_max")));
        }
        if self.color_saturation < 0.0 || 1.0 < self.color_saturation {
            //panic!("color_saturation must be in (0.0 1.0)");
            return Err(JsValue::from(Error::new("color_saturation must be in (0.0 1.0)")));
        }
        if self.color_value < 0.0 || 1.0 < self.color_value {
            //panic!("color_value must be in (0.0 1.0)");
            return Err(JsValue::from(Error::new("color_value must be in (0.0 1.0)")));
        }
        Ok(())
    }
}

/// wasmキャンパスの外部インターフェース
/// # Field
/// - context: 描画するキャンパスのコンテキスト
/// - balls: 描画するボール
/// - app_opt: オプション
/// - canvas_width: 描画で利用するキャンパスの横幅
/// - canvas_height: 描画で利用するキャンパスの縦幅
#[wasm_bindgen]
pub struct CanvasApp {  // アプリケーション
    context: web_sys::CanvasRenderingContext2d,
    balls: Vec<Ball>,
    app_opt: AppOption,
    canvas_width: u32,
    canvas_height: u32
}

#[wasm_bindgen]
impl CanvasApp {
    /// Argments
    /// - iapp_option: Javascript側で指定するオプション
    #[wasm_bindgen(constructor)]
    pub fn new(iapp_option: IAppOption) -> Result<CanvasApp, JsValue> {
        let app_opt = AppOption::new(iapp_option)?;
        let app_context = context2d(&app_opt.canvas_id)?;
        let app_canvas = app_context.canvas()
        .ok_or(JsValue::from(Error::new("cannot app canvas from app context")))?;

        let canvas_width = app_canvas.width();
        let canvas_height = app_canvas.height();
        // フィールドのバリデーション
        app_opt.validate()?;
        Ok(Self {
            context: app_context,
            balls: Vec::new(),
            app_opt,
            canvas_width,
            canvas_height
        })
    }

    /// デフォルトのオプションでコンストラクトする
    #[wasm_bindgen]
    pub fn default_option() -> Result<CanvasApp, JsValue> {
        let app_opt = AppOption::default_option();
        // フィールドのバリデーション
        app_opt.validate()?;

        // context
        let app_context = context2d(&app_opt.canvas_id)?;
        app_context.set_line_width(app_opt.stroke_line_width as f64);
        
        // canvas
        let app_canvas = app_context.canvas()
        .ok_or(JsValue::from(Error::new("cannot app canvas from app context")))?;

        let canvas_width = app_canvas.width();
        let canvas_height = app_canvas.height();

        Ok(Self {
            context: app_context,
            balls: Vec::new(),
            app_opt,
            canvas_width,
            canvas_height
        })
    }

    /// ボールの初期化
    #[wasm_bindgen]
    pub fn init(&mut self) -> Result<(), JsValue>{
    
        // ボールの作成
        self.balls = Vec::with_capacity(self.app_opt.n_balls);

        let mut random = thread_rng();
        let x_distr = Uniform::from(self.app_opt.r_max..self.canvas_width as f64-self.app_opt.r_max);
        let y_distr = Uniform::from(self.app_opt.r_max..self.canvas_height as f64-self.app_opt.r_max);
        let v_distr = Uniform::from(-self.app_opt.v_abs_max..self.app_opt.v_abs_max);

        let r_distr = Uniform::from(self.app_opt.r_min..self.app_opt.r_max);
        let v_r_distr = Uniform::from(-self.app_opt.v_r_abs_max..self.app_opt.v_r_abs_max);

        let color_distr = Uniform::from(self.app_opt.color_min..self.app_opt.color_max);
        let v_color_distr = Uniform::from(-self.app_opt.v_color_abs_max..self.app_opt.v_color_abs_max);

        let e_distr = Uniform::from(self.app_opt.e_min..self.app_opt.e_max);

        for _ in 0..self.app_opt.n_balls {
            let color = Hsv::new(
                RgbHue::from_radians(color_distr.sample(&mut random)),
                self.app_opt.color_saturation,  // saturation
                self.app_opt.color_value  // brightness
            );
            self.balls.push(
                Ball {
                    x: x_distr.sample(&mut random),
                    y: y_distr.sample(&mut random),
                    v_x: v_distr.sample(&mut random),
                    v_y: v_distr.sample(&mut random),
                    r: r_distr.sample(&mut random),
                    v_r: v_r_distr.sample(&mut random),
                    color,
                    v_color: v_color_distr.sample(&mut random),
                    e: e_distr.sample(&mut random)
                }
            );
        }

        Ok(())

    }

    /// 1フレーム遷移
    #[wasm_bindgen]
    pub fn step(&mut self) -> Result<(), JsValue> {
        self.step_balls();

        self.context.set_fill_style(&JsValue::from(&self.app_opt.background_color));
        self.context.fill_rect(
            0.0,
            0.0,
            self.canvas_width as f64,
            self.canvas_height as f64
        );  // キャンパスを初期化

        for ball in self.balls.iter() {
            let color_rgb: Srgb<f64> = ball.color
                .into_color();
            let color_rgb_u8 = color_rgb
                .into_format::<u8>();

            let color_string = &JsValue::from(
                format!(
                    "rgb({}, {}, {}, 1)", 
                    color_rgb_u8.red, 
                    color_rgb_u8.green, 
                    color_rgb_u8.blue
                )
            );

            if self.app_opt.is_filled {  // 塗りつぶす場合
                self.context.set_fill_style(&color_string);
            } else {  // 塗りつぶさない場合
                self.context.set_stroke_style(&color_string);
                self.context.set_line_width(self.app_opt.stroke_line_width as f64);
            }
            
            // ボールの描画
            self.context.begin_path();
            self.context
                .arc(
                    ball.x,
                    ball.y,
                    ball.r,
                    0.0,
                    2.0 * PI
                )
                .map_err(|_|{JsValue::from(Error::new("cannot draw arc to context"))})?;

            if self.app_opt.is_filled {  // 塗りつぶす場合
                self.context.fill();
            } else {  // 塗りつぶさない場合
                self.context.stroke();
            }
            
        }

        Ok(())
    }

    /// ボールの速度をランダムな値に変更する
    #[wasm_bindgen]
    pub fn shake(&mut self) {
        let mut random = thread_rng();
        let v_distr = Uniform::from(-self.app_opt.v_abs_max..self.app_opt.v_abs_max);
        let v_r_distr = Uniform::from(-self.app_opt.v_r_abs_max..self.app_opt.v_r_abs_max);
        let v_color_distr = Uniform::from(-PI/180.0..PI/180.0);

        for ball in self.balls.iter_mut() {
            ball.v_x = v_distr.sample(&mut random);
            ball.v_y = v_distr.sample(&mut random);
            ball.v_r = v_r_distr.sample(&mut random);
            ball.v_color = v_color_distr.sample(&mut random);
        }
    }

    /// クリックに応じてボールを加速
    /// Argments
    /// - x: クリックしたx座標
    /// - y: クリックしたy座標
    #[wasm_bindgen]
    pub fn accelerate(&mut self, x: f64, y: f64) {
        for ball in self.balls.iter_mut() {
            if (ball.x - ball.r <= x) && 
            (x <= ball.x + ball.r) &&
            (ball.y - ball.r <= y) &&
            (y <= ball.y + ball.r){
                let add_v_size = get_norm(x-ball.x, y-ball.y) / ball.r * 2.0 * self.app_opt.v_abs_max;
                let (add_v_unit_x, add_v_unit_y) = get_unit_vector(ball.x-x, ball.y-y);
                let (add_v_x, add_v_y) = (add_v_unit_x * add_v_size, add_v_unit_y * add_v_size);
                ball.v_x += add_v_x;
                ball.v_y += add_v_y;
            }
        }
    }

    /// 彩度と明度を設定
    /// Argments
    /// - saturation: 彩度
    /// - value: 明度
    #[wasm_bindgen]
    pub fn set_saturation_and_value(&mut self, saturation: f64, value: f64) -> Result<(), JsValue> {
        self.app_opt.color_saturation = saturation;
        self.app_opt.color_value = value;
        self.app_opt.validate()?;
        self.balls.iter_mut().for_each(|ball|{
            ball.color.saturation = saturation;
            ball.color.value = value;
        });
        Ok(())
    }

    /// canvas_width, canvas_heightをキャンパスサイズに合わせる
    #[wasm_bindgen]
    pub fn adjust_canvas_size(&mut self) -> Result<(), JsValue> {
        let app_canvas = self.context.canvas()
        .ok_or(JsValue::from(Error::new("cannot app canvas from app context")))?;

        self.canvas_width = app_canvas.width();
        self.canvas_height = app_canvas.height();

        Ok(())
    }

    /// 背景色をセットする
    /// Argments
    /// - background_color: 背景色を表すカラーコード
    #[wasm_bindgen]
    pub fn set_background_color(&mut self, background_color: String) {
        self.app_opt.background_color = background_color;
    }

    /// 色相の範囲をセットする
    /// Argments
    /// - color_max: 色相の最大値
    /// - color_min: 色相の最小値
    #[wasm_bindgen]
    pub fn set_hue_range(&mut self, color_max: f64, color_min: f64) -> Result<(), JsValue> {
        self.app_opt.color_max = color_max;
        self.app_opt.color_min = color_min;
        self.app_opt.validate()?;
        Ok(())
    }

    /// 塗りつぶすかどうかをセットする
    /// Argments
    /// - is_filled: 塗りつぶすかどうか
    #[wasm_bindgen]
    pub fn set_is_filled(&mut self, is_filled: bool) {
        self.app_opt.is_filled = is_filled;
    }

    /// 色相を振動させるかどうかをセットする
    /// Argments
    /// - is_color_vibration: 色相が範囲を越えたときに速度を反転させるかどうか
    #[wasm_bindgen]
    pub fn set_is_color_vibration(&mut self, is_color_vibration: bool) {
        self.app_opt.is_color_vibration = is_color_vibration;
    } 
}

impl CanvasApp {
    /// ポールを遷移させる
    fn step_balls(&mut self) {
        for i in 0..self.app_opt.n_balls {
            for j in i+1..self.app_opt.n_balls {  // 重複をさける
                let j_clone = self.balls[j].clone();  // 一度に可変参照は複数利用できないため
                let i_clone = self.balls[i].clone();  // 一度に可変参照は複数利用できないため

                self.balls[i].conflict_ball(&j_clone);  // iの衝突判定
                self.balls[j].conflict_ball(&i_clone);  // jの衝突判定
            }
            self.balls[i].conflict_wall(
                0.0,
                self.canvas_width as f64,
                0.0,
                self.canvas_height as f64
            );  // 壁とballの衝突
            self.balls[i].step();
            
            self.balls[i].step_r(self.app_opt.r_min, self.app_opt.r_max);
            self.balls[i].step_color(
                self.app_opt.color_min, 
                self.app_opt.color_max, 
                self.app_opt.is_color_vibration
            );
        }
    }
}