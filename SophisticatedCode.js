/*
   Filename: SophisticatedCode.js

   Description: This code is a comprehensive example of a sophisticated and complex JavaScript program. It simulates a virtual planetary system, including multiple celestial bodies with dynamic movements, mass calculations, gravity interactions, and visual rendering.

   Note: This code requires a canvas element with id "canvas" in the HTML file to display the simulation.

   Author: John Smith
   Date: September 15, 2021
*/

// HTML canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Celestial body class
class CelestialBody {
  constructor(name, mass, x, y, radius, color) {
    this.name = name;
    this.mass = mass;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vx = 0;
    this.vy = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  calculateGravity(otherBody) {
    const dx = this.x - otherBody.x;
    const dy = this.y - otherBody.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const force = (this.mass * otherBody.mass) / (distance * distance);
    const angle = Math.atan2(dy, dx);

    const fx = force * Math.cos(angle);
    const fy = force * Math.sin(angle);

    return {
      fx,
      fy,
    };
  }
}

// Create celestial bodies
const sun = new CelestialBody('Sun', 1989000, canvas.width / 2, canvas.height / 2, 50, 'yellow');
const earth = new CelestialBody('Earth', 5972, canvas.width / 2 - 250, canvas.height / 2, 20, 'blue');
const moon = new CelestialBody('Moon', 73.5, canvas.width / 2 - 250, canvas.height / 2 + 100, 10, 'gray');

// Update function called in each animation frame
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const forces = earth.calculateGravity(sun);
  earth.vx -= forces.fx / earth.mass;
  earth.vy -= forces.fy / earth.mass;

  earth.x += earth.vx;
  earth.y += earth.vy;

  const forcesMoon = moon.calculateGravity(earth);
  moon.vx -= forcesMoon.fx / moon.mass;
  moon.vy -= forcesMoon.fy / moon.mass;

  moon.x += moon.vx;
  moon.y += moon.vy;

  sun.draw();
  earth.draw();
  moon.draw();

  requestAnimationFrame(update);
}

// Initial drawing
sun.draw();
earth.draw();
moon.draw();

// Start the simulation
requestAnimationFrame(update);