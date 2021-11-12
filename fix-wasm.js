// Temporary fix for https://github.com/vitejs/vite/issues/5169
import { readFileSync, writeFileSync ,unlinkSync} from 'fs';

const re = /[^\n]*new URL[^\n]*/g;
for(let crateName of JSON.parse(readFileSync("./.rsw.json", "utf8")).crates) {
    try {
        const crates_path = JSON.parse(readFileSync("./.rsw.json", "utf8")).crates_path
        const fileName = crates_path + crateName + "/pkg/" + crateName + ".js";
        writeFileSync(fileName, readFileSync(fileName, "utf8").replace(re, ""));

        const gitignoreFileName = crates_path + crateName + "/pkg/.gitignore";
        unlinkSync(gitignoreFileName);
        console.log(`${fileName} is modified.`);
    } catch {}
}


