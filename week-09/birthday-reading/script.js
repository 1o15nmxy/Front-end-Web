// =====================================================================
// Data: each sign and each stone is an object, collected in arrays
// =====================================================================

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

// One stone per month, in order. "colors" go from light to dark.
// "cut" stones are drawn faceted; "round" stones are drawn smooth.
// Want a real photo instead? Add  image: "images/garnet.jpg"  to a stone.
const birthstones = [
  { month: "January",   name: "Garnet",     shape: "cut",   colors: ["#e0566b", "#a3182f", "#5c0716"], meaning: "Friendship, trust and steady love." },
  { month: "February",  name: "Amethyst",   shape: "cut",   colors: ["#c79bf2", "#8a4fc9", "#4b2178"], meaning: "Calm, clarity and inner peace." },
  { month: "March",     name: "Aquamarine", shape: "cut",   colors: ["#d4f7f7", "#6fd0d8", "#2f8c99"], meaning: "Courage and calm seas.", also: "Bloodstone" },
  { month: "April",     name: "Diamond",    shape: "cut",   colors: ["#ffffff", "#dfe8f2", "#9fb3c8"], meaning: "Strength and everlasting love." },
  { month: "May",       name: "Emerald",    shape: "cut",   colors: ["#6ee0a0", "#1a9e5c", "#0a5530"], meaning: "Growth, renewal and wisdom." },
  { month: "June",      name: "Pearl",      shape: "round", colors: ["#ffffff", "#f3ede4", "#c9bfb0"], meaning: "Purity, and wisdom gained through experience.", also: "Alexandrite, Moonstone" },
  { month: "July",      name: "Ruby",       shape: "cut",   colors: ["#ff6b7d", "#d1102e", "#6e0414"], meaning: "Passion, energy and protection." },
  { month: "August",    name: "Peridot",    shape: "cut",   colors: ["#e2f58a", "#a3c93a", "#5c7a12"], meaning: "Light, warmth and good fortune.", also: "Spinel, Sardonyx" },
  { month: "September", name: "Sapphire",   shape: "cut",   colors: ["#7aa2ff", "#2346c9", "#0f1f6b"], meaning: "Loyalty, wisdom and truth." },
  { month: "October",   name: "Opal",       shape: "round", colors: ["#ffffff", "#ffd6f0", "#c8f5e4", "#b8c8ff", "#8fa3d9"], meaning: "Hope, creativity and imagination.", also: "Tourmaline" },
  { month: "November",  name: "Topaz",      shape: "cut",   colors: ["#ffd77a", "#f0a020", "#a35d05"], meaning: "Friendship and good health.", also: "Citrine" },
  { month: "December",  name: "Turquoise",  shape: "round", colors: ["#a8f2ea", "#3cbfb4", "#1d7a75"], meaning: "Good luck and success.", also: "Tanzanite, Zircon" }
];

const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


// =====================================================================
// Elements
// =====================================================================

// Page 1
const introScreen    = document.getElementById("intro");
const form           = document.getElementById("birthday-form");
const input          = document.getElementById("birthday");
const revealBtn      = document.getElementById("reveal");
const hint           = document.getElementById("hint");
const historySection = document.getElementById("history-section");
const historyList    = document.getElementById("history");
const clearBtn       = document.getElementById("clear");

// Page 2
const readingScreen  = document.getElementById("reading");
const backBtn        = document.getElementById("back");
const bornOnEl       = document.getElementById("born-on");
const readingTitle   = document.getElementById("reading-title");

const card           = document.getElementById("card");
const frontFace      = card.querySelector(".front");
const backFace       = card.querySelector(".back");
const symbolEl       = document.getElementById("symbol");
const signNameEl     = document.getElementById("sign-name");
const signDatesEl    = document.getElementById("sign-dates");
const messageEl      = document.getElementById("message");
const traitEl        = document.getElementById("trait");
const cardHint       = document.getElementById("card-hint");

const gemEl          = document.getElementById("gem");
const stoneNameEl    = document.getElementById("stone-name");
const stoneMonthEl   = document.getElementById("stone-month");
const stoneMeaningEl = document.getElementById("stone-meaning");
const stoneAltEl     = document.getElementById("stone-alt");


// =====================================================================
// State: what the page remembers while someone uses it
// =====================================================================

let flipped = false;   // is the flashcard showing its back?
let pastBirthdays = [];    // birthdays already read, as "YYYY-MM-DD" strings


// =====================================================================
// Helpers
// =====================================================================

function findSign(month, day) {
  // Every sign spans exactly two months, so this check covers all of them
  return signs.find(function (s) {
    return (month === s.start[0] && day >= s.start[1]) ||
           (month === s.end[0]   && day <= s.end[1]);
  });
}

function formatRange(sign) {
  return `${shortMonths[sign.start[0] - 1]} ${sign.start[1]} – ` +
         `${shortMonths[sign.end[0] - 1]} ${sign.end[1]}`;
}

// Split "YYYY-MM-DD" ourselves to avoid time-zone surprises
function parseDate(value) {
  const parts = value.split("-").map(Number);
  return { year: parts[0], month: parts[1], day: parts[2] };
}

function showHint(element, text, isError) {
  element.textContent = text;
  element.classList.toggle("error", isError);
}

// Swap which "page" is visible and play its entrance animation
function showScreen(screen) {
  introScreen.hidden   = screen !== introScreen;
  readingScreen.hidden = screen !== readingScreen;

  screen.classList.remove("enter");
  void screen.offsetWidth;          // lets the animation restart
  screen.classList.add("enter");

  window.scrollTo(0, 0);
}

// Turn the flashcard to one side or the other
function setFlipped(value) {
  flipped = value;
  card.classList.toggle("flipped", flipped);
  card.setAttribute("aria-pressed", String(flipped));
  card.setAttribute("aria-label", flipped
    ? "Your reading. Activate to flip back."
    : "Constellation card. Activate to reveal your message.");

  // Screen readers should only read the side that is facing up
  frontFace.setAttribute("aria-hidden", String(flipped));
  backFace.setAttribute("aria-hidden", String(!flipped));
}

// Draw the gem as an SVG picture in the stone's colors
function drawGem(stone) {
  const light = stone.colors[0];
  const mid   = stone.colors[1];
  const dark  = stone.colors[stone.colors.length - 1];

  if (stone.shape === "round") {
    // Smooth stone: a radial gradient through all of its colors
    const stops = stone.colors.map(function (c, i) {
      const offset = Math.round((i / (stone.colors.length - 1)) * 100);
      return `<stop offset="${offset}%" stop-color="${c}"/>`;
    }).join("");

    return `
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="gem-shine" cx="38%" cy="35%" r="70%">${stops}</radialGradient>
        </defs>
        <circle cx="60" cy="60" r="48" fill="url(#gem-shine)"/>
        <ellipse cx="44" cy="40" rx="14" ry="8" fill="#ffffff" opacity="0.7" transform="rotate(-30 44 40)"/>
      </svg>`;
  }

  // Faceted stone: a classic cut seen from the side
  return `
    <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="30,10 90,10 80,35 40,35" fill="${light}"/>
      <polygon points="5,35 30,10 40,35"        fill="${mid}"/>
      <polygon points="90,10 115,35 80,35"      fill="${dark}"/>
      <polygon points="5,35 40,35 60,95"        fill="${dark}"/>
      <polygon points="40,35 80,35 60,95"       fill="${mid}"/>
      <polygon points="80,35 115,35 60,95"      fill="${light}" opacity="0.85"/>
      <polygon points="38,14 52,14 46,28"       fill="#ffffff" opacity="0.6"/>
      <polyline points="5,35 115,35" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1" fill="none"/>
    </svg>`;
}


// =====================================================================
// Build page 2 from a birthday
// =====================================================================

function showReading(value) {
  const date  = parseDate(value);
  const sign  = findSign(date.month, date.day);
  const stone = birthstones[date.month - 1];

  const today = new Date();
  const isBirthday = today.getMonth() + 1 === date.month && today.getDate() === date.day;

  // Heading
  bornOnEl.textContent = `Born ${stone.month} ${date.day}, ${date.year}`;
  readingTitle.textContent = isBirthday ? "Happy birthday!" : "Your birthday reading";

  // Constellation card
  symbolEl.textContent    = sign.symbol;
  signNameEl.textContent  = sign.name;
  signDatesEl.textContent = formatRange(sign);
  traitEl.textContent     = sign.trait;

  if (isBirthday) {
    messageEl.textContent = `The ${sign.name} stars are shining just for you today.`;
  } else {
    messageEl.textContent = `Your constellation is ${sign.name}!`;
  }

  card.classList.toggle("birthday", isBirthday);
  setFlipped(false);                     // every reading starts face-up
  showHint(cardHint, "Tap the card to reveal your message.", false);

  // Birthstone
  if (stone.image) {
    gemEl.innerHTML = `<img src="${stone.image}" alt="">`;
  } else {
    gemEl.innerHTML = drawGem(stone);
  }
  gemEl.setAttribute("aria-label", `A ${stone.name.toLowerCase()} gemstone`);
  gemEl.style.setProperty("--glow", stone.colors[1]);

  stoneNameEl.textContent    = stone.name;
  stoneMonthEl.textContent   = `Birthstone of ${stone.month}`;
  stoneMeaningEl.textContent = stone.meaning;
  stoneAltEl.textContent     = stone.also ? `Also for ${stone.month}: ${stone.also}` : "";

  // Go to page 2, then let the gem sparkle in
  showScreen(readingScreen);
  gemEl.classList.remove("sparkle");
  void gemEl.offsetWidth;
  gemEl.classList.add("sparkle");

  readingTitle.focus();
}

// Add a birthday to the list on page 1 (only once each)
function addToHistory(value) {
  if (pastBirthdays.includes(value)) {
    return;
  }
  pastBirthdays.push(value);

  const date = parseDate(value);
  const sign = findSign(date.month, date.day);

  const item = document.createElement("li");
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = `${sign.symbol} ${shortMonths[date.month - 1]} ${date.day}, ${date.year}`;

  // Clicking an entry opens that reading again
  button.addEventListener("click", function () {
    input.value = value;
    revealBtn.disabled = false;
    showReading(value);
  });

  item.appendChild(button);
  historyList.appendChild(item);
  historySection.hidden = false;
}


// =====================================================================
// Events
// =====================================================================

// 1. Choosing a date enables the Reveal button
input.addEventListener("input", function () {
  const hasDate = input.value !== "";
  revealBtn.disabled = !hasDate;
  showHint(hint, hasDate ? "Ready when you are." : "Choose a date to begin.", false);
});

// 2. Submitting the form checks the date and opens page 2
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const value = input.value;

  if (value === "") {
    showHint(hint, "Please enter your birthday first!", true);
    return;
  }

  const date   = parseDate(value);
  const chosen = new Date(date.year, date.month - 1, date.day);

  // Unexpected answer: a birthday in the future
  if (chosen > new Date()) {
    showHint(hint, "That day hasn't happened yet. The stars can't read the future… yet.", true);
    return;
  }

  showReading(value);
  addToHistory(value);
});

// 3. Flip the flashcard (same action, two states)
card.addEventListener("click", function () {
  setFlipped(!flipped);

  if (flipped) {
    showHint(cardHint, "The stars have spoken. Tap again to flip back.", false);
  } else {
    showHint(cardHint, "Tap the card to reveal your message.", false);
  }
});

// Keyboard visitors can flip it too
card.addEventListener("keydown", function (event) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();   // stop Space from scrolling the page
    card.click();
  }
});

// 4. Back to page 1
backBtn.addEventListener("click", function () {
  showScreen(introScreen);
  showHint(hint, "Try another birthday, or open one you've read.", false);
  input.focus();
});

// 5. Clear the list (removing elements)
clearBtn.addEventListener("click", function () {
  historyList.innerHTML = "";
  pastBirthdays = [];
  historySection.hidden = true;
  showHint(hint, "The list is clear. Pick a new date to start again.", false);
});
