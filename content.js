const data={
  "cat": [
        "dog",
        "Rat",
        "bat"],
  "Helo": [
        "hello",
        "Help",
        "Hell"],
  "heldp": [
        "help",
        "held",
        "hello"]
};

const input = document.querySelector('input');

input.insertAdjacentHTML('afterend',
            `<div class="contanier">
              <span class="tooltiptext"></span>
            </div> `)

const divClick=document.querySelector(".contanier");
const tooltiptext = document.querySelector(".tooltiptext");

input.addEventListener("mouseup", mouseClick);
input.addEventListener("input", mouseClick);

function getSelectedWord(selectedIndex, entireInput) {
  const leftArr = entireInput.slice(0, selectedIndex).split(" ");
  const left = leftArr[leftArr.length - 1];
  const rightArr = entireInput.slice(selectedIndex).split(" ");
  const right = rightArr[0];
  const word = left + right;
  return word;
}

function mouseClick(event) {
  const selectedIndex = input.selectionStart;
  const entireInput = event.target.value;
  const word = getSelectedWord(selectedIndex, entireInput);

  if (word) {
    const filteredWords = searchWord(word);
    const tooltiptext = renderList(filteredWords);

    tooltiptext.addEventListener("click", (e) => {
      
      const target = e.target.closest("li");
      if (target) {
 
        const entireInputArr = entireInput.split(" ");
        const selectedWordIndex = entireInputArr.findIndex(item => item === word);
        entireInputArr[selectedWordIndex] = target.textContent;
        event.target.value = entireInputArr.join(" ");
      }
    });
  }
}

// function searchWord(word) {
//   const words=["cat","dog","dooger","rat","bat","hello","Help","Hell","help","held","hello"];
//   const filteredWords = words.filter(
//     (item) => item[0] === word[0] && item[1] === word[1],
//   );
//   if(filteredWords)
//   {
//     divClick.classList.add('tooltip')
//   }
//   return filteredWords;
// }


function searchWord(word) {
  let filteredWords=[];
  for (let key in data) {
    if (word === key) {
      filteredWords = data[key].map(el=>el)
    }
  }
  if (filteredWords.length > 0)
    {
      divClick.classList.add('tooltip')
    }
  return filteredWords;
}
  

function renderList(filteredWords) {
  const template = `<ul class="list">
      ${filteredWords.map((item) =>`<li class="list_item">${item}</li>`).join('')}</ul>`;
  const element = document.createElement("div");
  element.innerHTML = template;

  tooltiptext.replaceChildren(element);
 
  return tooltiptext;
}

function mouseClick(event) {
  const selectedIndex = input.selectionStart;
  const entireInput = event.target.value;

  const word = getSelectedWord(selectedIndex, entireInput);
  
  if (word.length !==0) {
    const filteredWords = searchWord(word);
    const tooltiptext = renderList(filteredWords);

    tooltiptext.addEventListener("click", (e) => {
      divClick.classList.remove('tooltip')
      const target = e.target.closest("li");
      if (target) {

        const entireInputArr = entireInput.split(" ");
        const selectedWordIndex = entireInputArr.findIndex(
          (item) => item === word,
        );
        entireInputArr[selectedWordIndex] = target.textContent;

        event.target.value = entireInputArr.join(" ");
      }
    });
  } 
}

// ------------------------Displacement------------------------------//

window.onmousemove = moveElem;
window.onmouseup = stopMovingElem;
window.onload = init;

let selected = null; 
let oldMouseX, oldMouseY; 
let elemX, elemY;

function init() {
    document.querySelector('.contanier').onmousedown = function (evt) {
        dragInit(evt);
    };
}
  
function dragInit(evt) {

    selected = evt.target;
    elemX = selected.offsetLeft;
    elemY = selected.offsetTop;
  
    oldMouseX = evt.clientX;
    oldMouseY = evt.clientY;
}

function moveElem(e) {
    const newMouseX = e.clientX;
    const newMouseY = e.clientY;

    let dx = newMouseX 
    let dy = newMouseY

    if(oldMouseX !== undefined) {
         dx = newMouseX - oldMouseX;
         dy = newMouseY - oldMouseY;
     }
    
    if (selected !== null) {  
        changePosOfSelectedElement(dx, dy);
    }

    oldMouseX = newMouseX;
    oldMouseY = newMouseY;
}

function changePosOfSelectedElement(dx, dy) {

  elemX += dx;
  elemY += dy;
  
  selected.style.left = elemX + 'px';
  selected.style.top = elemY + 'px';
}

function stopMovingElem() {
    selected = null;
}











// Change Them

// const redThem=document.querySelector('.red-them');

// redThem.addEventListener('click',(event)=>{
//     event.preventDefault();
//     divClick.classList.remove('div_green')
//     divClick.classList.add('div_red')
// })

// const greenThem=document.querySelector('.green-them');
// greenThem.addEventListener('click',(event)=>{
//   event.preventDefault();
//   divClick.classList.remove('div_red');
//   divClick.classList.add('div_green')
// })



  // <div class="theme">
  //  <button id="switchMode" class="change-theme red-them"> </button>
  //  <button class="change-theme green-them"></button>
  //  </div>













// const ball=document.querySelector('.transform')

// ball.onmousedown = function(event) {

//   let shiftX = event.clientX - ball.getBoundingClientRect().left;
//   let shiftY = event.clientY - ball.getBoundingClientRect().top;

//   ball.style.position = 'absolute';
//   ball.style.zIndex = 1000;
//   document.body.append(ball);

//   moveAt(event.pageX, event.pageY);

//   // переносит мяч на координаты (pageX, pageY),
//   // дополнительно учитывая изначальный сдвиг относительно указателя мыши
//   function moveAt(pageX, pageY) {
//     ball.style.left = pageX - shiftX + 'px';
//     ball.style.top = pageY - shiftY + 'px';
//   }

//   function onMouseMove(event) {
//     moveAt(event.pageX, event.pageY);
//   }

//   // передвигаем мяч при событии mousemove
//   document.addEventListener('mousemove', onMouseMove);

//   // отпустить мяч, удалить ненужные обработчики
//   ball.onmouseup = function() {
//     document.removeEventListener('mousemove', onMouseMove);
//     ball.onmouseup = null;
//   };

// };

// ball.ondragstart = function() {
//   return false;
// };