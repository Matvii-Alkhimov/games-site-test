import AdaLovelace from '../images_and_icons/images/scientists/Ada_Lovelace.jpg';
import AlbertEinstein from '../images_and_icons/images/scientists/Albert_Einstein.jpg';
import GalileoGalilei from '../images_and_icons/images/scientists/Galileo_Galilei.jpg';
import HannaHammarström from '../images_and_icons/images/scientists/Hanna_Hammarström.jpg';
import IsaacNewton from '../images_and_icons/images/scientists/Isaac_Newton.jpg';
import JohannesKepler from '../images_and_icons/images/scientists/Johannes_Kepler.jpg';
import KatherineBlodgett from '../images_and_icons/images/scientists/Katherine_Blodgett.jpg';
import LiseMeitner from '../images_and_icons/images/scientists/Lise_Meitner.jpg';
import MarieCurie from '../images_and_icons/images/scientists/Marie_Curie.jpg';
import MaxPlanck from '../images_and_icons/images/scientists/Max_Planck.jpg';
import NikolausCopernikus from '../images_and_icons/images/scientists/Nikolaus_Copernikus.jpg';
import SarahGoode from '../images_and_icons/images/scientists/Sarah_Goode.jpg';

import scientists from '../arrays/scientists.json';
import buttonsArr from '../arrays/scientists-buttons.json';

import scientistTpl from '../templates/scientist.handlebars';
import buttonsTpl from '../templates/scientist-buttons.handlebars';

import { buttons } from "./scientists/buttons";
import { elements } from './scientists/elements';
import { functions } from './scientists/functions';
import * as endGameFunctions from './scientists/end-game-functions';

const imagesArr = [
  AlbertEinstein, IsaacNewton, GalileoGalilei,
  MarieCurie, JohannesKepler, NikolausCopernikus,
  MaxPlanck, KatherineBlodgett, AdaLovelace,
  SarahGoode, LiseMeitner, HannaHammarström
];

elements.scientistsList.classList.add("scientists-list");
elements.buttonsContainerEl.classList.add("buttons-container");

elements.scientistsList.innerHTML = scientistTpl(scientists);
elements.buttonsContainerEl.innerHTML = buttonsTpl(buttonsArr);
elements.scientistContainer.append(elements.scientistsList, elements.buttonsContainerEl);

elements.taskText.textContent = "Обери завдання";
elements.taskText.classList.add("task-text");
elements.scientistsList.before(elements.taskText);

elements.buttons = Array.from(document.querySelectorAll(".scientists-btn"));
elements.scientistsArr = Array.from(document.querySelectorAll(".scientists-list > li"));

export function switchCardFunction(event) {
  if (event.target.nodeName !== "BUTTON") {
    return
  }
  elements.scientistContainer.scrollIntoView({behavior: 'smooth'});
  elements.pickedButton = event.target;
  // if (elements.pickedButton.classList.contains("asd")) {
  //   elements.pickedButton.classList.toggle("asd");
  //   return
  // }
  const btnIndex = elements.buttons.indexOf(event.target);
  const endFunction = Object.values(endGameFunctions)[btnIndex];

  event.target.textContent === "Вийти" ? event.target.textContent = "Закрити" : event.target.textContent = "Перевірити";
  // event.target.textContent === "Перевірити"
  elements.taskText.textContent = `Завдання: ${buttons[btnIndex].name} `;
  elements.scientistsArr.forEach((item, index) => {
    const text = Array.from(document.querySelectorAll(`.scientist-text`));
    text.forEach((item) => item.style.display = "none")
    item.style.animationName = "showImages";
    item.style.backgroundImage = `url(${imagesArr[index]})`;
    item.style.cursor = "pointer";
    if (btnIndex === 1 || btnIndex === 2) {
      item.addEventListener("click", functions.putCardOnListFunction);
    } else if (btnIndex === 4) {
      item.style.cursor = "auto";
      elements.buttons.forEach((button) => button.toggleAttribute("disabled"));
      elements.buttons[btnIndex].toggleAttribute("disabled");
      event.target.innerHTML = `
      <input class="scientist-input" name="scientist-input"></input>
      Перевірити
      `
      event.target.addEventListener("click", functions.addInputFunction);
      return
    } else {
      item.addEventListener("click", functions.pickCardFunction(event, elements, buttons));
    }
  })
  elements.buttons.forEach((button) => button.toggleAttribute("disabled"));
  elements.buttons[btnIndex].toggleAttribute("disabled");

  event.target.addEventListener("click", endFunction);
  // event.target.addEventListener("click", buttons[btnIndex].checkCardFunction);
  elements.buttonsContainerEl.removeEventListener("click", switchCardFunction);
}

elements.buttonsContainerEl.addEventListener("click", onStartButtonClick);


function onStartButtonClick(event) {
  if (event.target.nodeName !== "BUTTON") {
    return
  }
  elements.buttonsContainerEl.removeEventListener("click", onStartButtonClick);
  elements.scientistContainer.scrollIntoView({behavior: 'smooth'});
  elements.pickedButton = event.target;

  const btnIndex = elements.buttons.indexOf(event.target);
  elements.endFunction = Object.values(endGameFunctions)[btnIndex];

  event.target.textContent === "Вийти" ? event.target.textContent = "Закрити" : event.target.textContent = "Перевірити";
  elements.taskText.textContent = `Завдання: ${buttons[btnIndex].name} `;

  showImages();
}

function showImages() {
  elements.scientistsArr.forEach((item, index) => {
    const text = Array.from(document.querySelectorAll(`.scientist-text`));
    text.forEach((item) => item.style.display = "none");

    item.style.animationName = "showImages";
    item.style.backgroundImage = `url(${imagesArr[index]})`;
    item.style.cursor = "pointer";
  })
  recognizeGameType();
}

function recognizeGameType() {
    elements.buttons.forEach((button) => button.toggleAttribute("disabled"));
    elements.pickedButton.toggleAttribute("disabled");
    
    if (elements.pickedButton.dataset.type === "input") {
      elements.scientistsArr.forEach((item) => item.style.cursor = "auto");
      elements.pickedButton.innerHTML = `
      <input class="scientist-input" name="scientist-input"></input>
      Перевірити
      `
      elements.pickedButton.addEventListener("click", onInputButtonClick);
      return
    }
    elements.scientistsArr.forEach((item) => item.addEventListener("click", onScientistItemClick));
    elements.pickedButton.addEventListener("click", checkAnswerFunction);
}

function onScientistItemClick(event) {
  const itm = event.target;
  const gameType = elements.pickedButton.dataset.type;
  if (gameType === "find") {
    functions.pickCardFunction(itm, elements, buttons);
  } else if(gameType === "sort") {
    functions.putCardOnListFunction(itm, elements, buttons);
  }
}

function onInputButtonClick(event) {
  const itm = event.target;
  console.log(event.target)
  functions.addInputFunction(itm, elements, scientists);
}

function checkAnswerFunction() {
  elements.scientistsArr.forEach((item) => {
    item.style.cursor = "auto";
    item.removeEventListener("click", onScientistItemClick);
    
  });
  elements.endFunction(elements, buttons);
}