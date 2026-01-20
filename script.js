// ===== THEME TOGGLE =====
const toggle = document.getElementById("themeToggle");
if(localStorage.getItem("theme")==="dark"){
  document.body.classList.add("dark");
}
toggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
};

// ===== MOBILE MENU =====
const menuToggle = document.getElementById("menuToggle");
const navbarMenu = document.querySelector(".navbar ul");
menuToggle.addEventListener("click", () => {
  navbarMenu.classList.toggle("show");
});

// ===== DYNAMIC SECTION PADDING =====
function adjustSectionPadding(){
  const navbarHeight = document.querySelector(".navbar").offsetHeight;
  const firstSection = document.querySelector(".section:first-of-type");
  firstSection.style.paddingTop = navbarHeight + 20 + "px";
}
window.addEventListener("resize", adjustSectionPadding);
window.addEventListener("load", adjustSectionPadding);

// ===== CV VIEWER HEIGHT =====
function adjustCVHeight(){
  const cvViewer = document.getElementById("cvViewer");
  const windowHeight = window.innerHeight;
  const navbarHeight = document.querySelector(".navbar").offsetHeight;
  cvViewer.style.height = windowHeight - navbarHeight - 60 + "px";
}
window.addEventListener("resize", adjustCVHeight);
window.addEventListener("load", adjustCVHeight);

// ===== SORT TABLE =====
function sortTable(col){
  let table = document.getElementById("academicTable");
  let rows = Array.from(table.tBodies[0].rows);
  rows.sort((a,b)=>a.cells[col].innerText.localeCompare(b.cells[col].innerText));
  rows.forEach(r=>table.tBodies[0].appendChild(r));
}

// ===== SEARCH TABLE =====
document.getElementById("search").addEventListener("keyup",function(){
  let val = this.value.toLowerCase();
  document.querySelectorAll("#academicTable tbody tr").forEach(row=>{
    row.style.display = row.innerText.toLowerCase().includes(val) ? "" : "none";
  });
});

// ===== VIEW CV =====
document.getElementById("viewCVBtn").addEventListener("click", function(){
  const cvViewer = document.getElementById("cvViewer");
  if(!cvViewer.querySelector("iframe")){
    cvViewer.innerHTML = `<iframe src="cv.pdf" type="application/pdf"></iframe>`;
  }
});

// ===== CONTACT FORM =====
document.getElementById("contactForm").addEventListener("submit",function(e){
  e.preventDefault();
  alert("Message sent successfully!");
  this.reset();
});

// ===== SKILL ANIMATION =====
const skillsSection = document.getElementById("skills");
const progressFills = document.querySelectorAll(".progress-fill");
const percentSpans = document.querySelectorAll(".percent");
let skillsAnimated = false;

function animateSkills(){
  progressFills.forEach((fill, index) => {
    const percent = fill.dataset.percent;
    fill.style.width = percent + "%";
    percentSpans[index].textContent = percent + "%";
  });
}

function isInViewport(element){
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

window.addEventListener("scroll", function(){
  if(!skillsAnimated && isInViewport(skillsSection)){
    animateSkills();
    skillsAnimated = true;
  }
});
const skills = [
  "Web Development",
  "Programming",
  "Software Engineering",
  "Problem Solving",
  
];

let i = 0;
let charIndex = 0;
const typed = document.getElementById("typed");

function typeSkill() {
  if (charIndex < skills[i].length) {
    typed.textContent += skills[i].charAt(charIndex);
    charIndex++;
    setTimeout(typeSkill, 150);
  } else {
    setTimeout(eraseSkill, 1500);
  }
}

function eraseSkill() {
  if (charIndex > 0) {
    typed.textContent = skills[i].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseSkill, 100);
  } else {
    i = (i + 1) % skills.length;
    setTimeout(typeSkill, 500);
  }
}

// Start typing effect
typeSkill();

