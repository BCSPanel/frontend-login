console.log(".github.js");
import fs from "fs";

fs.mkdirSync("./dist/api-login", { recursive: true });
fs.writeFileSync(
  "./dist/api-login/salt",
  '["sv0HfJPHJhdL6K7X","MnNYEgjZDjoTiCVq"]'
);
