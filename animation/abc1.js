const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// Configuration
const connectionDistance = 150; // Max distance to draw a line between particles
const baseParticleSize = 1.5;
const particleSpeed = 1.5;
const lineColor = 'rgba(167, 139, 250,'; // Slight purple tint like your image (add opacity later)
const particleColor = 'rgba(255, 255, 255, 0.8)';

// Mouse tracking
const mouse = { x: null, y: null, radius: 150 };

// Handle resizing
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles(); // Re-initialize particles on resize to fill new space
}
window.addEventListener('resize', resize);

// Track mouse globally because canvas has pointer-events: none
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});
window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Random velocity (direction and speed)
        this.vx = (Math.random() - 0.5) * particleSpeed;
        this.vy = (Math.random() - 0.5) * particleSpeed;
        this.size = Math.random() * baseParticleSize + 0.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    // Dynamically adjust particle count based on screen size for performance
    const area = width * height;
    const particleCount = Math.min(Math.floor(area / 12000), 150); // Cap at 150 particles

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particle to mouse
        if (mouse.x != null) {
            let dx = mouse.x - particles[i].x;
            let dy = mouse.y - particles[i].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                // Opacity fades out as distance increases
                ctx.strokeStyle = lineColor + (1 - distance / mouse.radius) + ')';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }

        // Connect particles to each other
        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                // Opacity fades out as distance increases
                ctx.strokeStyle = lineColor + (1 - distance / connectionDistance) + ')';
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}

// Start the animation
resize();
animate();