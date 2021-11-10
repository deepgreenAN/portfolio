pub mod utils;
pub mod rand_ball;
pub mod dom_utils;
pub mod canvas_app;



// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;


static PI: f64 = 3.141592;


