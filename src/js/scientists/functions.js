// import * as elementsArr from "./elements";
// import { buttons } from "./buttons";
// import { switchCardFunction } from "../scientists";

export const functions = {
  
    pickCardFunction(event, elems, btns) {
      const index = elems.buttons.indexOf(elems.pickedButton);
      const { arr } = btns[index];
      if (!event.classList.contains("scientist-item-picked")) {
        arr.push(event);
        event.classList.add("scientist-item-picked");
      } else {
        event.classList.remove("scientist-item-picked");
        arr.splice(arr.indexOf(event), 1);
      }
      console.log(arr)
    },
    putCardOnListFunction(event, elems, btns) {
      if (event.target.nodeName !== "LI") {
        return
      }
      const index = elems.buttons.indexOf(elems.pickedButton);
      const { arr, clueArr } = btns[index];
      if (!event.target.classList.contains("scientist-item-picked")) {
        const clue = document.createElement("p");
        clue.classList.add("clue-text-list");
        clueArr.push(clue);
        arr.push(event.target);
        clue.textContent = arr.length;
        event.target.classList.add("scientist-item-picked");
        event.target.append(clue);
      } else {
        const clueIndex = clueArr.indexOf(event.target.lastChild)
        const clueToDelete = event.target.lastChild
        event.target.classList.remove("scientist-item-picked");
        arr.splice(clueIndex, 1);
        clueArr.splice(clueIndex, 1);
        clueToDelete.remove();
        clueArr.forEach((item) => {
          item.textContent = clueArr.indexOf(item) + 1;
        } )
      }
      
    },
    leaveGameFunction(elems, btns) {
      const index = elems.buttons.indexOf(elems.pickedButton);
      const { clueArr, name } = btns[index];
      clueArr.forEach((item) => {
        item.remove()
      })
      elems.scientistsArr.forEach((item) => item.classList.remove("true", "false", "didnt-pick", "scientist-item-picked"));
      btns[index].clueArr = [];
      btns[index].arr = [];
      elems.scientistsArr.forEach((item) => {
        elems.taskText.textContent = `Завдання: ${name} `;
        const text = Array.from(document.querySelectorAll(`.scientist-text`));
        text.forEach((item) => {
          item.style.display = "block";
          item.classList.remove("clue-text", "clue-text-list");
        })
        item.style.animationName = "";
        item.style.backgroundImage = `none`;
        elems.pickedButton.textContent = name;
      })
      elems.buttons.forEach((item) => item.toggleAttribute("disabled"));
      elems.pickedButton.toggleAttribute("disabled");
      elems.pickedButton.removeEventListener("click", functions.leaveGameFunction);
      elems.pickedButton.classList.toggle("asd")
      elems.taskText.textContent = "Обери завдання";
      elems.buttonsContainerEl.addEventListener("click", switchCardFunction);
    },
    addInputFunction(btn, elems, scientists) {
      if (btn.nodeName !== "BUTTON") {
        return
      }
      const input = document.querySelector(".scientists-btn > .scientist-input");
      btn.innerHTML = "Вийти";
      const name = "Albert Einstein";
      const neededObj = scientists.find((item) => `${item.name} ${item.surname}` === name);
      const born = neededObj.born;
      Number(input.value) === born ? elems.taskText.textContent = "Молодець! Правильно!" : elems.taskText.textContent = "Неправильно!";
      const text = Array.from(document.querySelectorAll(`li > .scientist-year`));
        text.forEach((item) => {
          item.style.display = "block";
          item.classList.add("clue-text");
        })
        elems.pickedButton.removeEventListener("click", functions.addInputFunction);
        elems.pickedButton.addEventListener("click", functions.leaveGameFunction);
    }
    
  }