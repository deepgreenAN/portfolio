use wasm_bindgen::{JsCast, JsValue};
use js_sys::Error;

/// windowを取得
pub fn window() -> Result<web_sys::Window, JsValue> {
    web_sys::window().ok_or(Error::new("cannot get window").into())
}

/// documentを取得
pub fn document() -> Result<web_sys::Document, JsValue> {
    window()?
        .document()
        .ok_or(Error::new("should have a document on window").into())
}

/// ldによってHtml要素を取得
/// Argments
/// - id: idを示す文字列
pub fn get_element_by_id<T: JsCast>(id: &str) -> Result<T, JsValue> {
    document()?
        .get_element_by_id(id)
        .ok_or(JsValue::from(Error::new("cannot get element by id")))?
        .dyn_into::<T>().map_err(|_|{Error::new("convert error(dyn into)").into()})
}

/// ldによってキャンパスを取得
/// Argments
/// - canvas_id: idを示す文字列
pub fn canvas(canvas_id: &str) -> Result<web_sys::HtmlCanvasElement, JsValue> {
    get_element_by_id(&canvas_id)
}

/// idによってコンテクストを取得
/// Argments
/// - canvas_id: idを示す文字列
pub fn context2d(canvas_id: &str) -> Result<web_sys::CanvasRenderingContext2d, JsValue> {
    canvas(canvas_id)?
        .get_context("2d")?
        .ok_or(JsValue::from(Error::new("cannot get context by id")))?
        .dyn_into::<web_sys::CanvasRenderingContext2d>()
        .map_err(|_|{Error::new("convert error(dyn into)").into()})
}
