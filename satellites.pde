int x1, x2, x3, y1, y2, y3;
Dish c1, c2, c3;
int counter;
int[][] stanzas = {
  {10, 10, 10, 100, 100, 100, 50, 50, 50},
  {100, 100, 10, 10, 100, 100, 10, 10}
};
public enum states {STATE_TRANSMIT_A2B, STATE_TRANSMIT_B2A}
states state;
int stanza_iter;
int transmit_start;
final int TRANSMIT_MS = 5 * 1000;

void setup() {
  size(800, 800);
  smooth();
  background(0);
  rectMode(CENTER);
  
  x1 = width/4;
  x2 = width - x1;
  x3 = width - x1;
  y1 = height/4;
  y2 = height/4;
  y3 = height - y1;
  counter = 0;
  stanza_iter = 0;

  c1 = new Dish(x1, y1);
  c2 = new Dish(x2, y2);
  c3 = new Dish(x3, y3);
  c3.rotate(PI/6);
  
  state = states.STATE_TRANSMIT_A2B;
  transmit_start = millis();
}


void draw() {
  background(0);
  c3.search();
  
  if (state == states.STATE_TRANSMIT_A2B) {
    c1.transmit();
    c2.receive();
    c3.transmit();
  } else if (state == states.STATE_TRANSMIT_B2A) {
    c1.receive();
    c2.transmit();
    c3.transmit();
  }
  
  if (millis() > transmit_start + TRANSMIT_MS + 1000) {
    transmit_start = millis();
    if (state == states.STATE_TRANSMIT_A2B) {
      state = states.STATE_TRANSMIT_B2A;
    } else if (state == states.STATE_TRANSMIT_B2A) {
      state = states.STATE_TRANSMIT_A2B;
    }
  }
}


class Dish {
  int x, y, diameter = 100;
  float transp = 1;
  float rotation;
  color cl1 = color(0,0,255,255);
  boolean ran = false;
  float search_angle = 0;
  int stanza_iter = 0;

  Dish(int x_, int y_) {
    x = x_;
    y = y_;
  }
  
  void rotate(float rotation) {
    this.rotation = rotation;
  }
  
  void transmit() {
    // int[] current_stanza = stanzas[this.stanza_iter];
    if (millis() - transmit_start > TRANSMIT_MS) return;
    float progress = map(millis() - transmit_start, 0, TRANSMIT_MS, 0, 200);
    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rotation);
    rect(0, 0, 100, 100);

    println(" ---> Progress: ", progress, floor(progress));
    for (int i=0; i < floor(progress); i++) {
      rotate(0.1);
      ellipse(i, 0, 10, 10);
    }
    popMatrix();
  }
  
  void receive() {
    // int[] current_stanza = stanzas[this.stanza_iter];
    if (millis() - transmit_start < 1000) return;
    float progress = map(millis() - transmit_start - 1000, 0, TRANSMIT_MS, 0, 200);
    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rotation);
    rect(0, 0, 100, 100);

    println(" ---> Progress: ", progress, floor(progress));
    for (int i=0; i < floor(progress); i++) {
      rotate(0.1);
      ellipse(i, 0, 10, 10);
    }
    popMatrix();
  }
  
  void fade(float dtrans){
    float alpha = map(this.transp, 0, 1, 0, 255);
    
    pushMatrix();
    translate(this.x, this.y);
    println(" ---> Rotation: ", this.rotation);
    rotate(this.rotation);
    noStroke();
    fill(255, 255, 255, alpha);
    ellipse(0, 0, this.diameter, this.diameter*.5);
    popMatrix();
    
    this.transp += dtrans;
    if (this.transp < 0.5){
      this.transp = 1;
      counter++;
      this.ran = true;
    }
  }
  
  void search() {
    pushMatrix();
    this.search_angle += PI/72;
    fill(255, 230, 210, 76);
    arc(this.x, this.y, 200, 200, this.search_angle, this.search_angle+PI/6);
    popMatrix();
  }
  
  void reset() {
    this.ran = false;
  }
  
}

