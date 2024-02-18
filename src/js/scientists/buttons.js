// import { elements } from "./elements";
// import { functions } from "./functions";
// import scientists from "../../arrays/scientists.json";

export const buttons = [
    {
      name: "Які вчені народилися в 19 ст.",
      num: 0,
      arr: [],
      clueArr: [],
      checkCardFunction() {
        // elements.scientistContainer.scrollIntoView({behavior: 'smooth'});
        // const index = elements.buttons.indexOf(elements.pickedButton);
        // const { arr, clueArr } = buttons[index];
        // elements.pickedButton.textContent = "Вийти";
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
        elements.scientistsArr.forEach((item) => {
          item.style.cursor = "auto";
          const date = item.dataset.born;
          if (date > 1800 && date < 1900 && !item.classList.contains("true")) {
            item.classList.add("didnt-pick");
            const clue = document.createElement("p");
            clue.classList.add("clue-text");
            clueArr.push(clue);
            clue.textContent = "Забув вибрати";
            item.append(clue);
          }
          item.removeEventListener("click", functions.pickCardFunction);
        })
        elements.pickedButton.removeEventListener("click", buttons[index].checkCardFunction);
        elements.pickedButton.addEventListener("click", functions.leaveGameFunction);
      },
    },
    // 
    {
      name: "Відсортувати вчених за алфавітом",
      num: 1,
      arr: [],
      clueArr: [],
      checkCardFunction() {
        elements.scientistContainer.scrollIntoView({behavior: 'smooth'});
        const index = elements.buttons.indexOf(elements.pickedButton);
        const { arr, clueArr } = buttons[index];
        if (arr.length !== elements.scientistsArr.length) {
          return alert("Обери усіх вчених перед тим як перевірити чи правильно ти їх розташував!");
        }
        elements.pickedButton.textContent = "Вийти";
        const trueList = [];
        arr.forEach((item) => trueList.push(`${item.dataset.name} ${item.dataset.surname}`));
        trueList.sort();
        arr.forEach((item) => {
          
          for (let i = 0; i < arr.length; i += 1) {
            const neededClue = arr[i].firstChild.textContent;
            const rightAnswer = trueList[i];
            neededClue === rightAnswer ? arr[i].classList.add("true") : arr[i].classList.add("false");
            const text = Array.from(document.querySelectorAll(`li > .scientist-name`));
            text.forEach((item) => {
              item.style.display = "block";
              item.classList.add("clue-text");
            })
            
          }
        })
        clueArr.forEach((item) => {
          const parent = item.parentNode;
          const answerPicked = item.textContent;
          const rightAnswer = trueList.findIndex((answer) => answer === parent.firstChild.textContent);
          item.classList.remove("clue-text", "clue-text-list");
          item.classList.add("true-clue-text");
          if (answerPicked != rightAnswer + 1) {
            item.innerHTML = `
            <span class="wrong-answer"> ${answerPicked} </span>    ${rightAnswer + 1}
            `
          }
          elements.scientistsArr.forEach((item) => {
            item.removeEventListener("click", functions.putCardOnListFunction);
            item.style.cursor = "auto";
          }) 
        });
        elements.pickedButton.removeEventListener("click", buttons[index].checkCardFunction);
        elements.pickedButton.addEventListener("click", functions.leaveGameFunction);
      },
    },
    // 
    {
      name: "Відсортувати вчених за кількістю прожитих років",
      num: 2,
      arr: [],
      clueArr: [],
      checkCardFunction() {
        elements.scientistContainer.scrollIntoView({behavior: 'smooth'});
        const index = elements.buttons.indexOf(elements.pickedButton);
        const { arr, clueArr } = buttons[index];
        if (arr.length !== elements.scientistsArr.length) {
          return alert("Обери усіх вчених перед тим як перевірити чи правильно ти їх розташував!");
        }
        elements.pickedButton.textContent = "Вийти";
        const trueList = [];
        arr.forEach((item) => {
          const i = arr.indexOf(item);
          const years = scientists[i].dead - scientists[i].born;
          trueList.push(years);
        });
        trueList.sort();
          
          for (let i = 0; i < arr.length; i += 1) {
            const name = arr[i].firstChild.textContent;
            const neededObj = scientists.find((item) => {
              const objName = `${item.name} ${item.surname}`;
              return name === objName;
            })
            const neededAge = neededObj.dead - neededObj.born;
            const rightAnswer = trueList[i];
            neededAge === rightAnswer ? arr[i].classList.add("true") : arr[i].classList.add("false");
            const text = Array.from(document.querySelectorAll(`li > .scientist-year`));
            text.forEach((item) => {
              item.style.display = "block";
              item.classList.add("clue-text");
            })
            
          }
        clueArr.forEach((item) => {
          const parent = item.parentNode;
          const text = parent.firstChild.textContent;
          const answerPicked = item.textContent;
          const textIndex = scientists.findIndex((elem) => `${elem.name} ${elem.surname}` === text)
          const years = scientists[textIndex].dead - scientists[textIndex].born;
          const rightAnswer = trueList.findIndex((item) => item === years);
          item.classList.remove("clue-text", "clue-text-list");
          item.classList.add("true-clue-text");
          if (parent.classList.contains("false")) {
            item.innerHTML = `
            <span class="wrong-answer"> ${answerPicked} </span>    ${rightAnswer + 1}
            `
          }
          elements.scientistsArr.forEach((item) => {
            item.removeEventListener("click", functions.putCardOnListFunction);
            item.style.cursor = "auto";
          }) 
        });
        elements.pickedButton.removeEventListener("click", buttons[index].checkCardFunction);
        elements.pickedButton.addEventListener("click", functions.leaveGameFunction);
      },
    },
    // 
    {
      name: "Знайти вченого, який народився найпізніше",
      num: 3,
      arr: [],
      clueArr: [],
      checkCardFunction() {
        elements.scientistContainer.scrollIntoView({behavior: 'smooth'});
        const index = elements.buttons.indexOf(elements.pickedButton);
        const { arr, clueArr } = buttons[index];
        elements.pickedButton.textContent = "Вийти";
        const dates = [];
        const allDates = [];
        for (const scientist of elements.scientistsArr) {
          const neededElem = scientist.lastChild;
          const date = parseInt(neededElem.textContent)
          allDates.push(date);
        }
        arr.forEach((item) => {
          const answer = document.createElement("p");
          answer.classList.add("scientist-answer");
          const date = Number.parseInt(item.lastChild.textContent);
          const clue = document.createElement("p");
          clue.classList.add("clue-text");
          clueArr.push(clue);
          dates.push(date);
          item.append(clue);
        })

        let biggestDate = 0;
          for (const date of allDates) {
            date > biggestDate ? biggestDate = date : biggestDate = biggestDate;
        }

        for (let i = 0; i < arr.length; i += 1) {
          dates[i] === biggestDate ? arr[i].classList.add("true") : arr[i].classList.add("false");
          dates[i] === biggestDate ? clueArr[i].textContent = "Правильно!" : clueArr[i].textContent = "Неправильно!";
        }

        const neededScientist = elements.scientistsArr.find((scientist) => Number(scientist.dataset.born) === biggestDate)

        if (!neededScientist.classList.contains("true")) {
          neededScientist.classList.add("didnt-pick");
          const clue = document.createElement("p");
          clue.classList.add("clue-text");
          clueArr.push(clue);
          clue.textContent = "Правильна відповідь";
          neededScientist.append(clue);
        }

        elements.scientistsArr.forEach((item) => {
          item.removeEventListener("click", functions.pickCardFunction);
          item.style.cursor = "auto";
        });

        elements.pickedButton.removeEventListener("click", buttons[index].checkCardFunction);
        elements.pickedButton.addEventListener("click", functions.leaveGameFunction);

      }
    },
    // 
    {
      name: "Знайти рік народження Albert Einstein",
      num: 4,
      arr: [],
      clueArr: [],
      checkCardFunction() {

      },
    },
    // 
    {
      name: "Знайти вчених, прізвища яких починаються на літеру 'С'",
      num: 5,
      arr: [],
      clueArr: [],
      checkCardFunction() {
        elements.scientistContainer.scrollIntoView({behavior: 'smooth'});
        const index = elements.buttons.indexOf(elements.pickedButton);
        const { arr, clueArr } = buttons[index];
        elements.pickedButton.textContent = "Вийти";
        arr.forEach((item) => {
          const answer = document.createElement("p");
          answer.classList.add("scientist-answer");
          const scientistName = item.dataset.surname;
          const clue = document.createElement("p");
          clue.classList.add("clue-text");
          clueArr.push(clue);
          if (scientistName[0] === "C") {
            item.classList.add("true");
            clue.textContent = "Правильно!";
          } else {
            item.classList.add("false");
            clue.textContent = "Неправильно!";
          }
          item.append(clue);
        })
        elements.scientistsArr.forEach((item) => {
          item.style.cursor = "auto";
          const scientistName = item.dataset.surname;
          if (scientistName[0] === "C" && !item.classList.contains("true")) {
            item.classList.add("didnt-pick");
            const clue = document.createElement("p");
            clue.classList.add("clue-text");
            clueArr.push(clue);
            clue.textContent = "Забув вибрати";
            item.append(clue);
          }
          item.removeEventListener("click", functions.pickCardFunction);
        })
        elements.pickedButton.removeEventListener("click", buttons[index].checkCardFunction);
        elements.pickedButton.addEventListener("click", functions.leaveGameFunction);
      },
    },
    // 
    {
      name: "Видалити всіх вчених, ім’я яких починається на 'А'",
      num: 6,
      arr: [],
      clueArr: [],
      checkCardFunction() {
        elements.scientistContainer.scrollIntoView({behavior: 'smooth'});
        const index = elements.buttons.indexOf(elements.pickedButton);
        const { arr, clueArr } = buttons[index];
        elements.pickedButton.textContent = "Вийти";
        arr.forEach((item) => {
          const answer = document.createElement("p");
          answer.classList.add("scientist-answer");
          const scientistName = item.dataset.name;
          const clue = document.createElement("p");
          clue.classList.add("clue-text");
          clueArr.push(clue);
          if (scientistName[0] === "A") {
            item.classList.add("true");
            clue.textContent = "Правильно!";
          } else {
            item.classList.add("false");
            clue.textContent = "Неправильно!";
          }
          item.append(clue);
        })
        elements.scientistsArr.forEach((item) => {
          item.style.cursor = "auto";
          const scientistName = item.dataset.name;
          if (scientistName[0] === "A" && !item.classList.contains("true")) {
            item.classList.add("didnt-pick");
            const clue = document.createElement("p");
            clue.classList.add("clue-text");
            clueArr.push(clue);
            clue.textContent = "Забув вибрати";
            item.append(clue);
          }
          item.removeEventListener("click", functions.pickCardFunction);
        })
        elements.pickedButton.removeEventListener("click", buttons[index].checkCardFunction);
        elements.pickedButton.addEventListener("click", functions.leaveGameFunction);
      },
    },
    // 
    {
      name: "Знайти вченого, який прожив найдовше і вченого, який прожив найменше",
      num: 7,
      arr: [],
      clueArr: [],
      checkCardFunction() {
        elements.scientistContainer.scrollIntoView({behavior: 'smooth'});
        const index = elements.buttons.indexOf(elements.pickedButton);
        const { arr, clueArr } = buttons[index];
        elements.pickedButton.textContent = "Вийти";
        const trueList = [];
        elements.scientistsArr.forEach((scientist) => {
          const years = scientist.dataset.dead - scientist.dataset.born;
          trueList.push(years);
        });
        trueList.sort();
        
        const shortestLife = trueList[0];
        const longestLife = trueList[trueList.length - 1];

        arr.forEach((scientist) => {
          const clue = document.createElement("p");
          clue.classList.add("true-clue-text");
          clueArr.push(clue);

          const neededAge = scientist.dataset.dead - scientist.dataset.born;
          if (neededAge === longestLife) {
            scientist.classList.add("true");
            clue.textContent = "Найдовше";
          } else if (neededAge === shortestLife) {
            scientist.classList.add("true");
            clue.textContent = "Найменше";
          } else {
            scientist.classList.add("false");
            clue.textContent = "Неправильно!";
          }

          const text = Array.from(document.querySelectorAll(`li > .scientist-year`));
            text.forEach((item) => {
              item.style.display = "block";
              item.classList.add("clue-text");
            })
            
            scientist.append(clue);
        })

        elements.scientistsArr.forEach((scientist) => {
          if (!scientist.classList.contains("true")) {
            const lifeYears = scientist.dataset.dead - scientist.dataset.born;
            const clue = document.createElement("p");
              clue.classList.add("true-clue-text");
              clueArr.push(clue);
              scientist.prepend(clue)
            if (lifeYears === shortestLife) {
              scientist.classList.add("didnt-pick");
              clue.textContent = "Найменше";
            } else if (lifeYears === longestLife) {
              scientist.classList.add("didnt-pick");
              clue.textContent = "Найдовше";
            }
          }
        })
          
        elements.scientistsArr.forEach((item) => {
          item.removeEventListener("click", functions.pickCardFunction);
          item.style.cursor = "auto";
        })
          
        elements.pickedButton.removeEventListener("click", buttons[index].checkCardFunction);
        elements.pickedButton.addEventListener("click", functions.leaveGameFunction);
      }
    },
    // 
    {
      name: "Знайти вчених, в яких співпадають перші літери імені і прізвища",
      num: 8,
      arr: [],
      clueArr: [],
      checkCardFunction() {
        elements.scientistContainer.scrollIntoView({behavior: 'smooth'});
        const index = elements.buttons.indexOf(elements.pickedButton);
        const { arr, clueArr } = buttons[index];
        elements.pickedButton.textContent = "Вийти";
        arr.forEach((item) => {
          const answer = document.createElement("p");
          answer.classList.add("scientist-answer");
          const scientistName = item.dataset.name;
          const scientistSurname = item.dataset.surname;
          const clue = document.createElement("p");
          clue.classList.add("clue-text");
          clueArr.push(clue);
          if (scientistName[0] === scientistSurname[0]) {
            item.classList.add("true");
            clue.textContent = "Правильно!";
          } else {
            item.classList.add("false");
            clue.textContent = "Неправильно!";
          }
          item.append(clue);
        })
        elements.scientistsArr.forEach((item) => {
          item.style.cursor = "auto";
          const scientistName = item.dataset.name;
          const scientistSurname = item.dataset.surname;
          if (scientistName[0] === scientistSurname[0] && !item.classList.contains("true")) {
            item.classList.add("didnt-pick");
            const clue = document.createElement("p");
            clue.classList.add("clue-text");
            clueArr.push(clue);
            clue.textContent = "Забув вибрати";
            item.append(clue);
          }
          item.removeEventListener("click", functions.pickCardFunction);
        })
        elements.pickedButton.removeEventListener("click", buttons[index].checkCardFunction);
        elements.pickedButton.addEventListener("click", functions.leaveGameFunction);
      },
    }
];