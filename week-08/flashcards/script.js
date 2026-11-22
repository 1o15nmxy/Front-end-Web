// Grab every card on the page
const cards = document.querySelectorAll(".card");

// Click one card -> flip just that card
cards.forEach(function (card) {
    card.addEventListener("click", function () {
        card.classList.toggle("flipped");
    });
});

// Click the button -> flip ALL cards back down to the food side
document.getElementById("flip-all").addEventListener("click", function () {
    cards.forEach(function (card) {
        card.classList.remove("flipped");
    });
});
