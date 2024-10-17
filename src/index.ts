import {
    recive,
    Result,
} from "./interfaces/IRickyAndMorty_API.js";


const container_characters = document.querySelector(".container_characters") as HTMLDivElement
const buttons = document.querySelector(".buttons") as HTMLDivElement

let currentPage: number = 1;
document.addEventListener("DOMContentLoaded", () => {
    loadCharacters(currentPage);

    const prevButton = document.createElement("button") as HTMLButtonElement;
    prevButton.innerText = "Previous";
    prevButton.className = "prevButton"
    prevButton.addEventListener("click", () => changePage(-1));

    const nextButton = document.createElement("button") as HTMLButtonElement;
    nextButton.innerText = "Next";
    nextButton.className = "nextButton"
    nextButton.addEventListener("click", () => changePage(1));


    // Agregar botones al contenedor inicialmente
    buttons.appendChild(prevButton);
    buttons.appendChild(nextButton);

    // Función para actualizar la visibilidad de los botones
    const updateButtonVisibility = () => {
        prevButton.style.display = currentPage === 1 ? "none" : "block";
        nextButton.style.display = currentPage === 42 ? "none" : "block";
    };

    // Llamar a la función para establecer la visibilidad inicial
    updateButtonVisibility();

});

const loadCharacters = async (page: number) => {
    const data: Result[] = await getAllCharacters(page);
    container_characters.innerHTML = '';

    data.forEach((character: Result) => {
        console.log(character)

        //container for each character
        const containerCharacter = document.createElement("div") as HTMLDivElement
        containerCharacter.className = "containerCharacter"

        //containers for the image and the information about the character
        const containerImg = document.createElement("div") as HTMLDivElement
        const containerInformation = document.createElement("div") as HTMLDivElement
        containerImg.className = "containerImg"
        containerInformation.className = "containerInf"

        //create and assing the elements for the img and the information of the character
        const name = document.createElement("p") as HTMLParagraphElement
        const status = document.createElement("p") as HTMLParagraphElement
        const species = document.createElement("p") as HTMLParagraphElement
        const gender = document.createElement("p") as HTMLParagraphElement
        const origin = document.createElement("p") as HTMLParagraphElement
        const location = document.createElement("p") as HTMLParagraphElement
        const image = document.createElement("img") as HTMLImageElement


        name.innerText = `${character.name}`;
        status.innerText = `${character.status}`
        species.innerText = `${character.species}`
        gender.innerText = `${character.gender}`
        origin.innerText = `${character.origin}`
        location.innerText = `${character.origin.name}`
        image.src = character.image
        image.className = "characterPhoto"


        // Change the color of the status based on its value
        switch (character.status) {
            case "Alive":
                status.style.color = "#4bff51";
                break;
            case "Dead":
                status.style.color = "red";
                break;
            default:
                status.style.color = "black ";
                break;
        }


        //añadir los elementos a los contenedores correspondientes
        containerImg.appendChild(image)
        containerInformation.appendChild(name)
        containerInformation.appendChild(status)

        //añadir los contenedores al contenedor principal
        containerCharacter.appendChild(containerImg)
        containerCharacter.appendChild(containerInformation)

        container_characters.appendChild(containerCharacter)

        // Crear la ventana de información adicional
        const additionalInfo = document.createElement("div") as HTMLDivElement;
        additionalInfo.className = "additional-info";
        additionalInfo.style.display = "none";
        additionalInfo.innerHTML = `
            <h3>${character.name}</h3>
            <p>Status: ${status.innerText}</p>
            <p>Species: ${species.innerText}</p>
            <p>Gender: ${gender.innerText}</p>
            <p>Location: ${location.innerText}</p>
        `;
        containerCharacter.appendChild(additionalInfo);
        
        // Mostrar información adicional al pasar el mouse
        containerCharacter.addEventListener("mouseenter", () => {
            additionalInfo.style.display = "block";
        });
        
        // Ocultar información adicional al quitar el mouse
        containerCharacter.addEventListener("mouseleave", () => {
            additionalInfo.style.display = "none";
        });
    })
    updateButtonVisibility();
}


const changePage = (increment: number) => {
    currentPage += increment;

    loadCharacters(currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazarse a la parte superior de la página
    updateButtonVisibility(); // Actualizar la visibilidad de los botones después de cambiar de página
};

const updateButtonVisibility = () => {
    const prevButton = document.querySelector(".prevButton") as HTMLButtonElement;
    const nextButton = document.querySelector(".nextButton") as HTMLButtonElement;
    
    prevButton.style.display = currentPage === 1 ? "none" : "block";
    nextButton.style.display = currentPage === 42 ? "none" : "block";
};

const getAllCharacters = async (page: number): Promise<Result[]> => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
    let data: recive = await response.json();
    return data.results;
};
