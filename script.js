let alleGenre = []; // tomt array - her skal alle albums fra json fil lægges
let filterKategori = "alle"; // alle skal vises som udgangspunkt
const temp = document.querySelector("template"); // Er vores struktur som vi bruger til at klone albums ind i
const modtagerKloner = document.querySelector(".modtager"); // tom liste der skal indeholde album

// Konstanter der definere vores gradients for hver genre
const rockGradient = "linear-gradient(to top, rgb(185, 45, 83) 30%, rgba(255, 255, 255, 0) 50%)";
const danskGradient = "linear-gradient(to top, rgb(149, 217, 89) 30%, rgba(255, 255, 255, 0) 50%)";
const popGradient = "linear-gradient(to top, rgb(249, 236, 77) 30%, rgba(255, 255, 255, 0) 50%)";
const countryGradient = "linear-gradient(to top, rgb(134, 228, 228) 30%, rgba(255, 255, 255, 0) 50%)";
const julGradient = "linear-gradient(to top, rgb(129, 73, 255) 30%, rgba(255, 255, 255, 0) 50%)";

document.addEventListener("DOMContentLoaded", getJson); // Program går igang når DOM er loaded


async function getJson() { //json filerne hentes og albums lægges i alleGenre det tomme array og funktionerne visGenre og addEventListenerToButtons kaldes

    let jsonData = await fetch("https://spreadsheets.google.com/feeds/list/1JZaKWrVtkj-qGVCfIds-V04jho2DVpx5GrNsChLv_Sk/od6/public/values?alt=json");
    console.log("jsonData", jsonData);
    alleGenre = await jsonData.json();
    visGenre();
    addEventListenerToButtons();
}

function visGenre() {
    modtagerKloner.innerHTML = ""; // ModtagerKloner nulstiller/tømmes

    console.log(alleGenre);

    alleGenre.feed.entry.forEach(genre => { //Genre-array gennemgås genre for genre og en article udfyldes for hvert album og tilføjes til modtagerKloner hvis de har den rette filter kategori
        if ((filterKategori == "alle" || genre.gsx$genre.$t == filterKategori)) {
            const klon = temp.cloneNode(true).content;
            klon.querySelector("h2").textContent = genre.gsx$titel.$t
            klon.querySelector(".artist").textContent = genre.gsx$artist.$t;

            // afhængig af albummets genre skal der tilføjes en specifik gradient defineret i konstanterne i starten. Disse bliver sat som baggrundsbillede sammen med albummets billede. Gradienten er først, da det første "billede" lægger øverst når man bruger flere billeder som baggrund, og en gradient fungere som et billede
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

            // Vælger det sidst tilføjede element i modtagerKloner og tilføjer en eventlistner for "click" som går til album.html med albummets id som parameter
            modtagerKloner.lastElementChild.addEventListener("click", () => {
                location.href = `album.html?album=${genre.gsx$id.$t}`;
            });
        }
    });
}

function addEventListenerToButtons() { // lytter efter "click" på filterknapperne kalder funktionen filtrering
    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtrering);
    });
}

function filtrering() { // Finder den kategori knap der er klikket på og skifter class for den valgte knap inden vi kalder visGenre funktionen
    filterKategori = this.dataset.kategori;
    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("valgt");
    });
    this.classList.add("valgt");
    visGenre();
}
