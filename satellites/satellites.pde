int x1, x2, x3, y1, y2, y3;
Dish c1, c2, c3;
int[][] stanzas = {
  {10, 10, 10, 100, 100, 100, 50, 50, 50},  // 40 khz
  {100, 100, 10, 10, 100, 100, 10, 10, 10}, // 35 khz
  {10, 10, 10, 100, 100, 100, 50, 50, 50},  // 30 khz
  {100, 100, 10, 10, 100, 100, 10, 10, 10}, // 25 khz
  {10, 10, 10, 100, 100, 100, 50, 50, 50},  // 20 khz
  {100, 100, 10, 10, 100, 100, 10, 10, 10}, // 15 khz
  {10, 10, 10, 100, 100, 100, 50, 50, 50},  // 10 khz
  {100, 100, 10, 10, 100, 100, 10, 10, 10}, // 5 khz
  {10, 10, 10, 100, 100, 100, 50, 50, 50},  // 1 khz
  {100, 100, 10, 10, 100, 100, 10, 10, 10}, // 500 hz
  {100, 100, 10, 10, 100, 100, 10, 10, 10}, // 100 hz
  {100, 100, 10, 10, 100, 100, 10, 10, 10}  // 50 hz
};
public enum states {STATE_BOOTSTRAP_C, STATE_SEARCH_C, STATE_TRANSMIT_A2B, STATE_TRANSMIT_B2A}
states state;
int stanza_iter;
int transmit_start;
final int TRANSMIT_MS = 5 * 1000;
final int BOOTSTRAP_C_MS = 3 * 1000;
final int SEARCH_C_MS = 3 * 1000;


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
  stanza_iter = 0;

  c1 = new Dish(x1, y1);
  c2 = new Dish(x2, y2);
  c3 = new Dish(x3, y3);
  c3.set_rotatation(PI/6);
  
  state = states.STATE_BOOTSTRAP_C;
  transmit_start = millis();
}

void draw() {
  background(0);
  
  runState();

  transitionState();
}

void runState() {
  if (state == states.STATE_BOOTSTRAP_C) {
    c3.bootstrap_c();
  } else if (state == states.STATE_SEARCH_C) {
    c3.search();
  } else if (state == states.STATE_TRANSMIT_A2B) {
    c1.transmit();
    c2.receive();
    c3.receive();
    c3.search();    
  } else if (state == states.STATE_TRANSMIT_B2A) {
    c1.receive();
    c2.transmit();
    c3.receive();
    c3.search();    
  }
}

void transitionState() {
  // Switch states
  if (state == states.STATE_BOOTSTRAP_C && millis() > BOOTSTRAP_C_MS) {
    state = states.STATE_TRANSMIT_A2B;
    transmit_start = millis();
  } else if (millis() > transmit_start + TRANSMIT_MS + 1000) {
    transmit_start = millis();
    if (state == states.STATE_TRANSMIT_A2B) {
      c1.set_color(color(26,137,175,100));
      c2.set_color(color(26,137,175,100));
      state = states.STATE_TRANSMIT_B2A;
    } else if (state == states.STATE_TRANSMIT_B2A) {
      c1.set_color(color(195,83,31,100));
      c2.set_color(color(195,83,31,100));
      state = states.STATE_TRANSMIT_A2B;
    }
  }
}


class Dish {
  int x, y, diameter = 100;
  float transp = 1;
  float rot;
  boolean ran = false;
  float search_angle = 0;
  int stanza_iter = 0;
  color message_color;
 
  Dish(int x_, int y_) {
    x = x_;
    y = y_;
  }
  
  void set_rotatation(float rotation) {
    this.rot = rotation;
  }
  
  void set_color(color clr) {
    this.message_color = clr;
  }
  
  void transmit() {
    // int[] current_stanza = stanzas[this.stanza_iter];
    if (millis() - transmit_start > TRANSMIT_MS) return;
    
    float progress = map(millis() - transmit_start, 0, TRANSMIT_MS, 0, 1);
    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rot);
    
    for (int s=0; s < stanzas.length; s++) {
      int[] stanza = stanzas[s];
      int current_stanza = int(min(stanza.length-1, floor(progress*stanza.length)));
      float stanza_progress = map(progress, 0, 1, 0, stanza.length) - current_stanza;
      int left_amplitude = stanza[current_stanza];
      int right_amplitude = stanza[min(stanza.length-1, current_stanza+1)];
      float interp_amplitude = left_amplitude;
      if (left_amplitude != right_amplitude) {
        interp_amplitude = map(stanza_progress, 0, 1, left_amplitude, right_amplitude);
      }
      float amplitude = s*10+interp_amplitude*.1;
      if (s==0) {
        // println(" ---> Amplitudes: ", current_stanza, stanza_progress, left_amplitude, right_amplitude, interp_amplitude);
      }
      fill(this.message_color);
      ellipse(0, 0, amplitude*.9, amplitude);
    }
    popMatrix();
  }
  
  void receive() {
    // int[] current_stanza = stanzas[this.stanza_iter];
    if (millis() - transmit_start < 1000) return;
    float progress = map(millis() - transmit_start - 1000, 0, TRANSMIT_MS, 0, 200);
    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rot);

    for (int i=0; i < floor(progress); i++) {
      rotate(0.1);
      if (this.rot != 0 && (this.search_angle > 6*PI/4 || this.search_angle < 4*PI/4)) continue;
      fill(this.message_color);
      ellipse(i/3, 0, 10, 10);
    }
    popMatrix();
  }
  
  void bootstrap_c() {
    pushMatrix();
    
    float bootstrap_progress = max(0, 1 - (BOOTSTRAP_C_MS - millis()) / float(BOOTSTRAP_C_MS));

    fill(255, 230, 210, 76*bootstrap_progress);
    arc(this.x, this.y, 200, 200, this.search_angle, this.search_angle+PI/6);
    
    popMatrix();
  }
  
  void search() {
    pushMatrix();
    this.search_angle += PI/72;
    fill(255, 230, 210, 76);
    arc(this.x, this.y, 200, 200, this.search_angle, this.search_angle+PI/6);
    popMatrix();
    
    if (this.search_angle >= 2*PI) this.search_angle = 0;
  }
  
  void reset() {
    this.ran = false;
  }
  
}
