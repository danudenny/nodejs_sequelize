const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

global.__basedir = __dirname;

var corsOptions = {
    origin: "http://localhost:8001"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('resources/static/assets'))

app.get('/', (req, res) => {
     res.json('Welcome to Denny Danuwijaya Blog');
});

const db = require('./app/models');
db.sequelize.sync();

require("./app/routes/blog.routes")(app);
require("./app/routes/upload.routes")(app);
require("./app/routes/comment.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/tag.routes")(app);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
});
