
let rooms = [];

// Load the CSV file and turn each line into an object
fetch("museum.csv")
  .then(response => response.text())
  .then(text => {
    const lines = text.trim().split("\n");
    lines.shift(); // remove the header row

    rooms = lines.map(line => {
      const [name, visitors, minutes, rating] = line.split(",");
      return {
        name: name,
        visitors: Number(visitors),
        minutes: Number(minutes),
        rating: Number(rating)
      };
    });

    // Transformation: add a new value to each room
    rooms.forEach(room => {
      room.attention = room.visitors * room.minutes;
    });

    fillTable();
    makeRows();
    draw("visitors");
  });

// Make one row per room, once. Later we only move them.
function makeRows() {
  document.getElementById("chart").innerHTML = rooms.map((room, i) => `
    <div class="row" id="row-${i}">
      <span class="name">${room.name}</span>
      <span class="bar"></span>
      <span class="value"></span>
    </div>`).join("");
}

// Sort, then slide each row to its new position
function draw(measure) {
  const sorted = [...rooms].sort((a, b) => b[measure] - a[measure]);
  const biggest = sorted[0][measure];

  sorted.forEach((room, position) => {
    const row = document.getElementById("row-" + rooms.indexOf(room));
    row.style.top = position * 32 + "px";   // new place in the ranking
    row.querySelector(".bar").style.width = room[measure] / biggest * 300 + "px";
    row.querySelector(".value").textContent = room[measure];
  });

  document.getElementById("summary").textContent =
    measure === "visitors"
      ? "By visitors, The Clock Tower wins."
      : "By total attention (visitors × minutes), The Whispering Hall wins, even though it has the fewest visitors.";
}

// Fill the table
function fillTable() {
  document.getElementById("table").innerHTML = rooms.map(room => `
    <tr><td>${room.name}</td><td>${room.visitors}</td><td>${room.minutes}</td><td>${room.attention}</td><td>${room.rating}</td></tr>`).join("");
}
