/* ===========================================================
   script.js  -  JavaScript concepts for the Hibernate exercise

   Covers: data types, var/let/const, operators, arrays, objects,
   functions, conditions, loops (for/while/do-while/forEach),
   alert + prompt, element selection (single + multiple), DOM tree,
   element manipulation + styling, event listeners, input values,
   creating elements, animation + movement, window/document/keyboard
   events.
   =========================================================== */


/* -----------------------------------------------------------
   1. DATA TYPES  -  JavaScript sets the type from the value
   ----------------------------------------------------------- */
let siteName = "Hibernate";      // string
let version = 8;                  // number
let isReleased = true;           // boolean
let releaseDate = null;          // null
let maintainer;                  // undefined
const config = { theme: "light" }; // object
const modules = ["ORM", "Search"]; // array (also an object)

// typeof reports the type JavaScript assigned
console.log("Types:", typeof siteName, typeof version, typeof isReleased,
  typeof releaseDate, typeof maintainer, typeof config, typeof modules);

// A variable can change type at runtime (dynamic typing)
let flexible = "text";
flexible = 42;                   // now a number
console.log("flexible is now", typeof flexible);


/* -----------------------------------------------------------
   2. VARIABLES: let vs const
   ----------------------------------------------------------- */
let counter = 0;                 // let  - can be reassigned
const MAX_ITEMS = 10;            // const - cannot be reassigned


/* -----------------------------------------------------------
   3. ARRAYS and OBJECTS  -  many values in one variable
   ----------------------------------------------------------- */
const projects = [
  { name: "Hibernate ORM",       stable: true,  version: "8.0.0.Beta1" },
  { name: "Hibernate Search",    stable: true,  version: "7.2.0.Final" },
  { name: "Hibernate Validator", stable: true,  version: "9.0.0.Final" },
  { name: "Hibernate Reactive",  stable: false, version: "4.4.0.Final" }
];


/* -----------------------------------------------------------
   4. OPERATORS  -  arithmetic, comparison, logical, string
   ----------------------------------------------------------- */
const total = projects.length;            // .length
const half = total / 2;                   // arithmetic
const isBig = total > 3 && total < 100;   // comparison + logical
const summary = "There are " + total + " projects"; // string concat
console.log(summary, "| half =", half, "| isBig =", isBig);


/* -----------------------------------------------------------
   5. FUNCTIONS  -  declaration + arrow function
   ----------------------------------------------------------- */
function greet(name) {                     // function declaration
  return "Hello, " + name + "!";
}

const stableLabel = (project) =>           // arrow function
  project.stable ? "stable" : "preview";   // ternary condition


/* -----------------------------------------------------------
   6. CONDITIONS  -  if / else if / else  and  switch
   ----------------------------------------------------------- */
function health(count) {
  if (count === 0) {
    return "empty";
  } else if (count < 3) {
    return "small";
  } else {
    return "healthy";
  }
}
console.log("Project set is", health(total));

function pickIcon(type) {
  switch (type) {                          // switch statement
    case "orm":    return "◈";
    case "search": return "🔍";
    default:       return "⚙";
  }
}


/* -----------------------------------------------------------
   7. LOOPS  -  for, while, do...while, forEach
   ----------------------------------------------------------- */
// for loop
for (let i = 0; i < projects.length; i++) {
  console.log("for:", projects[i].name, "->", stableLabel(projects[i]));
}

// while loop
let w = 0;
while (w < projects.length) {
  console.log("while:", projects[w].version);
  w++;
}

// do...while loop (runs at least once)
let d = 0;
do {
  console.log("do-while sees:", projects[d].name);
  d++;
} while (d < 1);

// forEach loop
projects.forEach(function (p, index) {
  console.log("forEach #" + index + ":", p.name);
});


/* ===========================================================
   DOM  -  everything below needs the page to exist first.
   =========================================================== */
document.addEventListener("DOMContentLoaded", function () {   // DOCUMENT event

  /* ---------- 8. ELEMENT SELECTION (single) ---------- */
  const body = document.body;
  const clock = document.getElementById("clock");            // by id
  const greetBtn = document.getElementById("greetBtn");
  const greetingOut = document.getElementById("greeting");
  const noteInput = document.getElementById("noteInput");
  const addNoteBtn = document.getElementById("addNoteBtn");
  const noteList = document.getElementById("noteList");
  const mover = document.getElementById("mover");
  const moveBtn = document.getElementById("moveBtn");
  const keyLog = document.getElementById("keyLog");
  const themeToggle = document.getElementById("themeToggle");
  const scrollTop = document.getElementById("scrollTop");
  const firstCard = document.querySelector(".card");         // first match

  /* ---------- 9. MULTIPLE ELEMENT SELECTION ---------- */
  const cards = document.querySelectorAll(".card");          // NodeList
  console.log("Found", cards.length, "cards on the page");

  /* ---------- 10. DOM TREE navigation ---------- */
  if (firstCard) {
    const heading = firstCard.querySelector("h2");
    console.log("First card heading text:", heading.textContent);
    console.log("Its parent element is a", firstCard.parentElement.className);
  }

  /* ---------- 11. ELEMENT MANIPULATION + STYLING ---------- */
  // Give every card a number and a subtle staggered highlight
  cards.forEach(function (card, i) {
    card.dataset.index = i;                    // set an attribute
    card.style.transition = "transform 0.15s"; // set styling attribute
  });

  /* ---------- 12. LIVE CLOCK (window.setInterval) ---------- */
  function tick() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    clock.textContent = pad(now.getHours()) + ":" +
      pad(now.getMinutes()) + ":" + pad(now.getSeconds());
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- 13. ALERT + PROMPT + INPUT + EVENT LISTENER ---------- */
  greetBtn.addEventListener("click", function () {
    const name = prompt("What is your name?", "developer");  // prompt
    if (name) {
      greetingOut.textContent = greet(name);                 // uses function
      alert(greet(name));                                    // alert
    } else {
      greetingOut.textContent = "Maybe next time!";
    }
  });

  /* ---------- 14. READING INPUT VALUES + CREATING ELEMENTS ---------- */
  function addNote() {
    const value = noteInput.value.trim();      // read the input value
    if (value === "") {                        // condition
      noteInput.style.borderColor = "#d0451b";
      return;
    }
    noteInput.style.borderColor = "#ccc";

    const li = document.createElement("li");   // create element
    li.textContent = value;

    const remove = document.createElement("button");
    remove.textContent = " x";
    remove.className = "mini-btn";
    remove.style.marginLeft = "8px";
    remove.addEventListener("click", function () {
      noteList.removeChild(li);                // remove element
    });

    li.appendChild(remove);                    // build the tree
    noteList.appendChild(li);                  // add to the page
    noteInput.value = "";                      // clear the input
  }

  addNoteBtn.addEventListener("click", addNote);
  // KEYBOARD event on the input - Enter also adds the note
  noteInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") { addNote(); }
  });

  /* ---------- 15. ANIMATION + ELEMENT MOVEMENT ---------- */
  function animateMover() {
    const track = mover.parentElement;
    const maxLeft = track.clientWidth - mover.clientWidth - 4;
    let pos = 4;
    let dir = 3;
    let bounces = 0;

    // requestAnimationFrame drives the movement frame by frame
    function step() {
      pos += dir;
      if (pos >= maxLeft) { pos = maxLeft; dir = -dir; bounces++; }  // hit right edge
      else if (pos <= 4) { pos = 4; dir = -dir; bounces++; }          // hit left edge
      mover.style.left = pos + "px";           // move by changing position
      if (bounces < 4) {                       // stop after a few bounces
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  }
  moveBtn.addEventListener("click", animateMover);

  /* ---------- 16. THEME TOGGLE (element manipulation via classList) ---------- */
  function toggleTheme() {
    body.classList.toggle("dark");
    themeToggle.textContent = body.classList.contains("dark")
      ? "Light mode" : "Dark mode";
  }
  themeToggle.addEventListener("click", toggleTheme);

  /* ---------- 17. KEYBOARD EVENTS on the whole document ---------- */
  document.addEventListener("keydown", function (event) {    // tracking key presses
    keyLog.textContent = event.key;
    if (event.key.toLowerCase() === "t") {
      toggleTheme();                           // "T" shortcut toggles theme
    }
  });

  /* ---------- 18. WINDOW EVENTS: scroll + resize ---------- */
  window.addEventListener("scroll", function () {            // window scroll event
    scrollTop.style.display = window.scrollY > 300 ? "block" : "none";
  });

  window.addEventListener("resize", function () {           // window resize event
    console.log("Window width is now", window.innerWidth);
  });

  console.log("Hibernate exercise JS loaded. " + MAX_ITEMS + "-item max, counter " + counter);
});

// WINDOW load event (fires after all assets, including images, finish)
window.addEventListener("load", function () {
  console.log("All page assets finished loading.");
});
