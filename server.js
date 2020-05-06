const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 3000;

// app.use(express.static('src'));

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static('nba.js'));

app.get('/', (req, res) => {
    // const url = 'https://www.balldontlie.io/api/v1/players';
    // fetch(url)
    //     .then((r) => r.json())
    //     .then((r) => r.map((dataset) => dataset))
    //     .then((data) => {
    //         console.log(data);
    //         res.send({ data: data });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         res.redirect('/error');
    
    fetch('https://www.balldontlie.io/api/v1/players') 
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            res.send(data);
        });
});

// app.get('/', (req, res) => {
//     fetch('https://www.balldontlie.io/api/v1/teams')
//         .then((response) => {
//             return response.json();
//         })
//         .then((data) => {
//             console.log(data);
//             res.send(data);
//         });
// });

app.listen(port, () => console.log(`Your app is running on https://nba-project-mt.herokuapp.com/ and port: ${port}!`));
