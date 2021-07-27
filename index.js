const { ipcRenderer } = require("electron");
const Timer = require("timer.js");

function startWork() {
  console.log("开始工作");
  let workTimer = new Timer({
    ontick: (ms) => {
      updateTime(ms);
    },
    onend: () => {
      notification();
    },
  });
  workTimer.start(5);
}
function updateTime(ms) {
  console.log(ms);
  let timerContainer = document.getElementsByClassName("test")[0];
  let s = (ms / 1000).toFixed(0);
  let ss = s % 60;
  let mm = (ss / 60).toFixed(0);
  timerContainer.innerText = `${mm.toString().padStart(2, 0)}:${ss
    .toString()
    .padStart(2, 0)}`;
}
async function notification() {
  let res = await ipcRenderer.invoke("work-notification");
  if (res === "rest") {
    setTimeout(() => {
      alert("休息");
    }, 5000);
  } else if (res === "work") {
    console.log("start work");
    startWork();
  }
}
startWork();
