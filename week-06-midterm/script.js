// Return to the opening screen.
function showWelcome() {
    document.getElementById("app").style.display = "none";
    document.getElementById("welcome").style.display = "flex";
  }
  
  // Show the main website and open the selected page.
  function showApp(page) {
    document.getElementById("welcome").style.display = "none";
    const app = document.getElementById("app");
    app.style.display = "block";
    app.classList.remove("opening");
    void app.offsetWidth;
    app.classList.add("opening");
    showPage(page);
  }
  
  // Switch between the website's pages.
  function showPage(page) {
    document.querySelectorAll(".page").forEach(function(section) {
      section.classList.remove("active");
    });
  
    document.getElementById(page).classList.add("active");
  
    // Change the background and glow to match the selected page.
    const app = document.getElementById("app");
    app.className = app.className.replace(/\btheme-\S+/g, "").trim();
    app.classList.add("theme-" + page);
  
    document.querySelectorAll(".nav-links button").forEach(function(button) {
      button.classList.remove("active");
    });
  
    let activeButton = document.getElementById("nav-" + page);
    if (activeButton) {
      activeButton.classList.add("active");
    }
  }
  
  // Move the glow on the opening screen and inside the archive.
  const welcome = document.getElementById("welcome");
  const app = document.getElementById("app");
  
  function moveGlow(event) {
    const x = event.clientX;
    const y = event.clientY;
    const target = event.currentTarget;
  
    target.style.setProperty("--mouse-x", x + "px");
    target.style.setProperty("--mouse-y", y + "px");
  }
  
  welcome.addEventListener("mousemove", moveGlow);
  app.addEventListener("mousemove", moveGlow);
  