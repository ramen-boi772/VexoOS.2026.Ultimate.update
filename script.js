let zIndex = 1;

window.onload = () => {
  let theme = localStorage.getItem("theme");
  if(theme) document.body.className = theme;

  let wall = localStorage.getItem("wall");
  if(wall) desktop.style.backgroundImage = `url(${wall})`;

  let saved = localStorage.getItem("notes");
  if(saved) notes.value = saved;
};

function toggleStart(){
  start.classList.toggle("show");
}

function openApp(id){
  let win = document.getElementById(id);
  win.style.display="block";
  win.style.zIndex=++zIndex;
}

function closeApp(id){
  document.getElementById(id).style.display="none";
}

document.querySelectorAll(".window").forEach(win=>{
  win.addEventListener("mousedown",()=>{
    win.style.zIndex=++zIndex;
  });

  let head = win.querySelector(".header");
  head.onmousedown = function(e){
    let offsetX=e.clientX-win.offsetLeft;
    let offsetY=e.clientY-win.offsetTop;
    document.onmousemove=function(e){
      win.style.left=e.clientX-offsetX+"px";
      win.style.top=e.clientY-offsetY+"px";
    };
    document.onmouseup=function(){ document.onmousemove=null; };
  };
});

function toggleTheme(){
  document.body.className =
    document.body.className==="light"?"dark":"light";
  localStorage.setItem("theme",document.body.className);
}

wallInput.onchange=function(e){
  let reader=new FileReader();
  reader.onload=function(event){
    desktop.style.backgroundImage=`url(${event.target.result})`;
    localStorage.setItem("wall",event.target.result);
  };
  reader.readAsDataURL(e.target.files[0]);
};

function press(val){ display.value+=val; }
function calculate(){ display.value=eval(display.value); }
function clearCalc(){ display.value=""; }

function saveNotes(){
  localStorage.setItem("notes",notes.value);
}

function loadSite(){
  let urlInput = url.value;
  if(!urlInput.startsWith("http")) urlInput="https://"+urlInput;
  frame.src=urlInput;
}
