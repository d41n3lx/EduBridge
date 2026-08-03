// SCHOLARSHIP DATABASE

const scholarships = {

1:{
title:"Google Africa Scholarship",

description:
"Provides support for African students interested in technology, software engineering, cloud computing and digital careers."
},

2:{
title:"Mastercard Foundation Scholars",

description:
"Offers full educational sponsorship, mentorship and leadership development opportunities for outstanding African students."
},

3:{
title:"Women In STEM Award",

description:
"Supports women pursuing careers in Science, Technology, Engineering and Mathematics through scholarships and mentoring."
}

};

// MODAL FUNCTIONS

function openModal(id){

document.getElementById("modal").style.display="flex";

document.getElementById("modalTitle").innerText=
scholarships[id].title;

document.getElementById("modalDescription").innerText=
scholarships[id].description;

}

function closeModal(){

document.getElementById("modal").style.display="none";

}

// CLOSE MODAL IF USER CLICKS OUTSIDE

window.onclick = function(event){

const modal = document.getElementById("modal");

if(event.target === modal){

modal.style.display = "none";

}

};

// SEARCH FUNCTION

function searchScholarships(){

const input =
document.getElementById("searchInput")
.value
.toLowerCase();

const cards =
document.querySelectorAll(".scholarship-card");

cards.forEach(card => {

const title =
card.querySelector("h3")
.innerText
.toLowerCase();

if(title.includes(input)){

card.style.display="block";

}else{

card.style.display="none";

}

});

}

// SAVE SCHOLARSHIP

function saveScholarship(name){

let saved =
JSON.parse(
localStorage.getItem("savedScholarships")
) || [];

if(!saved.includes(name)){

saved.push(name);

localStorage.setItem(
"savedScholarships",
JSON.stringify(saved)
);

displaySaved();

alert("Scholarship saved!");

}else{

alert("Already saved!");

}

}

// DISPLAY SAVED SCHOLARSHIPS

function displaySaved(){

let saved =
JSON.parse(
localStorage.getItem("savedScholarships")
) || [];

const container =
document.getElementById("savedList");

if(saved.length === 0){

container.innerHTML =
"<p>No scholarships saved yet.</p>";

return;

}

container.innerHTML="";

saved.forEach(item=>{

const div =
document.createElement("div");

div.style.marginBottom="15px";

div.style.background="white";
div.style.padding="15px";
div.style.borderRadius="15px";
div.style.boxShadow="0 10px 25px rgba(0,0,0,.08)";

div.innerHTML=
`
<h3>${item}</h3>
`;

container.appendChild(div);

});

}

// LOAD SAVED ITEMS

displaySaved();
