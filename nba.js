// const playersList = [];

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

window.onload = loadPlayers;

function loadPlayers() {
    const playersList = [];

    fetch('https://www.balldontlie.io/api/v1/players')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            for(var i = 0; i < data.data.length; i++){
                // playersList[i] = data.data[i].first_name + " " + data.data[i].last_name;
                // console.log(data.data[i].first_name);
                var name = data.data[i].first_name + " " + data.data[i].last_name;  
                // + " - " + data.data[i].team.abbreviation;
                playersList.push(name);
                // console.log(name)
            }
            // console.log(playersList);
            // console.log(data.data[1].first_name);

            return createList(playersList);
        })
}




function createList(players) {
    var ul = document.createElement("ul");

    for(var i = 0; i < players.length; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(players[i]));
        ul.appendChild(li);
    }
    // document.querySelector("#search").append(ul);
    document.querySelector("#lol").append(ul);

}

function filterPlayers() {
    var input, filter, li, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    li = document.getElementsByTagName("li");

    for(var i=0; i < li.length; i++) {
        txtValue = li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }

    }
}
