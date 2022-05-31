import bullet from "./bullet.js";

export default class BulletController {
  bullets = [];
  timerTillNextBullet = 10;
  constructor(canvas) {
    this.canvas = canvas;
  }

  shoot(x, y, speed, damage, delay) {
    if (this.timerTillNextBullet <= 0) {
      this.bullets.push(new bullet(x, y, speed, damage));
      this.timerTillNextBullet = delay;
    }

    this.timerTillNextBullet--;
  }
  draw(ctx) {
    this.bullets.forEach((Bullet) => {
      if (this.isBulletOfScreen(Bullet)) {
        const index = this.bullets.indexOf(Bullet);
        this.bullets.splice(index, 1);
      }
      Bullet.draw(ctx);
    });
  }

  collideWith(sprite) {
    return this.bullets.some((Bullet) => {
      if (Bullet.collideWith(sprite)) {
        this.bullets.splice(this.bullets.indexOf(Bullet), 1);
        return true;
      }
      return false;
    });
  }

  isBulletOfScreen(Bullet) {
    return Bullet.y <= -Bullet.height;
  }
}
