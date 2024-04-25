console.log("Running .github.js");
import fs from "fs";

fs.renameSync('./dist/','./dist-ghpages/login/')

console.log('ok');
