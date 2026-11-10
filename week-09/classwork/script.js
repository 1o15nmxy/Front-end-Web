// ----- Data: each sign is an object, all signs live in an array -----
const signs = [
  { name: "Capricorn",   symbol: "♑", start: [12, 22], end: [1, 19],  trait: "Patient and determined. You climb slowly, but you always reach the top." },
  { name: "Aquarius",    symbol: "♒", start: [1, 20],  end: [2, 18],  trait: "Original and curious. You see the future before everyone else does." },
  { name: "Pisces",      symbol: "♓", start: [2, 19],  end: [3, 20],  trait: "Dreamy and kind. You feel the tides other people miss." },
  { name: "Aries",       symbol: "♈", start: [3, 21],  end: [4, 19],  trait: "Bold and quick. You start things others only think about." },
  { name: "Taurus",      symbol: "♉", start: [4, 20],  end: [5, 20],  trait: "Steady and loyal. You know how to enjoy the moment." },
  { name: "Gemini",      symbol: "♊", start: [5, 21],  end: [6, 20],  trait: "Clever and talkative. You always have two ideas at once." },
  { name: "Cancer",      symbol: "♋", start: [6, 21],  end: [7, 22],  trait: "Caring and protective. Home is wherever you make it." },
  { name: "Leo",         symbol: "♌", start: [7, 23],  end: [8, 22],  trait: "Warm and confident. You light up every room." },
  { name: "Virgo",       symbol: "♍", start: [8, 23],  end: [9, 22],  trait: "Thoughtful and precise. You notice the details that matter." },
  { name: "Libra",       symbol: "♎", start: [9, 23],  end: [10, 22], trait: "Fair and graceful. You bring balance wherever you go." },
  { name: "Scorpio",     symbol: "♏", start: [10, 23], end: [11, 21], trait: "Intense and loyal. Still waters run deep." },
  { name: "Sagittarius", symbol: "♐", start: [11, 22], end: [12, 21], trait: "Adventurous and honest. The horizon is always calling you." }
];

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// ----- Elements -----
const form        = document.getElementById("birthday-form");
const input       = document.getElementById("birthday");
const discoverBtn = document.getElementById("discover");
const hint        = document.getElementById("hint");

const result      = document.getElementById("result");
const symbolEl    = document.getElementById("symbol");
const nameEl      = document.getElementById("sign-name");
const datesEl     = document.getElementById("sign-dates");
const messageEl   = document.getElementById("message");
const moreBtn     = document.getElementById("more");
const traitEl     = document.getElementById("trait");

const logSection  = document.getElementById("log-section");
const log         = document.getElementById("log");
const clearBtn    = document.getElementById("clear");

// ----- State: what the page remembers while someone uses it -----
let currentSign = null;
let traitShown  = false;
let visited     = []; // names of signs already added to the log

// ----- Helpers -----
function findSign(month, day) {
  // Every sign spans exactly two months, so this check covers all of them
  return signs.find(function (s) {
    return (month === s.start[0] && day >= s.start[1]) ||
           (month === s.end[0]   && day <= s.end[1]);
  });
}

function formatRange(sign) {
  return `${monthNames[sign.start[0] - 1]} ${sign.start[1]} – ` +
         `${monthNames[sign.end[0] - 1]} ${sign.end[1]}`;
}

function showHint(text, isError) {
  hint.textContent = text;
  hint.classList.toggle("error", isError);
}

// Fill the result card and play the reveal animation
function showSign(sign, message, isBirthday) {
  currentSign = sign;

  symbolEl.textContent  = sign.symbol;
  nameEl.textContent    = sign.name;
  datesEl.textContent   = formatRange(sign);
  messageEl.textContent = message;

  // Reset the "Read the stars" toggle for the new sign
  traitShown = false;
  traitEl.hidden = true;
  traitEl.textContent = sign.trait;
  moreBtn.textContent = "Read the stars";
  moreBtn.setAttribute("aria-expanded", "false");

  result.classList.toggle("birthday", isBirthday);

  // Restart the animation: hide, then reveal on the next frame
  result.hidden = false;
  result.classList.remove("revealed");
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      result.classList.add("revealed");
    });
  });

  highlightLog(sign.name);
}

// Add a sign to the "visited" list (only once per sign)
function addToLog(sign) {
  if (visited.includes(sign.name)) {
    return;
  }
  visited.push(sign.name);

  const item = document.createElement("li");
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = `${sign.symbol} ${sign.name}`;
  button.dataset.sign = sign.name;

  // Clicking an entry brings that constellation back
  button.addEventListener("click", function () {
    showSign(sign, "You returned to this part of the sky.", false);
    showHint(`Revisiting ${sign.name}.`, false);
  });

  item.appendChild(button);
  log.appendChild(item);
  logSection.hidden = false;
}

function highlightLog(name) {
  log.querySelectorAll("button").forEach(function (b) {
    b.classList.toggle("current", b.dataset.sign === name);
  });
}

// ----- Interaction 1: typing/choosing a date enables the button -----
input.addEventListener("input", function () {
  const hasDate = input.value !== "";
  discoverBtn.disabled = !hasDate;
  showHint(hasDate ? "Ready when you are." : "Choose a date to begin.", false);
});

// ----- Interaction 2: submitting the form finds the constellation -----
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const value = input.value;

  if (value === "") {
    showHint("Please enter your birthday first!", true);
    return;
  }

  // Split "YYYY-MM-DD" ourselves to avoid time-zone surprises
  const parts = value.split("-").map(Number);
  const year = parts[0], month = parts[1], day = parts[2];

  const today  = new Date();
  const chosen = new Date(year, month - 1, day);

  // Unexpected answer: a birthday in the future
  if (chosen > today) {
    showHint("That day hasn't happened yet. The stars can't read the future… yet.", true);
    return;
  }

  const sign = findSign(month, day);
  const isBirthday = today.getMonth() + 1 === month && today.getDate() === day;

  let message;
  if (isBirthday) {
    message = `Happy birthday! The ${sign.name} stars are shining just for you tonight.`;
  } else {
    message = `Your constellation is ${sign.name}!`;
  }

  showSign(sign, message, isBirthday);
  addToLog(sign);

  showHint("Try another date, or press “Read the stars”.", false);
  discoverBtn.textContent = "Discover again";
});

// ----- Interaction 3: toggle the hidden reading (same button, two states) -----
moreBtn.addEventListener("click", function () {
  traitShown = !traitShown;
  traitEl.hidden = !traitShown;
  moreBtn.textContent = traitShown ? "Hide the reading" : "Read the stars";
  moreBtn.setAttribute("aria-expanded", String(traitShown));
});

// ----- Interaction 4: clear the history list (removing elements) -----
clearBtn.addEventListener("click", function () {
  log.innerHTML = "";
  visited = [];
  logSection.hidden = true;
  showHint("The sky is clear. Pick a new date to start again.", false);
});
