let alleGenre = [];
let filterKategori = "alle";
const temp = document.querySelector("template");
const modtagerKloner = document.querySelector(".modtager");
document.addEventListener("DOMContentLoaded", getJson);

async function getJson() {
    let jsonData = await fetch("https://spreadsheets.google.com/feeds/list/1JZaKWrVtkj-qGVCfIds-V04jho2DVpx5GrNsChLv_Sk/od6/public/values?alt=json");
    console.log("jsonData", jsonData);
    alleGenre = await jsonData.json();
    visGenre();
    addEventListenerToButtons();
}

function visGenre() {
    modtagerKloner.innerHTML = "";

    console.log(alleGenre);

    alleGenre.feed.entry.forEach(genre => {
        if ((filterKategori == "alle" || genre.gsx$genre.$t == filterKategori)) {
            const klon = temp.cloneNode(true).content;
            klon.querySelector("h2").textContent = genre.gsx$titel.$t
            klon.querySelector(".artist").textContent = genre.gsx$artist.$t;
            klon.querySelector("img").src = `img/${genre.gsx$billede.$t}`;
            modtagerKloner.appendChild(klon);
            modtagerKloner.lastElementChild.addEventListener("click", () => {
                location.href = `album.html?album=${genre.gsx$id.$t}`;
            });
        }
    });
}

function addEventListenerToButtons() {
    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtrering);
    });
}

function filtrering() {
    filterKategori = this.dataset.kategori;
    document.querySelector("h1").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("valgt");
    });
    this.classList.add("valgt");
    visGenre();
}
