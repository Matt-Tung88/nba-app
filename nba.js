var playersList = [];
// let search = document.getElementById("search");
// search.addEventListener("keyup", (n) => {
//     const searchString = n.target.value.toLowerCase();
//     // console.log(n.target.value);
//     const filteredPlayers = playersList.filter((player) => {
//         return (
//             player.toLowerCase().includes(searchString)
//         );
//     });
//     return filteredPlayers;
//     // displayPlayer(filteredPlayers);
// });


function loadPlayers() {

    fetch('https://www.balldontlie.io/api/v1/players')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            for(var i = 0; i < data.data.length; i++){
                var name = data.data[i].first_name + " " + data.data[i].last_name;
                // console.log(data.data[i].first_name);
              

                console.log(playersList.push(name));
                console.log(typeof(name))
                // console.log(typeof(playersList))
            }
            // console.log(playersList);
            // console.log(data.data[1].first_name);
            return data;

        })

}


loadPlayers();

console.log(playersList);


// function createList(players) {
//     var ul = document.createElement("ul");
//     var li = document.createElement("li");
//     for(var i = 0; i < players.length; i++) {

//         li.appendChild(document.createTextNode(players[i]));
//         ul.appendChild(li);
//     }
//     console.log(ul);
// }

// createList(playersList);