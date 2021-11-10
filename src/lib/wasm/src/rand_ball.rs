use palette::{Hsv, Hue, RgbHue};
use palette::encoding::srgb::Srgb;

pub fn get_unit_vector(x: f64, y: f64) -> (f64, f64) {  // 単位ベクトルを取得
    let abs = (x * x + y * y).sqrt();
    (x/abs, y/abs)
}

pub fn get_norm(x: f64, y: f64) -> f64 {  // 二乗ノルムを取得
    (x * x + y * y).sqrt()
}

#[derive(Clone)]
pub struct Ball {
    pub x: f64,
    pub y: f64,
    pub v_x: f64,
    pub v_y: f64,
    pub r: f64,
    pub v_r: f64,
    pub color: Hsv<Srgb, f64>,
    pub v_color: f64,
    pub e: f64

}

impl Ball {
    pub fn conflict_ball(&mut self, other: &Ball) {  // 二つの衝突判定と速度の更新
        if (self.x - other.x).powi(2) + (self.y - other.y).powi(2) < (self.r + other.r).powi(2) {  // 半径の和が中心の距離より小さい
            // 重なった部分をシフト
            let shift_size = self.r + other.r - get_norm(other.x - self.x,other.y - self.y);  // シフトサイズ
            let (shift_unit_x, shift_unit_y) = get_unit_vector(self.x - other.x,  self.y - other.y);  // シフトベクトルの単位ベクトル
            let (shift_x, shift_y) = (shift_unit_x * shift_size, shift_unit_y * shift_size);  // シフトベクトル
            self.x += shift_x;
            self.y += shift_y;

            // 衝突後速度を計算
            let (c_x, c_y) = get_unit_vector(
                other.x - self.x,
                other.y - self.y
            );  // p1p2方向の単位ベクトル
            let dot_c_v2_minus_v1 = c_x * (other.v_x - self.v_x) + c_y * (other.v_y - self.v_y);  // c・(v2-v1)

            let (m_1, m_2) = (self.r, other.r);

            let scalar = m_2 * (1.0 + self.e) / (m_1 + m_2) * dot_c_v2_minus_v1;

            self.v_x = scalar * c_x + self.v_x;
            self.v_y = scalar * c_y + self.v_y;
        } 
    }

    pub fn conflict_wall(
        &mut self, 
        left_wall: f64,  // 左壁のx 
        right_wall: f64,  // 右壁のx
        bottom_wall: f64,  // 下壁のy
        top_wall: f64  // 上壁のy
    ) {  // 二つのボールの壁との衝突判定と更新
        if (self.x - self.r) <= left_wall {
            self.x = left_wall + self.r;  // シフト
            self.v_x = self.v_x.abs() * self.e;
        } else if right_wall <= (self.x + self.r) {
            self.x = right_wall - self.r;  // シフト
            self.v_x =  - self.v_x.abs() * self.e;
        }

        if (self.y - self.r) <= bottom_wall {
            self.y = bottom_wall + self.r;  // シフト
            self.v_y = self.v_y.abs() * self.e;
        } else if top_wall <= (self.y + self.r) {
            self.y = top_wall - self.r;  // シフト
            self.v_y = - self.v_y.abs() * self.e;
        }
    }

    pub fn step(&mut self) {
        self.x += self.v_x;
        self.y += self.v_y;
    }

    pub fn step_r(&mut self, r_min: f64, r_max: f64) {
        if self.r + self.v_r < r_min {  // 小さすぎる場合
            self.v_r = self.v_r.abs();
        } else if r_max < self.r + self.v_r {  // 大きすぎる場合
            self.v_r = - self.v_r.abs();
        }
        self.r += self.v_r;
    }

    pub fn step_color(&mut self, color_min: f64, color_max: f64, is_vibration: bool){
        if self.color.hue.to_radians() + self.v_color < color_min {  //　小さすぎる
            if is_vibration {
                self.v_color = self.v_color.abs();
            } else {
                self.color = Hsv::new(
                    RgbHue::from_radians(color_max), 
                    self.color.saturation,
                    self.color.value
                );
            }
        } else if color_max < self.color.hue.to_radians() + self.v_color {  // 大きすぎる
            if is_vibration {
                self.v_color = - self.v_color.abs();
            } else {
                self.color = Hsv::new(
                    RgbHue::from_radians(color_min),
                    self.color.saturation,
                    self.color.value
                );
            }

        }
        self.color = self.color.shift_hue(RgbHue::from_radians(self.v_color));
    }
}

