const times = document.querySelectorAll(".time");
const clock = document.querySelector(".clock");
const dotwContainerDom = document.querySelector(".dotw-container");
const alarmBtnDom = document.querySelector(".clock__btn");
const backDropDom = document.querySelector(".backdrop");

const dayOfTheWeek = "Sun Mon Tue Wed Thur Fri Sat".split(" ");

let alarmH, alarmM, alarmD, hour, minutes, seconds, day, dotw, alarmSet;

function daysOutPut() {
  const dayOutPut = dayOfTheWeek.map(
    (dotw) => `<span class="dotw">${dotw}</span>`
  );
  dotwContainerDom.insertAdjacentHTML("afterbegin", dayOutPut.join(""));
}
daysOutPut();

function now() {
  const now = new Date();

  hour = now.getHours().toString().padStart(2, 0);
  minutes = now.getMinutes().toString().padStart(2, 0);
  seconds = now.getSeconds().toString().padStart(2, 0);

  const nowTime = [hour, minutes, seconds];
  day = now.getDay();
  dotw = dayOfTheWeek[day];
  times.forEach((t, i) => (t.textContent = nowTime[i]));
  const daysDom = document.querySelectorAll(".dotw");
  daysDom.forEach((dd) => {
    dd.textContent === dotw && dd.classList.add("active");
  });
  alarmSet && checkAlarm();
}

setInterval(now, 1000);

alarmBtnDom.addEventListener("click", (e) => {
  backDropDom.classList.add("show");
  const div = document.createElement("div");
  const hArr = [];
  const minArr = [];
  for (let i = 1; i <= 24; i++) {
    hArr.push(i);
  }
  for (let i = 1; i <= 60; i++) {
    minArr.push(i);
  }
  const alarmDotw = [...dayOfTheWeek, "Every Day"];
  const hourOutput = hArr.map((h) => `<option>${h} h</option>`);
  const minOutput = minArr.map((min) => `<option>${min} min</option>`);
  const dotwOutput = alarmDotw.map((dotw) => `<option>${dotw}</option>`);

  div.classList.add("modal");
  const html = `<select class="alarm-time">
    ${hourOutput.join("")}
  </select>
  <select class="alarm-time">${minOutput.join("")}</select>
  <select class="alarm-time">${dotwOutput.join("")}</select>
  <button class="clock__btn alarm-btn">Set Alarm</button>
  `;
  div.innerHTML = html;
  clock.appendChild(div);
  const setAlarmBtn = document.querySelector(".alarm-btn");
  setAlarmBtn.addEventListener("click", setAlarm);
});

backDropDom.addEventListener("click", hideModal);

function hideModal() {
  const modal = document.querySelector(".modal");
  modal && modal.remove();
}

function setAlarm() {
  clearAlarmFunc();
  alarmSet = true;
  const alarmTime = document.querySelectorAll(".alarm-time");
  alarmH = alarmTime[0].value;
  alarmM = alarmTime[1].value;
  alarmD = alarmTime[2].value;
  alarmD = alarmD === "Every Day" ? dotw : alarmD;
  hideModal();
  alarmSetDom();
}

function alarmSetDom() {
  const p = document.createElement("p");
  p.classList.add("alarm-set");
  p.innerHTML = `alarm will go off at ${alarmH} ${alarmM} on "${alarmD}" <span class="clear-alarm">X</span>`;
  clock.prepend(p);
  const clearAlarm = document.querySelector(".clear-alarm");
  clearAlarm.addEventListener("click", (e) => {
    clearAlarmFunc();
  });
}

function clearAlarmFunc() {
  alarmSet = false;
  const existingAlarm = document.querySelector(".alarm-set");
  existingAlarm && existingAlarm.remove();
}

function checkAlarm() {
  console.log(alarmD);
  const [h] = alarmH.split(" ");
  const [min] = alarmM.split(" ");
  if (h === hour && minutes === min && alarmD === dotw) {
    console.log("Time is up.Go off alarm.");
  }
}
