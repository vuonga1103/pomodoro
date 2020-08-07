const countdownEl = document.querySelector("#countdown");
const startButton = document.querySelector("#start-button")

startButton.addEventListener("click", (evt) => {

  startButton.hidden = true;

  let startingMinutes = 25;
  let time = startingMinutes * 60;
  setCountdown = setInterval(countDown, 1000);

  function countDown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60; 
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes}: ${seconds}`;
    time--;
    
    if (time < 0){
      clearInterval(setCountdown);
      playMusicVideo();
    }
  }

  function playMusicVideo() {
    const songURLs = [
      "https://www.youtube.com/embed/4Z-P7qOFcDk?rel=0&start=137&autoplay=1",
      "https://www.youtube.com/embed/KybAvaM3b90?rel=0&start=8&autoplay=1",
      "https://www.youtube.com/embed/W5HIisdWzvY?rel=0&start=39&autoplay=1",
      "https://www.youtube.com/embed/-H2Bjyw6AS8?rel=0&start=93&autoplay=1"
    ]
    const randomIdx = Math.floor(Math.random() * songURLs.length);
    
    countdownEl.innerHTML = 
      `
        <iframe width="560" height="315" src=${songURLs[randomIdx]} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `

    startButton.hidden = false;
    startButton.innerText = "LETZ DO IT AGAIN!";
  }
})



