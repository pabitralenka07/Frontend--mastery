const container = document.querySelector(".heart-container");

const colors = ["#ff4d6d", "#ff758f", "#ff8fa3", "#e63950", "#ff3860"];

function spawnHeart(){
    const heart = document.createElement("div");
    heart.classList.add("heart");

    const size = 15 + Math.random() * 25;          // 15px - 40px
    const left = Math.random() * 100;               // 0% - 100%
    const duration = 4 + Math.random() * 4;         // 4s - 8s
    const drift = (Math.random() - 0.5) * 200;       // -100px to 100px
    const color = colors[Math.floor(Math.random() * colors.length)];

    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${left}%`;
    heart.style.backgroundColor = color;
    heart.style.setProperty("--drift", `${drift}px`);
    heart.style.animationDuration = `${duration}s`;

    container.appendChild(heart);

    // Clean up once the animation finishes so the DOM doesn't grow forever
    heart.addEventListener("animationend", () => heart.remove());
}

// Spawn a new heart at a steady interval
setInterval(spawnHeart, 350);

// Seed a few immediately so the screen isn't empty on load
for(let i = 0; i < 6; i++){
    setTimeout(spawnHeart, i * 200);
}