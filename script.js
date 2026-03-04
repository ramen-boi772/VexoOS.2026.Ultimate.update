let zIndex = 1;

const desktop = document.getElementById("desktop");
const start = document.getElementById("start");
const notes = document.getElementById("notes");
const display = document.getElementById("display");

window.onload = () => {

  // Boot screen
  setTimeout(()=>{
    document.getElementById("boot").style.display="none";
  },2000);

  // Load saved theme
  if(localStorage.getItem("theme")){
    document.body.className = localStorage.getItem("theme");
  }

  // Load saved notes
  if(localStorage.getItem("notes")){
    notes.value = localStorage.getItem("notes");
  }
};

//////////////////////
// START MENU
//////////////////////

function toggleStart(){
  start.style.display =
    start.style.display==="block"?"none":"block";
}

//////////////////////
// WINDOW SYSTEM
//////////////////////

function openApp(id){
  const win = document.getElementById(id);
  win.style.display = "block";
  win.style.zIndex = ++zIndex;
}

function closeApp(id){
  document.getElementById(id).style.display="none";
}

//////////////////////
// THEME SYSTEM
//////////////////////

function toggleTheme(){
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.className);
}

//////////////////////
// CALCULATOR
//////////////////////

function press(val){
  display.value += val;
}

function calculate(){
  try{
    display.value = eval(display.value);
  }catch{
    display.value = "Error";
  }
}

function clearCalc(){
  display.value="";
}

//////////////////////
// NOTEPAD
//////////////////////

function saveNotes(){
  localStorage.setItem("notes", notes.value);
}

//////////////////////
// BROWSER SYSTEM
//////////////////////

function loadSite(){
  let input = document.getElementById("url").value.trim();
  const frame = document.getElementById("frame");

  if(!input) return;

  // If no dot → treat as search
  if(!input.includes(".")){
    frame.src = "https://duckduckgo.com/?q=" + encodeURIComponent(input);
    return;
  }

  // Add https if missing
  if(!input.startsWith("http")){
    input = "https://" + input;
  }

  frame.src = input;

  // Fallback if site blocks iframe
  setTimeout(()=>{
    try{
      frame.contentWindow.location.href;
    }catch{
      frame.src = "https://duckduckgo.com/?q=" + encodeURIComponent(input);
    }
  },1500);
}

function goBack(){
  document.getElementById("frame").contentWindow.history.back();
}

function goForward(){
  document.getElementById("frame").contentWindow.history.forward();
}

// Enter key support
document.addEventListener("DOMContentLoaded", ()=>{
  const urlInput = document.getElementById("url");
  if(urlInput){
    urlInput.addEventListener("keydown", function(e){
      if(e.key === "Enter"){
        loadSite();
      }
    });
  }
});

//////////////////////
// SERVICE WORKER
//////////////////////

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
  .then(()=>console.log("Service Worker Registered"))
  .catch(err=>console.log("SW Error:", err));
}
