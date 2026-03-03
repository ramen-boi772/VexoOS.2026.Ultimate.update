let zIndex = 1;

const desktop = document.getElementById("desktop");
const start = document.getElementById("start");
const notes = document.getElementById("notes");
const display = document.getElementById("display");

window.onload = () => {

  setTimeout(()=>{
    document.getElementById("boot").style.display="none";
  },2000);

  if(localStorage.getItem("theme"))
    document.body.className = localStorage.getItem("theme");

  if(localStorage.getItem("notes"))
    notes.value = localStorage.getItem("notes");
};

function toggleStart(){
  start.style.display =
    start.style.display==="block"?"none":"block";
}

function openApp(id){
  const win=document.getElementById(id);
  win.style.display="block";
  win.style.zIndex=++zIndex;
}

function closeApp(id){
  document.getElementById(id).style.display="none";
}

function toggleTheme(){
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  localStorage.setItem("theme",document.body.className);
}

function press(val){
  display.value+=val;
}

function calculate(){
  try{ display.value=eval(display.value); }
  catch{ display.value="Error"; }
}

function clearCalc(){
  display.value="";
}

function saveNotes(){
  localStorage.setItem("notes",notes.value);
}

function loadSite(){
  let url=document.getElementById("url").value;
  if(!url.startsWith("http"))
    url="https://"+url;
  document.getElementById("frame").src=url;
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
