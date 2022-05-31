import Player from "./player.js";
import BulletController from "./BulletControler.js";
import Enemy from "./Enemy.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 550;

const bulletController = new BulletController(canvas);
//player Position
const player = new Player(
  canvas.width / 2.2,
  canvas.height / 1.2,
  bulletController
);

const enemies = [
  new Enemy(50, 20, "green", 10),
  new Enemy(150, 20, "red", 50),
  new Enemy(250, 20, "blue", 15),
  new Enemy(350, 20, "gold", 5),
  new Enemy(450, 20, "red", 2),
  new Enemy(50, 100, "green", 4),
  new Enemy(150, 100, "gold", 5),
  new Enemy(250, 100, "yellow", 5),
  new Enemy(350, 100, "blue", 21),
  new Enemy(450, 100, "green", 5),
  new Enemy(640, 100, "blue", 13),
  new Enemy(550, 20, "green", 2),
  new Enemy(640, 20, "blue", 5),
  new Enemy(350, 20, "green", 51),
  new Enemy(450, 20, "blue", 5),
  new Enemy(550, 100, "green", 11),
];

function gameLoop() {
  setCommonStyle();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  bulletController.draw(ctx);
  player.draw(ctx);
  enemies.forEach((enemy) => {
    if (bulletController.collideWith(enemy)) {
      if (enemy.health <= 0) {
        const index = enemies.indexOf(enemy);
        enemies.splice(index, 1);
      }
    } else {
      enemy.draw(ctx);
    }
  });
}

function setCommonStyle() {
  ctx.shadowColor = "#d53";
  ctx.shadowBlur = 20;
  ctx.lineJoin = "bevel";
  ctx.lineWidth = 5;
}

setInterval(gameLoop, 1000 / 60);
