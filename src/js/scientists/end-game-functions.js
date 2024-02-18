// import { elements } from "./elements";
// import { buttons } from "./buttons";

export function endGameFn1(elements, buttons) {
    elements.scientistContainer.scrollIntoView({behavior: 'smooth'});
    const index = elements.buttons.indexOf(elements.pickedButton);
    const { arr, clueArr } = buttons[index];
    elements.pickedButton.textContent = "Вийти";

    arr.forEach((item) => {
        const answer = document.createElement("p");
        answer.classList.add("scientist-answer");
        const date = item.dataset.born;
        const clue = document.createElement("p");
        clue.classList.add("clue-text");
        clueArr.push(clue);
        if (date > 1800 && date < 1900) {
          item.classList.add("true");
          clue.textContent = "Правильно!";
        } else {
          item.classList.add("false");
          clue.textContent = "Неправильно!";
        }
        item.append(clue);
      })


      
}