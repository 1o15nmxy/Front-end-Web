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
// "wiki" lists the Wikipedia article(s) to try, in order. If a stone has
// no "wiki", its name is used (e.g. "Garnet" -> the "Garnet" article).
const birthstones = [
  { month: "January",   name: "Garnet",     shape: "cut",   colors: ["#e0566b", "#a3182f", "#5c0716"], meaning: "Friendship, trust and steady love." },
  { month: "February",  name: "Amethyst",   shape: "cut",   colors: ["#c79bf2", "#8a4fc9", "#4b2178"], meaning: "Calm, clarity and inner peace." },
  { month: "March",     name: "Aquamarine", shape: "cut",   colors: ["#d4f7f7", "#6fd0d8", "#2f8c99"], meaning: "Courage and calm seas.", also: "Bloodstone", wiki: ["Aquamarine (gem)", "Beryl"] },
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


// One entry per moon phase, in order from new moon round to the next
const moonPhases = [
  { name: "New Moon",        meaning: "A fresh start. You arrived under a dark sky full of possibility." },
  { name: "Waxing Crescent", meaning: "Hopeful and growing. You arrived just as the light was gathering." },
  { name: "First Quarter",   meaning: "Brave and decisive. You arrived at the moon's turning point." },
  { name: "Waxing Gibbous",  meaning: "Always improving. You polish things until they glow." },
  { name: "Full Moon",       meaning: "Bright and open-hearted. You arrived when the sky was at its fullest." },
  { name: "Waning Gibbous",  meaning: "Generous and wise. You love to share what you know." },
  { name: "Last Quarter",    meaning: "Thoughtful and honest. You know when it's time to let go." },
  { name: "Waning Crescent", meaning: "Quiet and dreamy. You arrived as the sky rested before a new cycle." }
];

const longMonths = birthstones.map(function (s) { return s.month; });


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

const moonEl         = document.getElementById("moon");
const moonNameEl     = document.getElementById("moon-name");
const moonLightEl    = document.getElementById("moon-light");
const moonMeaningEl  = document.getElementById("moon-meaning");

const gemEl          = document.getElementById("gem");
const stoneNameEl    = document.getElementById("stone-name");
const stoneMonthEl   = document.getElementById("stone-month");
const stoneMeaningEl = document.getElementById("stone-meaning");
const stoneAltEl     = document.getElementById("stone-alt");

const wikiStatusEl   = document.getElementById("wiki-status");
const wikiBodyEl     = document.getElementById("wiki-body");
const wikiPhotoEl    = document.getElementById("wiki-photo");
const wikiImgEl      = document.getElementById("wiki-img");
const wikiTitleEl    = document.getElementById("wiki-title");
const wikiTextEl     = document.getElementById("wiki-text");
const wikiLinkEl     = document.getElementById("wiki-link");

const apodStatusEl   = document.getElementById("apod-status");
const apodBodyEl     = document.getElementById("apod-body");
const apodDateEl     = document.getElementById("apod-date");
const apodNoteEl     = document.getElementById("apod-note");
const apodPhotoEl    = document.getElementById("apod-photo");
const apodImgEl      = document.getElementById("apod-img");
const apodTitleEl    = document.getElementById("apod-title");
const apodTextEl     = document.getElementById("apod-text");
const apodCreditEl   = document.getElementById("apod-credit");
const apodLinkEl     = document.getElementById("apod-link");

const twinsStatusEl  = document.getElementById("twins-status");
const twinsListEl    = document.getElementById("twins");
const twinsCreditEl  = document.getElementById("twins-credit");

const skyEl          = document.getElementById("sky");


// =====================================================================
// State: what the page remembers while someone uses it
// =====================================================================

let flipped = false;       // is the flashcard showing its back?
let pastBirthdays = [];    // birthdays already read, as "YYYY-MM-DD" strings
let wikiCache = {};        // Wikipedia answers we already have, by stone name
let apodCache = {};        // NASA answers we already have, by date
let twinsCache = {};       // "On this day" answers we already have, by "MM/DD"
let readingCount = 0;      // counts readings so a slow, old answer can't overwrite a newer one


// =====================================================================
// Small helpers
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

function pad(n) {
  return String(n).padStart(2, "0");
}

function toISO(year, month, day) {
  return `${year}-${pad(month)}-${pad(day)}`;
}

function formatLong(iso) {
  const d = parseDate(iso);
  return `${longMonths[d.month - 1]} ${d.day}, ${d.year}`;
}

function isLeapYear(y) {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

// Cut long text at a word boundary
function shorten(text, max) {
  if (text.length <= max) {
    return text;
  }
  return text.slice(0, text.lastIndexOf(" ", max)) + "…";
}

function showHint(element, text, isError) {
  element.textContent = text;
  element.classList.toggle("error", isError);
}

function setStatus(element, text, isError) {
  element.hidden = false;
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


// =====================================================================
// Background: a sky full of still stars
// =====================================================================

function makeStars(count) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement("span");
    const size = Math.random() * 2.2 + 0.6;
    star.className = "star";
    star.style.width   = size + "px";
    star.style.height  = size + "px";
    star.style.left    = Math.random() * 100 + "%";
    star.style.top     = Math.random() * 100 + "%";
    star.style.opacity = (Math.random() * 0.7 + 0.3).toFixed(2);
    skyEl.appendChild(star);
  }
}


// =====================================================================
// Moon phase (pure math, no internet needed)
// =====================================================================

// A known new moon: January 6, 2000 at 18:14 UTC. The moon repeats its
// phases every 29.53 days, so we count how far into a cycle a date is.
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);
const LUNAR_CYCLE    = 29.530588853;

// Returns 0 (new) → 0.5 (full) → back toward 1 (new again)
function moonFraction(date) {
  const noon = Date.UTC(date.year, date.month - 1, date.day, 12);
  const days = (noon - KNOWN_NEW_MOON) / 86400000;
  let age = days % LUNAR_CYCLE;
  if (age < 0) {
    age += LUNAR_CYCLE;
  }
  return age / LUNAR_CYCLE;
}

// Draw the moon with the right amount lit up (as seen from the north)
function drawMoon(fraction) {
  const r = 50, cx = 60, cy = 60;
  const k = Math.cos(2 * Math.PI * fraction);    // 1 at new moon, -1 at full
  const rx = Math.abs(k) * r;                     // how wide the shadow edge curves
  const waxing = fraction < 0.5;                  // waxing = lit on the right

  const outerSweep = waxing ? 1 : 0;
  const innerSweep = waxing ? (k > 0 ? 0 : 1) : (k > 0 ? 1 : 0);

  const litPath =
    `M ${cx} ${cy - r} ` +
    `A ${r} ${r} 0 0 ${outerSweep} ${cx} ${cy + r} ` +
    `A ${rx} ${r} 0 0 ${innerSweep} ${cx} ${cy - r} Z`;

  return `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="moon-glow" cx="40%" cy="38%" r="70%">
          <stop offset="0%" stop-color="#fffbe8"/>
          <stop offset="100%" stop-color="#f1dc9c"/>
        </radialGradient>
      </defs>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#2a2a55"/>
      <path d="${litPath}" fill="url(#moon-glow)"/>
      <circle cx="44" cy="44" r="8"  fill="#000" opacity="0.07"/>
      <circle cx="74" cy="70" r="11" fill="#000" opacity="0.07"/>
      <circle cx="52" cy="80" r="5"  fill="#000" opacity="0.07"/>
      <circle cx="78" cy="40" r="4"  fill="#000" opacity="0.07"/>
    </svg>`;
}

function showMoon(date) {
  const fraction = moonFraction(date);
  const phase = moonPhases[Math.round(fraction * 8) % 8];
  const litPercent = Math.round((1 - Math.cos(2 * Math.PI * fraction)) / 2 * 100);

  moonEl.innerHTML = drawMoon(fraction);
  moonEl.setAttribute("aria-label", `The moon as a ${phase.name.toLowerCase()}`);
  moonNameEl.textContent    = phase.name;
  moonLightEl.textContent   = `${litPercent}% lit on the night you were born`;
  moonMeaningEl.textContent = phase.meaning;
}


// =====================================================================
// Wikipedia: birthstone article
// =====================================================================

// Wikipedia's REST API gives a short summary of any article as JSON:
//   https://en.wikipedia.org/api/rest_v1/page/summary/<Article_title>
// It allows requests from any website, so a plain fetch() works.
const WIKI_API = "https://en.wikipedia.org/api/rest_v1/page/summary/";

// Ask Wikipedia about one article title. Returns the JSON, or null if
// that title doesn't lead to a normal article.
async function fetchSummary(title) {
  const url = WIKI_API + encodeURIComponent(title.replace(/ /g, "_"));
  const response = await fetch(url);

  if (!response.ok) {             // e.g. 404 = no article with that name
    return null;
  }

  const data = await response.json();

  // A "disambiguation" page is a list of meanings, not the gem article
  if (data.type !== "standard" || !data.extract) {
    return null;
  }
  return data;
}

// Try each possible title for a stone until one works
async function getStoneInfo(stone) {
  if (wikiCache[stone.name]) {
    return wikiCache[stone.name];          // already asked: reuse it
  }

  const titles = stone.wiki || [stone.name];
  for (const title of titles) {
    const data = await fetchSummary(title);
    if (data) {
      wikiCache[stone.name] = data;
      return data;
    }
  }
  return null;
}

// Show the loading state, ask Wikipedia, then fill in the answer
async function loadWikipedia(stone, thisReading) {
  wikiBodyEl.hidden = true;
  setStatus(wikiStatusEl, `Asking Wikipedia about ${stone.name}…`, false);

  let data = null;
  try {
    data = await getStoneInfo(stone);
  } catch (error) {
    console.log("Wikipedia request failed:", error);
  }

  // The visitor may have opened another reading while we waited
  if (thisReading !== readingCount) {
    return;
  }

  if (!data) {
    setStatus(wikiStatusEl,
      "Wikipedia couldn't be reached right now. Check your connection and try again.", true);
    return;
  }

  wikiTitleEl.textContent = data.title;
  wikiTextEl.textContent  = data.extract;
  wikiLinkEl.href         = data.content_urls.desktop.page;

  // Not every article has a picture
  if (data.thumbnail) {
    wikiImgEl.src = data.thumbnail.source;
    wikiImgEl.alt = `Photo of ${stone.name.toLowerCase()} from Wikipedia`;
    wikiPhotoEl.hidden = false;
  } else {
    wikiImgEl.removeAttribute("src");
    wikiPhotoEl.hidden = true;
  }

  wikiStatusEl.hidden = true;
  wikiBodyEl.hidden = false;
}


// =====================================================================
// NASA: Astronomy Picture of the Day (APOD)
// =====================================================================

// NASA posts one space picture every day, going back to June 16, 1995.
//   https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=YYYY-MM-DD
// "DEMO_KEY" works without signing up but only allows a few requests an
// hour. Get your own free key in a minute at https://api.nasa.gov and
// paste it here to lift that limit.
const NASA_API   = "https://api.nasa.gov/planetary/apod";
const NASA_KEY   = "DEMO_KEY";
const APOD_START = "1995-06-16";

// The birthday's date in a given year (Feb 29 becomes Feb 28 in other years)
function birthdayInYear(date, year) {
  const day = (date.month === 2 && date.day === 29 && !isLeapYear(year)) ? 28 : date.day;
  return toISO(year, date.month, day);
}

// Which dates to ask NASA for, best first
function apodDates(date) {
  const birth = toISO(date.year, date.month, date.day);
  if (birth >= APOD_START) {
    return [birth];                        // the actual day they were born
  }

  // Born before NASA started: use their most recent birthday instead
  const today = new Date();
  const todayIso = toISO(today.getFullYear(), today.getMonth() + 1, today.getDate());
  let year = today.getFullYear();
  if (birthdayInYear(date, year) > todayIso) {
    year -= 1;
  }
  // (and the year before, in case today's picture isn't posted yet)
  return [birthdayInYear(date, year), birthdayInYear(date, year - 1)];
}

async function fetchApod(iso) {
  if (apodCache[iso]) {
    return apodCache[iso];
  }
  const url = `${NASA_API}?api_key=${NASA_KEY}&date=${iso}&thumbs=true`;
  const response = await fetch(url);

  if (response.status === 429) {
    throw new Error("busy");               // too many requests on the demo key
  }
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  apodCache[iso] = data;
  return data;
}

async function loadApod(date, thisReading) {
  apodBodyEl.hidden = true;
  setStatus(apodStatusEl, "Asking NASA what the sky looked like…", false);

  const dates = apodDates(date);
  let data = null;
  let busy = false;

  try {
    for (const iso of dates) {
      data = await fetchApod(iso);
      if (data) {
        break;
      }
    }
  } catch (error) {
    busy = error.message === "busy";
    console.log("NASA request failed:", error);
  }

  if (thisReading !== readingCount) {
    return;
  }

  if (!data) {
    setStatus(apodStatusEl, busy
      ? "NASA's free demo key is busy right now. Try again in a little while."
      : "NASA couldn't be reached right now. Check your connection and try again.", true);
    return;
  }

  // NASA's own page for that day looks like apod.nasa.gov/apod/ap010314.html
  const pageUrl = `https://apod.nasa.gov/apod/ap${data.date.slice(2).replace(/-/g, "")}.html`;

  apodDateEl.textContent = formatLong(data.date);
  if (dates[0] !== toISO(date.year, date.month, date.day)) {
    apodNoteEl.textContent =
      `NASA's daily pictures start in 1995, so here's the one from your birthday in ${data.date.slice(0, 4)}.`;
    apodNoteEl.hidden = false;
  } else {
    apodNoteEl.hidden = true;
  }

  // Most days are photos; some are videos (we show their preview picture)
  const picture = data.media_type === "image" ? data.url : data.thumbnail_url;
  if (picture) {
    apodImgEl.src = picture;
    apodImgEl.alt = data.title;
    apodPhotoEl.href = pageUrl;
    apodPhotoEl.hidden = false;
  } else {
    apodImgEl.removeAttribute("src");
    apodPhotoEl.hidden = true;
  }

  apodTitleEl.textContent  = data.title;
  apodTextEl.textContent   = shorten(data.explanation || "", 320);
  apodCreditEl.textContent = data.copyright ? `Image: ${data.copyright.trim()} · ` : "";
  apodLinkEl.href = pageUrl;

  apodStatusEl.hidden = true;
  apodBodyEl.hidden = false;
}


// =====================================================================
// Wikipedia: famous people born on the same day
// =====================================================================

//   https://en.wikipedia.org/api/rest_v1/feed/onthisday/births/MM/DD
const BIRTHS_API = "https://en.wikipedia.org/api/rest_v1/feed/onthisday/births/";

function yearsApart(theirYear, yourYear) {
  const gap = theirYear - yourYear;
  if (gap === 0) return "Same year as you! 🎉";
  const n = Math.abs(gap);
  const unit = n === 1 ? "year" : "years";
  return gap < 0 ? `${n} ${unit} before you` : `${n} ${unit} after you`;
}

async function loadTwins(date, thisReading) {
  twinsListEl.hidden = true;
  twinsCreditEl.hidden = true;
  setStatus(twinsStatusEl, "Looking up who else was born on your day…", false);

  const key = `${pad(date.month)}/${pad(date.day)}`;
  let births = twinsCache[key];

  try {
    if (!births) {
      const response = await fetch(BIRTHS_API + key);
      if (response.ok) {
        const data = await response.json();
        births = data.births || [];
        twinsCache[key] = births;
      }
    }
  } catch (error) {
    console.log("Wikipedia 'On this day' request failed:", error);
  }

  if (thisReading !== readingCount) {
    return;
  }

  if (!births || births.length === 0) {
    setStatus(twinsStatusEl,
      "Couldn't find your birthday twins right now. Check your connection and try again.", true);
    return;
  }

  // The four people born closest to the visitor's own birth year
  const picks = births
    .filter(function (b) { return typeof b.year === "number" && b.pages && b.pages.length; })
    .sort(function (a, b) { return Math.abs(a.year - date.year) - Math.abs(b.year - date.year); })
    .slice(0, 4);

  twinsListEl.innerHTML = "";

  picks.forEach(function (person) {
    const page = person.pages[0];
    // The text looks like "Jane Doe, American astronaut"
    const comma = person.text.indexOf(",");
    const name  = comma > 0 ? person.text.slice(0, comma) : person.text;
    const about = comma > 0 ? person.text.slice(comma + 1).trim() : (page.description || "");

    const item = document.createElement("li");
    const link = document.createElement("a");
    link.className = "twin";
    link.href = page.content_urls ? page.content_urls.desktop.page : "#";
    link.target = "_blank";
    link.rel = "noopener";

    let photo;
    if (page.thumbnail) {
      photo = document.createElement("img");
      photo.src = page.thumbnail.source;
      photo.alt = "";
    } else {
      photo = document.createElement("span");
      photo.textContent = "★";
    }
    photo.className = "twin-photo";

    const words = document.createElement("span");
    const nameEl = document.createElement("span");
    nameEl.className = "twin-name";
    nameEl.textContent = `${name} (${person.year})`;
    const aboutEl = document.createElement("span");
    aboutEl.className = "twin-about";
    aboutEl.textContent = about;
    const yearEl = document.createElement("span");
    yearEl.className = "twin-year";
    yearEl.textContent = yearsApart(person.year, date.year);

    words.append(nameEl, aboutEl, yearEl);
    link.append(photo, words);
    item.appendChild(link);
    twinsListEl.appendChild(item);
  });

  twinsStatusEl.hidden = true;
  twinsListEl.hidden = false;
  twinsCreditEl.hidden = false;
}


// =====================================================================
// Draw the gem as an SVG picture in the stone's colors
// =====================================================================

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
  const thisReading = ++readingCount;

  const date  = parseDate(value);
  const sign  = findSign(date.month, date.day);
  const stone = birthstones[date.month - 1];

  const today = new Date();
  const isBirthday = today.getMonth() + 1 === date.month && today.getDate() === date.day;

  // Heading
  bornOnEl.textContent = `Born ${stone.month} ${date.day}, ${date.year}`;
  readingTitle.textContent = isBirthday ? "Happy birthday! 🎉" : "Your birthday reading";

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

  // Moon
  showMoon(date);

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

  // Ask the internet for the rest (these all happen in the background, together)
  loadWikipedia(stone, thisReading);
  loadApod(date, thisReading);
  loadTwins(date, thisReading);

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


// =====================================================================
// Start-up: fill the sky
// =====================================================================

makeStars(140);

