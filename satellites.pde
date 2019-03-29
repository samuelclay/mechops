int x1, x2, x3, y1, y2, y3;
Dish c1,c2,c3;
int counter;

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

  c1 = new Dish(x1, y1, 1, -0.02, 0);
  c2 = new Dish(x2, y2, 1, -0.02, PI);
  c3 = new Dish(x3, y3, 1, -0.02, -PI/6);
}


void draw() {
  background(0);
  
  c3.search();
  
  if (c1.ran == false){
    c1.fade(c1.transp, c1.dtrans);
  }
  if (counter > 0 && c2.ran == false) {
    c2.fade(c2.transp, c2.dtrans);
  }
  if (counter > 1 && c3.ran == false) {
    c3.fade(c3.transp, c3.dtrans);
  }
  
  
  if (counter >= 3) {
    counter = 0;
    c1.ran = false;
    c2.ran = false;
    c3.ran = false;
  } 
}


class Dish {
  int x, y, diameter = 100;
  float transp, dtrans;
  float rotation;
  color cl1 = color(0,0,255,255);
  boolean ran = false;
  float search_angle = 0;

  Dish(int x_, int y_, float transp_, float dtrans_, float rotation_) {
    x = x_;
    y = y_;
    transp = transp_;
    dtrans = dtrans_;
    rotation = rotation_;
  }
  
  void fade(float transp, float dtrans){
    float a = map(transp, 0, 1, 0, 255);
    
    translate(this.x, this.y);
    rotate(this.rotation);
    fill(255, 255, 255, a);
    ellipse(0, 0, this.diameter, this.diameter*.5);
    
    this.transp += this.dtrans;
    
    if (this.transp < 0){
      this.transp = 1;
      //this.dtrans =+ -0.05;
      counter++;
      this.ran = true;
    }
  }
  
  void search() {
    this.search_angle += PI/72;
    fill(255, 230, 210, 76);
    arc(this.x, this.y, 200, 200, this.search_angle, this.search_angle+PI/6);
  }
  
}

