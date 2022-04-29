const { APP_PORT } = require('./src/config/config.default');

const app = require("./src/app")

//监听
app.listen(APP_PORT,() => {
    console.log(`server is running on http://localhost:${APP_PORT}`);
})