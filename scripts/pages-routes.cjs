const fs = require("node:fs");
const path = require("node:path");

// GitHub Pages serves a real document for direct route visits and refreshes.
const build = path.resolve(__dirname, "../build");
const document = fs.readFileSync(path.join(build, "index.html"));
fs.writeFileSync(path.join(build, "404.html"), document);
for (const route of ["about", "project", "resume", "play"]) {
  const directory = path.join(build, route);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, "index.html"), document);
}
