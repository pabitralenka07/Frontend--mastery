const words = ["Web Developer", "UI/UX Designer", "Freelancer"];
const el = document.querySelector(".typewriter-text");

let wordIndex = 0, charIndex = 0, deleting = false;

function tick(){
    const current = words[wordIndex];

    if(!deleting){
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if(charIndex === current.length){
            deleting = true;
            setTimeout(tick, 1200);
            return;
        }
    } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if(charIndex === 0){
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }
    setTimeout(tick, deleting ? 60 : 100);
}

tick();

function hamburg(){
    document.querySelector(".dropdown").style.transform = "translateY(0px)";
}
function cancel(){
    document.querySelector(".dropdown").style.transform = "translateY(-500px)";
}
