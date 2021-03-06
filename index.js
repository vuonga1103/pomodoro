// Grabbing stable elements
const countdownEl = document.querySelector("#countdown");
const buttonsDiv = document.querySelector("#buttons");
const instructionParagraph = document.querySelector("#instruction");
const cancelButton = document.querySelector("#cancel");
const fiveMinBreakEl = document.querySelector(".take-break");
const appDescriptionEl = document.querySelector("#app-description");
const titleHeader= document.querySelector("title")

// Hide cancel button
cancelButton.hidden = true;

// Hide break span
fiveMinBreakEl.hidden = true;

// When one of the buttons in buttonsDiv is clicked, start the countdown timer
buttonsDiv.addEventListener("click", startCountDown);

// Function to start the countdown
function startCountDown(evt) {
  if (evt.target.classList.contains("set-time")) {
    // Hide the button div during countdown, show the cancel button and conndownEl
    buttonsDiv.hidden = true;
    appDescriptionEl.hidden = true;
    countdownEl.hidden=true;
    // Call the countDownOnTime function, which takes in a string of minute, and set the timer to that
    countDownOnTime(evt.target.id);
  }
}

function countDownOnTime(strTime) {
  // Parse the string of time into float
  let startingMinutes = parseFloat(strTime);

  // Calculate total time in seconds, the second display value, and the minute display value
  let time = startingMinutes * 60;

  // Setting countdown to run every 1000 ms (1 sec)
  let setCountdown = setInterval(function () {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    // Add zero in front of the second if single digit
    seconds = seconds < 10 ? "0" + seconds : seconds;
    countdownEl.innerHTML = `${minutes}<span>:</span>${seconds}`;
    titleHeader.innerText=`Time left: ${minutes}:${seconds}`
    time--;
    if (countdownEl.hidden===true) {
      countdownEl.hidden=false
    }
    if (cancelButton.hidden === true) {
      cancelButton.hidden = false;
    }

    // If cancel buttotn is clicked, the clearInterval, hide cancel button, and unhide buttons Div
    cancelButton.addEventListener("click", (evt) => {
      // clear countdown element
      clearInterval(setCountdown);
      countdownEl.innerText = "";
      // hide the cancel button
      cancelButton.hidden = true;
      // unhide the buttonsDiv
      buttonsDiv.hidden = false;
      // hide the fiveMinBreakEl
      fiveMinBreakEl.hidden = true;
      appDescriptionEl.hidden = false;
      titleHeader.innerText="Time to Time";
    });

    // If the time reaches 0, then clear the interval and play the music video
    if (time < 0) {
      clearInterval(setCountdown);
      playMusicVideo();
    }
  }, 1000);
}

function playMusicVideo() {
  titleHeader.innerText="Time to Time"
  // Take a random video URL and display and autoplay the video
  const songURLs = [
    "https://www.youtube.com/embed/4Z-P7qOFcDk?rel=0&start=137&autoplay=1",
    "https://www.youtube.com/embed/KybAvaM3b90?rel=0&start=8&autoplay=1",
    "https://www.youtube.com/embed/W5HIisdWzvY?rel=0&start=39&autoplay=1",
    "https://www.youtube.com/embed/-H2Bjyw6AS8?rel=0&start=93&autoplay=1",
  ];
  const randomIdx = Math.floor(Math.random() * songURLs.length);
  countdownEl.innerHTML = `
      <iframe width="560" height="315" src=${songURLs[randomIdx]} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;

  // Show finished notification
  console.log(Notification.permission);
  if (Notification.permission === "granted") {
    showFinishedNotification();
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        showFinishedNotification();
      }
    });
  }
  // Show the buttonsDiv again so user could choose to restart timer
  buttonsDiv.hidden = false;
  instructionParagraph.innerText = "Focus Again:";
  cancelButton.hidden = true;
  fiveMinBreakEl.hidden = false;
  appDescriptionEl.hidden = true;
}

function showFinishedNotification() {
  const notification = new Notification("Congrats!", {
    body: "You finished your focus session!",
  });
}
