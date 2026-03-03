import { API_REST_COUNTRIES_URL } from "./constants.js";

const container = document.querySelector(".container");
const paises = document.createElement("div");
paises.className = "paises";

buscarPaises();

async function buscarPaises() {
    try {
        const response = await fetch(API_REST_COUNTRIES_URL);
        const data = await response.json();
        const primeirosDezPaises = data.slice(0, 11);

        exibirPaises(primeirosDezPaises);   
    }
    catch (error) {
        console.error("Não foi possível buscar os países", error);
    }
}

function exibirPaises(primeirosDezPaises) {
    for (let i = 0; i <= primeirosDezPaises.length; i++) {
        const listaDePaises = primeirosDezPaises[i];
        console.log(listaDePaises);

        const { flags, name, population } = listaDePaises;
        const { alt, png, svg} = flags;
        const {common, nativeName, official } = name;

        const paises = document.createElement("div");
        paises.className = "paises";

        paises.innerHTML = `
            <div class="card">
                <img src="${png}" alt="${alt}">
                <p class="pais__nome">${common}</p>
                <p class="pais__populacao">${population}</p>
            </div>`;

        container.appendChild(paises);  
    }
}
