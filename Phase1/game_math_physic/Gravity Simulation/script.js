const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gravity = 0.5;
const bounce = -12;
const balls = [];
const numBalls = 5; // Adjust the number of balls as needed

// Function to create a ball object
function createBall(x, y, radius, color) {
    return {
        x: x,
        y: y,
        radius: radius,
        color: color,
        velocityY: 0,
    };
}

// Create multiple balls with random starting positions and velocities
for (let i = 0; i < numBalls; i++) {
    balls.push(createBall(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        15,
        `hsl(${Math.random() * 360}, 100%, 50%)`
    ));
}

function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    balls.forEach(ball => {
        ball.velocityY += gravity;
        ball.y += ball.velocityY;

        if (ball.y + ball.radius > canvas.height) {
            ball.y = canvas.height - ball.radius;
            ball.velocityY *= -0.6; 
        }

        drawBall(ball);
    });

    requestAnimationFrame(update);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        balls.forEach(ball => {
            ball.velocityY = bounce;
        });
    }
});
update();
