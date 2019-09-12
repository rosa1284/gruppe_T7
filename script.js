document.addEventListener("DOMContentLoaded", getJson);

let alleGenre = [];
let filterKategori = "alle";
const dest = document.querySelector("liste");
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


    //    const temp = document.querySelector("template"); filterKøn nedeunder


    alleGenre.feed.entry.forEach(genre => {
        //listeVisning.innerHTML += `<p>${hvertDyr.navn}, ${hvertDyr.type}, ${hvertDyr.levested}</p>`;
        if ((filterKategori == "alle" || genre.gsx$genre.$t == filterKategori)) {
            const klon = temp.cloneNode(true).content;
            klon.querySelector("h2").textContent = genre.gsx$titel.$t
            //klon.querySelector(".genre").textContent = genre.gsx$genre.$t;
            //klon.querySelector(".pris").textContent = `Pris: ${genre.gsx$pris.$t} kr.`;
            klon.querySelector(".artist").textContent = `Kunstner: ${genre.gsx$artist.$t};`
            //klon.querySelector(".udgivelsesår").textContent = `${genre.gsx$udgivelsesår.$t}`;
            //klon.querySelector(".lang").textContent = ret.gsx$lang.$t;
            //klon.querySelector(".track").textContent = genre.gsx$track.$t;
            klon.querySelector("img").src = `img/${genre.gsx$billede.$t}`;
            modtagerKloner.appendChild(klon);
            modtagerKloner.lastElementChild.addEventListener("click", () => {
                visSingle(ret)
            });

        }




    })
}

function addEventListenerToButtons() {
    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtrering)
    })
}

function filtrering() {
    filterKategori = this.dataset.kategori;
    document.querySelector("h2").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("valgt");
    })
    this.classList.add("valgt");
    visGenre();
}
