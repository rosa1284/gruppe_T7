let alleGenre = [];
let filterKategori = "alle";
const temp = document.querySelector("template");
const modtagerKloner = document.querySelector(".modtager");
const rockGradient = "linear-gradient(to top, rgb(185, 45, 83) 30%, rgba(255, 255, 255, 0) 50%)";
const danskGradient = "linear-gradient(to top, rgb(149, 217, 89) 30%, rgba(255, 255, 255, 0) 50%)";
const popGradient = "linear-gradient(to top, rgb(249, 236, 77) 30%, rgba(255, 255, 255, 0) 50%)";
const countryGradient = "linear-gradient(to top, rgb(134, 228, 228) 30%, rgba(255, 255, 255, 0) 50%)";
const julGradient = "linear-gradient(to top, rgb(129, 73, 255) 30%, rgba(255, 255, 255, 0) 50%)";
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
            if (genre.gsx$genre.$t == "rock") {
                klon.querySelector("article").style.backgroundImage = `${rockGradient}, url(img/${genre.gsx$billede.$t})`;
            } else if (genre.gsx$genre.$t == "dansk") {
                klon.querySelector("article").style.backgroundImage = `${danskGradient}, url(img/${genre.gsx$billede.$t})`;
            } else if (genre.gsx$genre.$t == "pop") {
                klon.querySelector("article").style.backgroundImage = `${popGradient}, url(img/${genre.gsx$billede.$t})`;
            } else if (genre.gsx$genre.$t == "country") {
                klon.querySelector("article").style.backgroundImage = `${countryGradient}, url(img/${genre.gsx$billede.$t})`;
            } else if (genre.gsx$genre.$t == "jul") {
                klon.querySelector("article").style.backgroundImage = `${julGradient}, url(img/${genre.gsx$billede.$t})`;
            }
            klon.querySelector("article").classList.add(genre.gsx$genre.$t);
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
    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("valgt");
    });
    this.classList.add("valgt");
    visGenre();
}
