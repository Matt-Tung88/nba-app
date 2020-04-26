let express = require("express");
let fetch = require('node-fetch');

let app = express();
let port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('nba.js'));

app.get('/api/v1/players', (req, res) => {
    let url = 'https://www.balldontlie.io/api/v1/players';
    fetch(url)
        .then((r) => r.json())
        .then((r) => r.map((dataset) => dataset))
        .then((data) => {
            console.log("Hi");
            res.send({ data: data });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/error');
        });
});


app.listen(port, () => console.log(`Your app is running on https://nba-project-mt.herokuapp.com/ and port: ${port}!`));