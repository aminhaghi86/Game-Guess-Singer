import { singerDetails } from "./data.js";
let contents = document.getElementById("contents");
let score = document.getElementById("score");
let buttonStart = document.getElementById("btn");
let currentNumber = 0;
let scorepoint = 0;
var timer;
//

const form = document.getElementById("form");

form.onsubmit = (e) => {
  e.preventDefault();
  const inputEl = form.elements.username.value;
  if (inputEl !== "" && inputEl !== null) {
    const username = {
      username: inputEl,
      score: 0,
    };
    sessionStorage.setItem("username", JSON.stringify(username));
    document.querySelector(".first").style.transform = "translateY(-100%)";
  } else {
    console.log("please enter your name");
    setTimeout(() => {
      form.elements.username.style.backgroundColor = "pink";
      form.elements.username.placeholder = "Your Name";
    }, 100);
    setTimeout(() => {
      form.elements.username.style.backgroundColor = "white";
      form.elements.username.placeholder = "Please enter your name";
    }, 1000);
  }
};
//
const resetSessionStorage = () => {
  sessionStorage.removeItem("username");
};
//
const message = () => {
  contents.style.display = "none";
  document.getElementById("progressbar3").style.display = "none";
  const parentDiv = document.getElementById("parent");
  const resetBtn = document.createElement("button");
  resetBtn.innerHTML = "Play Again";
  parentDiv.append(resetBtn);
  resetBtn.onclick = () => {
    resetSessionStorage();
    window.location.reload();
  };
};
//
const start = () => {
  if (currentNumber === singerDetails.length) return message();
  const uservalue = JSON.parse(sessionStorage.getItem("username"));
  const userEl = document.getElementById("user");
  userEl.innerHTML = `USER:${uservalue.username}`;
  buttonStart.style.transform = "translateY(-800%)";
  buttonStart.innerHTML = "ENJOY!";

  let item = singerDetails[currentNumber];
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
  createProgressbar("progressbar3", "15s");
  timer = setTimeout(() => {
    render(audio);
  }, 15000);
};
//
const clickImage = (item, audio) => {
  let imagesTarget = document.querySelectorAll(".targt");
  // console.log(imagesTarget);
  imagesTarget.forEach((el, i) => {
    el.addEventListener("click", () => {
      // console.log("clicked");

      if (i === item.correct) {
        scorepoint += 1;
        const uservalue = JSON.parse(sessionStorage.getItem("username"));
        uservalue.score = scorepoint;
        sessionStorage.setItem(
          "username",
          JSON.stringify({
            username: uservalue.username,
            score: uservalue.score,
          })
        );
        score.innerHTML = `SCORE : ${scorepoint}`;
      }
      render(audio);
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
