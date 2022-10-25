import { singerDetails } from "./data.js";
let contents = document.getElementById("contents");
var xindex = 0;
let scorepoint = 0;
let score = document.getElementById("score");
let buttonStart = document.getElementById("btn");
//
const starGame = () => {
  moveButton();
  loadObjects(singerDetails);
};
const moveButton = () => {
  buttonStart.style.transform = "translateY(-200%)";
  buttonStart.innerHTML = "ENJOY!";
};
const loadObjects = (item) => {
  var timer = 0;
  item.forEach((el) => {
    setTimeout(() => {
      loadImages(el);
      loadSongs(el);
    }, timer);
    timer = timer + 6500;
  });
};
const loadImages = (image) => {
  contents.innerHTML = `
  <div class="image">
     <img  class="targt" src="${image.img[0]}" alt="#">
     <img  class="targt" src="${image.img[1]}" alt="#">
     <img  class="targt" src="${image.img[2]}" alt="#">
     <img  class="targt" src="${image.img[3]}" alt="#">
   </div>
  `;
};
const loadSongs = (song) => {
  const audio = new Audio(song.audio);
  audio.play();
  chechAnswer(song, audio);
  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, 6500);
};

const chechAnswer = (el, audio) => {
  let imageClick = document.querySelectorAll(".targt");
  imageClick.forEach((element, ids) => {
    element.addEventListener("click", () => {
      stopTimer(audio);
      if (ids === el.correct) {
        scorepoint++;
        element.style.border = "5px solid green";
        score.innerHTML = `SCORE : ${scorepoint}`;
      } else {
        element.style.border = "5px dashed red";
      }
      element.parentNode.style.pointerEvents="none"
      setTimeout(() => {
        element.parentNode.remove();
      }, 5000);
      
    });
  });
};
const stopTimer = (audio) => {
  audio.pause();
  audio.currentTime = 0;
};

buttonStart.addEventListener("click", starGame);
