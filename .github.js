console.log(".github.js");
import fs from "fs";

fs.mkdirSync("./dist-ghpages/api-login", { recursive: true });
fs.mkdirSync("./dist-ghpages/web", { recursive: true });
fs.renameSync('./dist/','./dist-ghpages/web-login/')

fs.writeFileSync(
  "./dist-ghpages/index.html",
  '<script> location.pathname = "/web-login/" </script>'
);
fs.writeFileSync(
  "./dist-ghpages/web/index.html",
  '<script> location.pathname = "/web-login/" </script>'
);
fs.writeFileSync(
  "./dist-ghpages/api-login/salt",
  '["sv0HfJPHJhdL6K7X","MnNYEgjZDjoTiCVq"]'
);
fs.writeFileSync(
  "./dist-ghpages/api-login/color-scheme.js",
  'window.BCSPanelColorScheme="";window.matchMediaDarkChange?.()'
);
