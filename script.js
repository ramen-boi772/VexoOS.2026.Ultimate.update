// Boot screen
window.onload = () => {
  setTimeout(() => {
    document.getElementById("bootScreen").style.display = "none";
  }, 2000);

  // Load saved theme
  let savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.className = savedTheme;
  }

  // Load saved wallpaper
  let savedWallpaper = localStorage.getItem("wallpaper");
  if (savedWallpaper) {
    document.getElementById("desktop").style.backgroundImage = `url(${savedWallpaper})`;
  }
};

// Theme toggle
function toggleTheme() {
  if (document.body.className === "light") {
    document.body.className = "dark";
  } else {
    document.body.className = "light";
  }
  localStorage.setItem("theme", document.body.className);
}

// Wallpaper upload
document.getElementById("wallpaperInput").addEventListener("change", function(e) {
  const reader = new FileReader();
  reader.onload = function(event) {
    document.getElementById("desktop").style.backgroundImage = `url(${event.target.result})`;
    localStorage.setItem("wallpaper", event.target.result);
  };
  reader.readAsDataURL(e.target.files[0]);
});

// Window controls
function openWindow() {
  document.getElementById("appWindow").style.display = "block";
}

function closeWindow() {
  document.getElementById("appWindow").style.display = "none";
}
