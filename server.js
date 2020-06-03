const express = require("express");
const fetch = require("node-fetch");
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')
const session = require('express-session')

const sessionStore = new session.MemoryStore;


const app = express();
const port = process.env.PORT || 3000;


// app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');

app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
app.use(flash());


app.get('/:name', async (req, res) => {

    var name = req.params.name;
    var stats = [];
    var teams = ["ATL", "BOS", "BKN", "CHA", "CHI", "CLE", "DAL", "DEN", "DET", "GSW", "HOU", "IND", "LAC", "LAL", "MEM", "MIA",
        "MIL", "MIN", "NOP", "NYK", "OKC", "ORL", "PHI", "PHX", "POR", "SAC", "SAS", "TOR", "UTA", "WAS"];

    for (var i = 0; i < 4; i++) {
        if (i === 0) {
            await fetch(`https://www.balldontlie.io/api/v1/players/${name}`)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    stats.push(data.first_name, data.last_name, data.position, data.team.abbreviation);
                })
                .catch((err) => {
                    console.log(err);

                });

        }
        else if (i === 1) {
            await fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=${name}`)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {

                    if (data.data.length === 0) {
                        req.flash('alert', `*Note: This Player Didn't Play in the '19-'20 Season! Search Another Player!*`);
                        res.locals.message = req.flash();
                    }
                    else {

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
                    }
                })
                .catch((err) => {
                    console.log(err);
                    // res.redirect('/error');
                });


        }

        else if (i === 2) {
            await fetch(`https://www.balldontlie.io/api/v1/stats?seasons[]=2019&per_page=100&player_ids[]=${name}`)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    data.data.sort(function compare(a, b) {
                        var dateA = new Date(a.game.date);
                        var dateB = new Date(b.game.date);
                        return dateA - dateB;
                    })

                    for (var i = data.data.length - 10; i < data.data.length; i++) {

                        if (data.data[i] === undefined) {
                            stats.push(
                                data.data[i] = "",
                                data.data[i] = "",
                                data.data[i] = "",
                                data.data[i] = "",
                                data.data[i] = "",
                                data.data[i] = "",
                                data.data[i] = "",
                                data.data[i] = "",
                                data.data[i] = "",
                                data.data[i] = "",
                                data.data[i] = "",
                                data.data[i] = "",
                                data.data[i] = "",
                                data.data[i] = "",
                                data.data[i] = "",
                                data.data[i] = "",
                                data.data[i] = "",
                                data.data[i] = "",
                            );
                        }
                        else {
                        stats.push(
                            data.data[i].ast,
                            data.data[i].blk,
                            data.data[i].dreb,
                            data.data[i].fg3_pct,
                            data.data[i].fg3a,
                            data.data[i].fg3m,
                            data.data[i].fg_pct,
                            data.data[i].fga,
                            data.data[i].fgm,
                            data.data[i].ft_pct,
                            data.data[i].fta,
                            data.data[i].ftm,
                            data.data[i].oreb,
                            data.data[i].pf,
                            data.data[i].pts,
                            data.data[i].reb,
                            data.data[i].stl,
                            data.data[i].turnover
                        );
                        }

                    }
                    // console.log(stats)


                    var length = 10 - data.data.length;
                            console.log(length)

                    if (data.data.length < 10) {

                        for (var j = 0; j < data.data.length; j++) {
                            if (data.data[j].game.home_team_id !== data.data[j].player.team_id) {
                                stats.push(data.data[j].game.date.split('T')[0], data.data[j].game.home_team_id);

                            }
                            else if (data.data[j].game.visitor_team_id !== data.data[j].player.team_id) {
                                stats.push(data.data[j].game.date.split('T')[0], data.data[j].game.visitor_team_id);

                            }
                        }



                        for (var q = 0; q < length; q++) {
                            stats.push(data.data[q] = "", data.data[q] = "");
                        }


                    } else {
                        for (var j = data.data.length - 10; j < data.data.length; j++) {

                            if (data.data[j].game.home_team_id !== data.data[j].player.team_id) {
                                stats.push(data.data[j].game.date.split('T')[0], data.data[j].game.home_team_id);

                            }
                            else if (data.data[j].game.visitor_team_id !== data.data[j].player.team_id) {
                                stats.push(data.data[j].game.date.split('T')[0], data.data[j].game.visitor_team_id);

                            }

                        }
                    }



                    if (data.data.length < 10) {

                        for(var w=0; w < data.data.length; w++) {
                            stats.push(data.data[w].min);
                        }

                        for (var z = 0; z < length; z++) {
                            stats.push(data.data[z] = "");
                        }

                    }
                    else {
                        for (var k = data.data.length - 10; k < data.data.length; k++) {
                            stats.push(data.data[k].min)
                        }
                    }


                    // console.log(stats)







                })
                .catch((err) => {
                    console.log(err);
                    // res.redirect('/error');
                });


        }
        else if (i === 3) {
            await fetch(`https://www.balldontlie.io/api/v1/teams`)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {

                    for (var j = stats.length - 29; j < stats.length - 10; j++) {
                        // console.log(stats[j])
                        if (!isNaN(stats[j])) {
                            stats[j] = teams[stats[j] - 1]
                        }
                    }

                    // for (var k = stats.length - 10; k < stats.length; k++) {
                    //     if (stats[k] === "") {
                    //         stats[k] = "0:00";
                    //     }
                    // }


                    // for(var l=0; l < stats.length; l++) {
                    //     if(stats[l] === undefined) {
                    //         stats[l] = 0;
                    //     }
                    // }

                    for (var i = 0; i < stats.length; i++) {
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
                            fg3_pct: stats[22],
                            ft_pct: stats[23],

                            a1: stats[24],
                            b1: stats[25],
                            dreb1: stats[26],
                            fg3_pct1: stats[27],
                            fg3a1: stats[28],
                            fg3m1: stats[29],
                            fg_pct1: stats[30],
                            fga1: stats[31],
                            fgm1: stats[32],
                            ft_pct1: stats[33],
                            fta1: stats[34],
                            ftm1: stats[35],
                            oreb1: stats[36],
                            pf1: stats[37],
                            pts1: stats[38],
                            reb1: stats[39],
                            stl1: stats[40],
                            turnover1: stats[41],

                            a2: stats[42],
                            b2: stats[43],
                            dreb2: stats[44],
                            fg3_pct2: stats[45],
                            fg3a2: stats[46],
                            fg3m2: stats[47],
                            fg_pct2: stats[48],
                            fga2: stats[49],
                            fgm2: stats[50],
                            ft_pct2: stats[51],
                            fta2: stats[52],
                            ftm2: stats[53],
                            oreb2: stats[54],
                            pf2: stats[55],
                            pts2: stats[56],
                            reb2: stats[57],
                            stl2: stats[58],
                            turnover2: stats[59],

                            a3: stats[60],
                            b3: stats[61],
                            dreb3: stats[62],
                            fg3_pct3: stats[63],
                            fg3a3: stats[64],
                            fg3m3: stats[65],
                            fg_pct3: stats[66],
                            fga3: stats[67],
                            fgm3: stats[68],
                            ft_pct3: stats[69],
                            fta3: stats[70],
                            ftm3: stats[71],
                            oreb3: stats[72],
                            pf3: stats[73],
                            pts3: stats[74],
                            reb3: stats[75],
                            stl3: stats[76],
                            turnover3: stats[77],

                            a4: stats[78],
                            b4: stats[79],
                            dreb4: stats[80],
                            fg3_pct4: stats[81],
                            fg3a4: stats[82],
                            fg3m4: stats[83],
                            fg_pct4: stats[84],
                            fga4: stats[85],
                            fgm4: stats[86],
                            ft_pct4: stats[87],
                            fta4: stats[88],
                            ftm4: stats[89],
                            oreb4: stats[90],
                            pf4: stats[91],
                            pts4: stats[92],
                            reb4: stats[93],
                            stl4: stats[94],
                            turnover4: stats[95],

                            a5: stats[96],
                            b5: stats[97],
                            dreb5: stats[98],
                            fg3_pct5: stats[99],
                            fg3a5: stats[100],
                            fg3m5: stats[101],
                            fg_pct5: stats[102],
                            fga5: stats[103],
                            fgm5: stats[104],
                            ft_pct5: stats[105],
                            fta5: stats[106],
                            ftm5: stats[107],
                            oreb5: stats[108],
                            pf5: stats[109],
                            pts5: stats[110],
                            reb5: stats[111],
                            stl5: stats[112],
                            turnover5: stats[113],

                            a6: stats[114],
                            b6: stats[115],
                            dreb6: stats[116],
                            fg3_pct6: stats[117],
                            fg3a6: stats[118],
                            fg3m6: stats[119],
                            fg_pct6: stats[120],
                            fga6: stats[121],
                            fgm6: stats[122],
                            ft_pct6: stats[123],
                            fta6: stats[124],
                            ftm6: stats[125],
                            oreb6: stats[126],
                            pf6: stats[127],
                            pts6: stats[128],
                            reb6: stats[129],
                            stl6: stats[130],
                            turnover6: stats[131],

                            a7: stats[132],
                            b7: stats[133],
                            dreb7: stats[134],
                            fg3_pct7: stats[135],
                            fg3a7: stats[136],
                            fg3m7: stats[137],
                            fg_pct7: stats[138],
                            fga7: stats[139],
                            fgm7: stats[140],
                            ft_pct7: stats[141],
                            fta7: stats[142],
                            ftm7: stats[143],
                            oreb7: stats[144],
                            pf7: stats[145],
                            pts7: stats[146],
                            reb7: stats[147],
                            stl7: stats[148],
                            turnover7: stats[149],

                            a8: stats[150],
                            b8: stats[151],
                            dreb8: stats[152],
                            fg3_pct8: stats[153],
                            fg3a8: stats[154],
                            fg3m8: stats[155],
                            fg_pct8: stats[156],
                            fga8: stats[157],
                            fgm8: stats[158],
                            ft_pct8: stats[159],
                            fta8: stats[160],
                            ftm8: stats[161],
                            oreb8: stats[162],
                            pf8: stats[163],
                            pts8: stats[164],
                            reb8: stats[165],
                            stl8: stats[166],
                            turnover8: stats[167],

                            a9: stats[168],
                            b9: stats[169],
                            dreb9: stats[170],
                            fg3_pct9: stats[171],
                            fg3a9: stats[172],
                            fg3m9: stats[173],
                            fg_pct9: stats[174],
                            fga9: stats[175],
                            fgm9: stats[176],
                            ft_pct9: stats[177],
                            fta9: stats[178],
                            ftm9: stats[179],
                            oreb9: stats[180],
                            pf9: stats[181],
                            pts9: stats[182],
                            reb9: stats[183],
                            stl9: stats[184],
                            turnover9: stats[185],

                            a10: stats[186],
                            b10: stats[187],
                            dreb10: stats[188],
                            fg3_pct10: stats[189],
                            fg3a10: stats[190],
                            fg3m10: stats[191],
                            fg_pct10: stats[192],
                            fga10: stats[193],
                            fgm10: stats[194],
                            ft_pct10: stats[195],
                            fta10: stats[196],
                            ftm10: stats[197],
                            oreb10: stats[198],
                            pf10: stats[199],
                            pts10: stats[200],
                            reb10: stats[201],
                            stl10: stats[202],
                            turnover10: stats[203],

                            game_date1: stats[204],
                            opponent1: stats[205],

                            game_date2: stats[206],
                            opponent2: stats[207],

                            game_date3: stats[208],
                            opponent3: stats[209],

                            game_date4: stats[210],
                            opponent4: stats[211],

                            game_date5: stats[212],
                            opponent5: stats[213],

                            game_date6: stats[214],
                            opponent6: stats[215],

                            game_date7: stats[216],
                            opponent7: stats[217],

                            game_date8: stats[218],
                            opponent8: stats[219],

                            game_date9: stats[220],
                            opponent9: stats[221],

                            game_date10: stats[222],
                            opponent10: stats[223],

                            min1: stats[224],
                            min2: stats[225],
                            min3: stats[226],
                            min4: stats[227],
                            min5: stats[228],
                            min6: stats[229],
                            min7: stats[230],
                            min8: stats[231],
                            min9: stats[232],
                            min10: stats[233]




                        }
                        // console.log(stats[230])
                        res.render("stats", data)

                    }

                })
                .catch((err) => {
                    console.log(err);
                    // res.redirect('/error');
                });


        }

    }


});


app.listen(port, () => console.log(`Your app is running on https://nba-project-mt.herokuapp.com/ and port: ${port}!`));

