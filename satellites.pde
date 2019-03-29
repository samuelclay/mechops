int x1, x2, x3, y1, y2, y3;
Dish c1,c2,c3;
int counter;
// int[][] stanzas = {
//   {10, 10, 10, 100, 100, 100, 50, 50, 50},
//   {100, 100, 10, 10, 100, 100, 10, 10}
// };
// public enum states {STATE_TRANSMIT_A2B, STATE_TRANSMIT_B2A}

void setup() {
  size(800, 800);
  background(0);
  rectMode(CENTER);
  
  x1 = width/4;
  x2 = width - x1;
  x3 = width - x1;
  y1 = height/4;
  y2 = height/4;
  y3 = height - y1;
  counter = 0;

  c1 = new Dish(x1, y1);
  c2 = new Dish(x2, y2);
  c3 = new Dish(x3, y3);
  c3.rotate(-PI/6);
}


void draw() {
  background(0);
  c3.search();
  
  if (c1.ran == false){
    c1.fade(-0.02);
  }
  if (counter > 0 && c2.ran == false) {
    c2.fade(-0.02);
  }
  if (counter > 1 && c3.ran == false) {
    c3.fade(-0.02);
  }
  
  if (counter >= 3) {
    counter = 0;
    c1.reset();
    c2.reset();
    c3.reset();
  } 
  
}


class Dish {
  int x, y, diameter = 100;
  float transp;
  float rotation;
  color cl1 = color(0,0,255,255);
  boolean ran = false;
  float search_angle = 0;

  Dish(int x_, int y_) {
    x = x_;
    y = y_;
    transp = 1;
  }
  
  void rotate(float rotation) {
    this.rotation = rotation;
  }
  
  void fade(float dtrans){
    float a = map(this.transp, 0, 1, 0, 255);
    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rotation);
    noStroke();
    fill(255, 255, 255, a);
    ellipse(0, 0, this.diameter, this.diameter*.5);
    popMatrix();
    
    this.transp += dtrans;
    if (this.transp < 0){
      this.transp = 1;
      counter++;
      this.ran = true;
    }
  }
  
  void search() {
    this.search_angle += PI/72;
    fill(255, 230, 210, 76);
    arc(this.x, this.y, 200, 200, this.search_angle, this.search_angle+PI/6);
  }
  
  void reset() {
    this.ran = false;
  }
  
}

