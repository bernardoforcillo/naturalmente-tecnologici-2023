import React from 'react';

class Boid extends React.Component {
  constructor(props) {
    super(props);
    const { p5, key, perceptionRadius } = props;
    this.key = key;
    this.p5 = p5;
    this.position = p5.createVector(p5.random(p5.width), p5.random(p5.height));
    this.velocity = p5.createVector(p5.random(-2, 2), p5.random(-2, 2));
    this.velocity.setMag(p5.random(2, 4));
    this.acceleration = p5.createVector();
    this.maxForce = 0.5;
    this.maxSpeed = 4;
    this.opacity = 0;
    this.perceptionRadius = perceptionRadius;
  }

  show(
    p5,
    numNear
    //, img
  ) {
    // let angle = this.velocity.heading();
    let count = p5.frameCount;
    let n = 30 + numNear * 70;
    this.opacity = count < 255 && count < n ? count : n;

    p5.strokeWeight(6 + numNear / 2);
    p5.stroke(233, 138, 21, this.opacity);
    p5.point(this.position.x, this.position.y);

    // p5.push();
    // p5.translate(this.position.x, this.position.y);
    // p5.imageMode(p5.CENTER);
    // p5.rotate(angle);
    // p5.image(img, this.position.x, this.position.y);

    // p5.pop();
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  align(boids) {
    let steering = this.p5.createVector(0, 0);
    let total = 0;

    for (let other of boids) {
      let d = this.p5.dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other !== this && d < this.perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }

    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }

    return steering;
  }

  cohesion(boids) {
    let steering = this.p5.createVector(0, 0);
    let total = 0;

    for (let other of boids) {
      let d = this.p5.dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other !== this && d < this.perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }

    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }

    return { steering, total };
  }

  separation(boids) {
    let steering = this.p5.createVector();
    let total = 0;
    for (let other of boids) {
      let d = this.p5.dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other !== this && d < this.perceptionRadius) {
        let diff = this.p5.createVector(0, 0);
        diff.add(this.position);
        diff.sub(other.position);
        diff.div(d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      // steering.limit(this.maxForce);
    }
    return steering;
  }

  join(boids, numNear) {
    let n = numNear * 5;
    let count = 0;
    for (let element of boids) {
      if (element !== this && count < 3) {
        let dis = this.p5.dist(this.position.x, this.position.y, element.position.x, element.position.y);
        if (dis < this.perceptionRadius) {
          this.p5.strokeWeight(1);
          this.p5.stroke(255, 255, 255, n > 100 ? 100 : n);
          this.p5.line(this.position.x, this.position.y, element.position.x, element.position.y);
          count++;
        }
      }
    }
  }

  flock(boids, mulAl, mulCoh, mulSep) {
    let alignment = this.align(boids);
    let separation = this.separation(boids);
    let res = this.cohesion(boids);
    let cohesion = res.steering;

    alignment.mult(mulAl);
    cohesion.mult(mulCoh);
    separation.mult(mulSep);

    this.acceleration.add(separation);
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);

    let distBoidMouse = this.p5.dist(this.position.x, this.position.y, this.p5.mouseX, this.p5.mouseY);
    if (distBoidMouse < 150 && distBoidMouse > 2) {
      let pointMouse = this.p5.createVector(this.p5.mouseX - this.position.x, this.p5.mouseY - this.position.y);
      if (this.p5.mouseIsPressed) this.acceleration.add(pointMouse);
      else this.acceleration.sub(pointMouse);
    }

    return res.total;
  }

  edges() {
    if (this.position.x > this.p5.width) this.position.x = 0;
    else if (this.position.x < 0) this.position.x = this.p5.width;

    if (this.position.y > this.p5.height) this.position.y = 0;
    else if (this.position.y < 0) this.position.y = this.p5.height;
  }
}

export default Boid;
