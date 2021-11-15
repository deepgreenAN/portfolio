import { writable } from 'svelte/store';

function createIsDarkMode() {
    const {subscribe, update} = writable(false);
    return {
        subscribe,
        inverse: ():void => {update((_bool:boolean):boolean =>{return !_bool})}
    }
}

export const is_dark_mode = createIsDarkMode()