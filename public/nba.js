
window.onload = loadPlayers;


function loadPlayers() {
    var playersList = [];
    const search = document.getElementById("search");


    search.addEventListener('keyup', (e) => {
        const input = e.target.value.toLowerCase();
        console.log(input)
        console.log(input.length)


        if (input.length < 2) {
            playersList = [];
            var matches = playersList.filter(function (item) {
                return item.toLowerCase().indexOf(input) > -1;
            }).map(function (item) {
                return `

                    <li ><a href=""></a></li>
                            `
            }).join('');
            r.innerHTML = matches;
            
        }


        else if(input.length >= 2) {
            fetch(`https://www.balldontlie.io/api/v1/players?search=${input}&per_page=100`)
            .then((res) => {
                return res.json();
            })                
            .then((data) => {


                    playersList = [];
                    if(data.meta.total_pages == 1) {
                        console.log(data.meta.total_pages)
                        for (var i = 0; i < data.data.length; i++) {
                            var name = data.data[i].id + ": " + data.data[i].first_name + " " + data.data[i].last_name + " - " + data.data[i].team.abbreviation;

                            playersList.push(name);

                        }

                        console.log(playersList);

                        var matches = playersList.filter(function (item) {
                            return item.toLowerCase().indexOf(input) > -1;
                        }).map(function (item) {
                            return `

                            <li ><a href="/${item.split(":")[0]}">${item.split(":")[1]}</a></li>
                            `
                        }).join('');
                        r.innerHTML = matches;


    
                    }
                    else if(data.meta.total_pages > 1) {
                        console.log(data.meta.total_pages)

                        for (var k = 1; k < data.meta.total_pages + 1; k++) {
                            fetch(`https://www.balldontlie.io/api/v1/players?search=${input}&per_page=100&page=${k}`)
                                .then(res => res.json())
                                .then((data) => {
                                    for (var j = 0; j < data.data.length; j++) {
                                        var name = data.data[j].first_name + " " + data.data[j].last_name + " - " + data.data[j].team.abbreviation;

                                        playersList.push(name);


                                    } 
                                    

                                })


                        }
                        console.log(playersList);

                        var matches = playersList.filter(function (item) {
                            return item.toLowerCase().indexOf(input) > -1;
                        }).map(function (item) {
                            return `

                            <li><a href="/${item.split(":")[0]}">${item.split(":")[1]}</a></li>
                            `
                        }).join('');
                        r.innerHTML = matches;


                    }

                })

        }   
    
    })

}




function filterPlayers() {
    var input, filter, li, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    li = document.getElementsByTagName("li");

    for (var i = 0; i < li.length; i++) {
        txtValue = li[i].innerText;
        txtValue.split("-")[0];
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }

    }
}



// function playerInfo() {
//     console.log("gag")
//     fetch("/:name") 
//         .then((res) => {
//             return res.json();
//         })
//         .then((data) => {

//             console.log(data)

//     })
// }





// playerInfo();





