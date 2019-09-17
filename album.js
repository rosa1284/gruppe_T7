const urlParams = new URLSearchParams(window.location.search); // Parameter med fra forrige side, indeholder album id

/*album kommer fra det andet script dokument script.js, der hvor vi linker over til den nye side */
const id = urlParams.get("album"); // Værdien af album hives ud af parameter og gemmes i id
console.log(id);

let album = []; // Tomt array der skal indeholde albummets data

document.addEventListener("DOMContentLoaded", getJson); // Program går igang når DOM er loaded

async function getJson() { //json filerne hentes og albums lægges i album det tomme array og funktionen viewAlbum kaldes
    const jsonData = await fetch("https://spreadsheets.google.com/feeds/list/1JZaKWrVtkj-qGVCfIds-V04jho2DVpx5GrNsChLv_Sk/od6/public/values?alt=json");
    console.log("jsonData", jsonData);
    album = await jsonData.json();
    viewAlbum();
}

function viewAlbum() {
    console.log("view album", album);
    album.feed.entry.forEach((cd) => { //Album-array gennemgås cd for cd og en section udfyldes for det album der passer til id'et

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

            let sange = cd.gsx$track.$t.split(","); // Vi deler tracklisten ved kommaer og gemmer dem som et array i variablen sange
            sange.forEach((sang) => { //gemmenløber arrayet sange og lavet li element for hver sang og tilføjer dem til .track
                let li = document.createElement("li");
                let text = document.createTextNode(sang);
                li.appendChild(text);
                document.querySelector("#view .track").appendChild(li);
            });
        }
    })
}
document.querySelector(".close").addEventListener("click", () => {
    history.back(); // Ved klik på tilbage knap går vi tilbage til forrige side
});
