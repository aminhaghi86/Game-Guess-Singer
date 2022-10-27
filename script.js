import { singerDetails } from "./data.js";
  let contents = document.getElementById("contents");
let scorepoint = 0;
let score = document.getElementById("score");
let buttonStart = document.getElementById("btn");
let currentNumber = 0;
//
const loadContent = () => {
  buttonStart.style.transform = "translateY(-200%)";
  buttonStart.innerHTML = "ENJOY!";
  const item = singerDetails[currentNumber];
  contents.innerHTML = `
  <div class="image">
     <img class="targt" src="${item.img[0]}" alt="#">
     <img class="targt" src="${item.img[1]}" alt="#">
     <img class="targt" src="${item.img[2]}" alt="#">
     <img class="targt" src="${item.img[3]}" alt="#">
   </div>
  `;
  const audio = new Audio(item.audio);
  audio.play();
    document.querySelectorAll('.targt').forEach((el,i) => {
        el.addEventListener('click',()=>{
          if(i===item.correct){
            setTimeout(() => {
              score.style.color = 'green'
            }, 100);
            setTimeout(() => {
              score.style.color = 'black'
            }, 1000);
            scorepoint++;
            score.innerHTML = `SCORE : ${scorepoint}`
          }else {
            setTimeout(() => {
              score.style.color = 'red'
            }, 100);
            setTimeout(() => {
              score.style.color = 'black'
            }, 1000);
          }
          currentNumber+=1;
          audio.pause();
          audio.currentTime=0;
          loadContent()
        })
    });
    setTimeout(function() {
      currentNumber += 1;
      loadContent();
  }, 7500);
}
buttonStart.addEventListener("click", loadContent);
