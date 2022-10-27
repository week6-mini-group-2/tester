const express = require("express");
const cookieParser = require("cookie-parser");
// const https = require('https');
// const PORT = 443;
// const fs = require('fs');

// const options = {
//   key: fs.readFileSync('sftp://ubuntu@3.38.244.55/etc/ssl/private/private.key'),
//   cert: fs.readFileSync('sftp://ubuntu@3.38.244.55/etc/ssl/certificate.crt'),
//   ca: fs.readFileSync('sftp://ubuntu@3.38.244.55/etc/ssl/ca_bundle.crt')
// }
const { sequelize } = require("./models");
const app = express();
const cors = require("cors");
const router = require("./routes");

app.use(
  cors({
    origin: '*',
    credential: true,
  })
);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use([
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
]);


app.use("/", router);

// https.createServer(options, app).listen(PORT);

app.listen(3000, () => {
  console.log("서버가 켜졌어요!");
});
