int x, x1, y, y1;
Circle c1,c2,c3,c4;
int counter;

void setup(){
  size(800,800);
  background (0);
  
  x = width/4;
  x1 = width - x;
  y = height/4;
  y1 = height - y; 
  counter=0;

  c1 = new Circle(x, y, 1, -0.01, false);
  c2 = new Circle(x1, y, 1, -0.01, false);
  c3 = new Circle(x, y1, 1, -0.01, false);
  c4 = new Circle(x1, y1, 1, -0.01, false);
}

void draw(){
  background (0);

    if (c1.ran == false){
      c1.fade(c1.transp, c1.dtrans);
    }
    if(counter > 0 && c2.ran == false){
      c2.fade(c2.transp, c2.dtrans);
    }
    if(counter > 1 && c4.ran == false){
      c4.fade(c4.transp, c4.dtrans);
    }
    if(counter > 2 && c3.ran == false){
      c3.fade(c3.transp, c3.dtrans);
    }
  if(counter >= 4){
    counter = 0;
    c1.ran = false;
    c2.ran = false;
    c4.ran = false;
    c3.ran = false;
  } 
}

class Circle {
  int x,y, diameter = 100;
  float transp, dtrans;
  color cl1 = color(0,0,255,255);
  boolean ran;

  Circle(int x_, int y_, float transp_, float dtrans_, boolean ran_) {
    x = x_;
    y = y_;
    transp = transp_;
    dtrans = dtrans_;
    ran = ran_;
  }
  
  void fade(float transp, float dtrans){
    float a = map(transp, 0, 1, 0, 255);
    fill(255, 255, 255, a);
    ellipse(x,y,diameter,diameter);
    this.transp += this.dtrans;
    //println(transp);
    if (this.transp<0){
      this.transp = 1;
      //this.dtrans =+ -0.05;
      counter++;
      this.ran = true;
    }
  }
}
