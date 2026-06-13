const faders = document.querySelectorAll("section");

const revealSections = () => {
    faders.forEach(section => {
        const position = section.getBoundingClientRect().top;
        if(position < window.innerHeight - 150){
            section.classList.add("show");
        }
    });
};

window.addEventListener("scroll", () => {
    revealSections();
});
window.addEventListener("load", () => {
    revealSections();
});

const text = [
"Software Developer",
"Web Developer",
"System Analyst",
"Future Software Engineer"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type(){

if(count === text.length){
count = 0;
}

currentText = text[count];

letter = currentText.slice(0,++index);

document.querySelector(".hero-content h2").textContent = letter;

if(letter.length === currentText.length){

count++;
index = 0;

setTimeout(type,1000);

}else{

setTimeout(type,120);

}

})();