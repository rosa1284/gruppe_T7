const urlParams = new URLSearchParams(window.location.search);


/*singleDish kommer fra det andet script dokument script.js, der hvor vi linker over til den nye side */
const id = urlParams.get("album");
console.log(id);

let album;

const url = "https://spreadsheets.google.com/feeds/list/1JZaKWrVtkj-qGVCfIds-V04jho2DVpx5GrNsChLv_Sk/od6/public/values?alt=json"

document.addEventListener("DOMContentLoaded", getJson);



async function getJson() {
    const jsonData = await fetch(url);
    console.log("jsonData", jsonData);
    album = await jsonData.json();
    viewAlbum();


}

function viewAlbum() {
    console.log("view album", album);



    album.feed.entry.forEach((cd) => {

        console.log(cd.gsx$id.$t);
        if (cd.gsx$id.$t == id) {
            console.log(cd);
            document.querySelector("#view img").src = `img/${cd.gsx$billede.$t}`;
            document.querySelector("#view .titel").textContent = ` ${cd.gsx$titel.$t}`;
            document.querySelector("#view .artist").textContent = cd.gsx$artist.$t;
            document.querySelector("#view .pris").textContent = `Pris: ${cd.gsx$pris.$t} kr`;
            document.querySelector("#view .udgivelsesår").textContent = ` Udgivelsesår: ${cd.gsx$udgivelsesår.$t}`;
            document.querySelector("#view .genre").textContent = `Genre: ${ cd.gsx$genre.$t}`;
            document.querySelector(".view_boks").classList.add(cd.gsx$genre.$t);
            //document.querySelector("#view .track").textContent = cd.gsx$track.$t;
            var sange = cd.gsx$track.$t.split(",");
            sange.forEach((sang) => {
                var li = document.createElement("li");
                var text = document.createTextNode(sang);
                li.appendChild(text);
                document.querySelector("#view .track").appendChild(li);
            });
        }
    })

}
document.querySelector(".close").addEventListener("click", () => {
    history.back();
});
