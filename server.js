let express = require("express");
let fetch = require('node-fetch');

let app = express();
let port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('src'));

app.get('')


app.listen(port, () => console.log(`Your app is running on https://nba-project-mt.herokuapp.com/ and port: ${port}!`));