const app = require("./app");
const config = require("./app/config");

app.listen(config.APP_PORT, () => {
  console.log(`app run at http://localhost:${config.APP_PORT}`);
});
