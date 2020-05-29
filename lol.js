
function lol() {
fetch("/:name")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data)
    });
}

lol();