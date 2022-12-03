import { singerDetails } from "./data.js";
let contents = document.getElementById("contents");
let score = document.getElementById("score");
let buttonStart = document.getElementById("btn");
let currentNumber = 0;
let scorepoint = 0;
var timer;
//
const start = () => {
  buttonStart.style.transform = "translateY(-200%)";
  buttonStart.innerHTML = "ENJOY!";
  const item = singerDetails[currentNumber];
  console.log(item);
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
  clickImage(item, audio);
  timer = setTimeout(() => {
    render(audio);
  }, 6000);
};
const clickImage = (item, audio) => {
  let imagesTarget = document.querySelectorAll(".targt");
  console.log(imagesTarget);
  imagesTarget.forEach((el, i) => {
    el.addEventListener("click", () => {
      console.log("clicked");
      render(audio);
      if (i === item.correct) {
        scorepoint += 1;
        score.innerHTML = `SCORE : ${scorepoint}`;
      }

      console.log(singerDetails);
    });
  });
};
const render = (audio) => {
  clearTimeout(timer);
  audio.pause();
  currentNumber += 1;
  start();
};
buttonStart.addEventListener("click", start);
