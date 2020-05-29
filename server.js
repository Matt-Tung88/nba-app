const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 3000;

// app.use(express.static('src'));

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(express.static(__dirname));
app.use(express.json());
app.set('view engine', 'ejs');


app.get('/:name', (req, res) => {

        var name = req.params.name;
        var stats = [];

        for(var i=0; i < 3; i++) {
            if(i === 0) {
                // console.log("----------------------------------")
                fetch(`https://www.balldontlie.io/api/v1/players/${name}`)
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        // stats.push({ fn: data.first_name, ln: data.last_name, position: data.position, team: data.team.abbreviation })
                        // stats.push(data.first_name);
                        // data = [data.first_name, data.last_name, data.position, data.team.abbreviation];
                        // stats.push(data)
                        stats.push(data.first_name, data.last_name, data.position, data.team.abbreviation);
                        // console.log(stats)

                        // data.first_name, data.last_name, data.position, data.team.abbreviation
                    //    data =  { fn: data.first_name, ln: data.last_name, position: data.position, team: data.team.abbreviation }
                    });
                    
            }   
            else if(i === 1) {
                fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=${name}`)
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        for (var i = 0; i < data.data.length; i++) {

                            stats.push(
                                data.data[i].games_played,
                                data.data[i].min,
                                data.data[i].fgm,
                                data.data[i].fga,
                                data.data[i].fg3m,
                                data.data[i].fg3a,
                                data.data[i].ftm,
                                data.data[i].fta,
                                data.data[i].oreb,
                                data.data[i].dreb,
                                data.data[i].reb,
                                data.data[i].ast,
                                data.data[i].stl,
                                data.data[i].blk,
                                data.data[i].turnover,
                                data.data[i].pf,
                                data.data[i].pts,
                                data.data[i].fg_pct,
                                data.data[i].fg3_pct,
                                data.data[i].ft_pct)
                        };

                    }); 
                    
                    
            }

            else if(i === 2) {
                fetch(`https://www.balldontlie.io/api/v1/stats?seasons[]=2019&per_page=100&player_ids[]=${name}`)
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        console.log(data.data.length)
                        for(var i = data.data.length - 10; i < data.data.length; i++) {
                            stats.push(
                                data.data[i].ast
                                // data.data[i].blk,
                                // data.data[i].dreb,
                                // data.data[i].fg3_pct,
                                // data.data[i].fg3a,
                                // data.data[i].fg3m,
                                // data.data[i].fg_pct,
                                // data.data[i].fga,
                                // data.data[i].fgm,
                                // data.data[i].ft_pct,
                                // data.data[i].fta,
                                // data.data[i].ftm,
                                // data.data[i].oreb,
                                // data.data[i].pf,
                                // data.data[i].pts,
                                // data.data[i].reb,
                                // data.data[i].stl,
                                // data.data[i].turnover,

                                                        )


                        }


                        for(var i=0; i < stats.length; i++) {
                                data = {
                                    fn: stats[0], 
                                    ln: stats[1], 
                                    position: stats[2], 
                                    team: stats[3],
                                    games_played: stats[4],
                                    min: stats[5],
                                    fgm: stats[6],
                                    fga: stats[7],
                                    fg3m: stats[8],
                                    fg3a: stats[9],
                                    ftm: stats[10],
                                    fta: stats[11],
                                    oreb: stats[12],
                                    dreb: stats[13],
                                    reb: stats[14],
                                    ast: stats[15],
                                    stl: stats[16],
                                    blk: stats[17],
                                    turnover: stats[18],
                                    pf: stats[19],
                                    pts: stats[20],
                                    fg_pct: stats[21],
                                    fg3_pct:stats[22],
                                    ft_pct: stats[23],
                                    a1: stats[24],
                                    a2: stats[25],
                                    a3: stats[26],
                                    a4: stats[27],
                                    a5: stats[28],
                                    a6: stats[29],
                                    a7: stats[30],
                                    a8: stats[31],
                                    a9: stats[32],
                                    a10: stats[33]


                                }

                        }


                        res.render("stats", data)


                        console.log(data);
                        // lol(stats);

                        // return stats;

                    })

            }

            
        }

        

});
        
function lol(stats) {
    for(var i=24; i < stats.length;i++) {
        console.log(stats[i]);
    }
}


app.listen(port, () => console.log(`Your app is running on https://nba-project-mt.herokuapp.com/ and port: ${port}!`));
                            
