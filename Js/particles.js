var canvas = document.querySelector('#particles');
var ctx = canvas.getContext('2d');
var particles = [];
const numParticles = 40;

function resizeWindow(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    while(particles.length < numParticles){ 
        particles.push(createParticle(Math.random() * window.innerWidth, Math.random() * window.innerHeight));
    }
}

function createParticle(x, y) {
    var speedY = Math.random() * -1 - 2;  
    let size = Math.random() * 5 + 1; 

    let particle = {
        x: x,
        y: y,
        size: size, 
        speedX: Math.random() + 2.5, // - 0.5
        speedY: speedY, 
        rotation: Math.random() * Math.PI * 2,  
        opacity: Math.random(),
        blur: size > 3 ? (size - 3) / 2 : 0  
    };

    return particle;
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.opacity -= 0.002;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        if(particle.opacity < 0.4) {
            ctx.filter = `blur(${particle.blur}px)`;
        }else{
            ctx.filter = 'none';
        }
        ctx.fillStyle = `rgba(0, 0, 0, ${particle.opacity})`;  
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);

        ctx.restore();

        if (particle.opacity < 0 || particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
            particles[index] = createParticle(Math.random() * window.innerWidth, canvas.height + 2);
        }
    });

    requestAnimationFrame(animateParticles);
}

resizeWindow(); 
animateParticles();

