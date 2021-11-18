import { writable } from 'svelte/store';

/**
 * ダークモードかどうかを示すストアを返す
 * @returns booleanのストア
 */
function createIsDarkMode() {
    const {subscribe, update} = writable(true);
    return {
        subscribe,
        inverse: ():void => {update((_bool:boolean):boolean =>{return !_bool})}
    }
}

export const is_dark_mode = createIsDarkMode()