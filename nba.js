var request = new XMLHttpRequest()
request.open('GET', 'https://www.balldontlie.io/api/v1/players', TRUE);
request.onload = function() {
    var data = JSON.parse(this.response)
    if(request.status >= 200 && request.status < 400) {
        data.forEach( player => {
            console.log(player.first_name)
        })
    } else {
        alert('Error');
    }
}

request.send();

function getSearch() {

}