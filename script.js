import { singerDetails } from "./data.js";
let contents = document.getElementById("contents");
let score = document.getElementById("score");
let buttonStart = document.getElementById("btn");
let currentNumber = 0;
let scorepoint = 0;
var timer;
//
const start = () => {
  buttonStart.style.transform = "translateY(-800%)";
  buttonStart.innerHTML = "ENJOY!";
  if (currentNumber < singerDetails.length) {
    let item = singerDetails[currentNumber];
    // item.img.sort( () => Math.random()- .5 );randomize later
    // console.log(item);
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
    createProgressbar("progressbar3", "8s");
    timer = setTimeout(() => {
      render(audio);
    }, 8000);
  } else {
    // console.log("finished");
    window.location.relaod();
  }
};
//
const clickImage = (item, audio) => {
  let imagesTarget = document.querySelectorAll(".targt");
  // console.log(imagesTarget);
  imagesTarget.forEach((el, i) => {
    el.addEventListener("click", () => {
      // console.log("clicked");
      render(audio);
      if (i === item.correct) {
        scorepoint += 1;
        score.innerHTML = `SCORE : ${scorepoint}`;
      }
      // console.log(singerDetails);
    });
  });
};
//
const createProgressbar = (id, duration, callback) => {
  // We select the div that we want to turn into a progressbar
  var progressbar = document.getElementById(id);
  progressbar.setAttribute("class", "progressbar");

  // We create the div that changes width to show progress
  var progressbarinner = document.createElement("div");
  progressbarinner.setAttribute("class", "inner");
  progressbarinner.setAttribute("id", "inner");

  // Now we set the animation parameters
  progressbarinner.style.animationDuration = duration;

  // Eventually couple a callback
  if (typeof callback === "function") {
    progressbarinner.addEventListener("animationend", callback);
  }

  // Append the progressbar to the main progressbardiv
  progressbar.appendChild(progressbarinner);
  // When everything is set up we start the animation
  progressbarinner.style.animationPlayState = "running";
};
//
const render = (audio) => {
  const parent = document.getElementById("progressbar3");
  const child = document.getElementById("inner");
  parent.removeChild(child);
  clearTimeout(timer);
  audio.pause();
  currentNumber += 1;
  start();
};

buttonStart.addEventListener("click", start);
