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
  if (audio.current!==0){
    audio.pause()
    audio.currentTime=0;

  audio.play();
  document.querySelectorAll(".targt").forEach((el, i) => {
    el.addEventListener("click", () => {
      if (i === item.correct) {
        scorepoint += 1;
        score.innerHTML = `SCORE : ${scorepoint}`;
      }
      audio.pause();
      audio.currentTime = 0;
      currentNumber += 1;
      loadContent();
      console.log(singerDetails);
    });
  });
  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
    currentNumber += 1;
    loadContent();
  }, 6000);
}
};
buttonStart.addEventListener("click", loadContent);
