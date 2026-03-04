import { API_REST_COUNTRIES_URL } from "./constants.js";

const container = document.querySelector(".container");
const paises = document.createElement("div");
paises.className = "paises";
container.appendChild(paises);

let todosPaises = [];
let paisesExibidos = 10;

buscarPaises();

async function buscarPaises() {
    try {
        const response = await fetch(API_REST_COUNTRIES_URL);
        const data = await response.json();
        todosPaises = data;
        exibirPaises(todosPaises.slice(0, paisesExibidos));     
    }
    catch (error) {
        console.error("Não foi possível buscar os países", error);
    }
}

function exibirPaises(todosPaises) {
    todosPaises.map(pais => {
        const { flags, name, population } = pais;
        const { alt, png, svg} = flags;
        const {common, nativeName, official } = name;

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${png}" alt="${alt}">
            <p class="pais__nome">${common}</p>
            <p class="pais__populacao"><i class="bi bi-people-fill"></i>${population.toLocaleString('en-US')}</p>
            `; 
        
        paises.appendChild(card);
    })
}

const buscar = document.getElementById("buscar");

buscar.addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();

    const paisesFiltrados = todosPaises.filter(pais => 
        pais.name.common.toLowerCase().includes(termo)
    );

    paises.innerHTML = "";
    exibirPaises(paisesFiltrados);
});

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        carregarMais();
    }
})

function carregarMais() {
    paisesExibidos += 10;
    paises.innerHTML = "";
    exibirPaises(todosPaises.slice(0, paisesExibidos));
}