int x1, x2, x3, y1, y2, y3;
Dish c1, c2, c3;

int[][] stanzas = {
  {10, 20, 20, 90, 90, 10, 20, 20, 90},  // 40 khz
  {90, 90, 10, 10, 90, 90, 90, 10, 10}, // 35 khz
  {30, 40, 50, 90, 90, 30, 40, 50, 90},  // 30 khz
  {90, 90, 10, 10, 90, 90, 90, 10, 10}, // 25 khz
  {60, 30, 10, 90, 90, 60, 30, 10, 90},  // 20 khz
  {90, 90, 10, 10, 90, 90, 90, 10, 10}, // 15 khz
  {10, 30, 50, 90, 90, 10, 30, 50, 90},  // 10 khz
  {90, 90, 70, 10, 90, 90, 90, 70, 10}, // 5 khz
  {10, 20, 50, 90, 90, 10, 20, 50, 90},  // 1 khz
  {90, 90, 10, 10, 90, 90, 90, 10, 10}, // 500 hz
  {10, 90, 10, 10, 90, 10, 90, 10, 10}, // 100 hz
  {90, 90, 10, 10, 90, 90, 90, 10, 10}  // 50 hz
};

// Wavy Globals
int numRadii;
float theta;
float[] yvalues;
//float amplitude = 6.0;  // Height of wave
float dx;

public enum states {STATE_BOOTSTRAP_OUTLINE,
                    STATE_BOOTSTRAP_C, 
                    STATE_SEARCH_C, 
                    STATE_BOOTSTRAP_A,
                    STATE_TRANSMIT_A,
                    STATE_BOOTSTRAP_B,
                    STATE_TRANSMIT_A2B, 
                    STATE_TRANSMIT_B2A};
states state = states.STATE_BOOTSTRAP_OUTLINE;

int stanza_iter;
int bootstrap_c_start = 0;
int search_c_start = 0;
int bootstrap_a_start = 0;
int transmit_a_start = 0;
int bootstrap_b_start = 0;
int transmit_ab_start = 0;

final int BOOTSTRAP_OUTLINE_MS = 3 * 1000;
final int BOOTSTRAP_C_MS = 5 * 1000;
final int SEARCH_C_MS = 5 * 1000;
final int BOOTSTRAP_A_MS = 5 * 1000;
final int TRANSMIT_A_MS = 2 * 1000;
final int BOOTSTRAP_B_MS = 10 * 1000;
final int TRANSMIT_AB_MS = 10 * 1000;
final int TRANSMIT_BOOTSTRAP_MS = 1 * 1000;


void setup() {
  // size(800, 800, P3D);
  fullScreen(2);
  smooth();
  background(0);
  rectMode(CENTER);
  
  x1 = width/4;
  x2 = width - x1*2;
  x3 = width - x1*2;
  y1 = height/4;
  y2 = height/4;
  y3 = height - y1;
  stanza_iter = 0;
  numRadii = stanzas.length;
  theta = 0.0;
  yvalues = new float[numRadii+1];  // Using an array to store height values for each radius
  dx = 1; // sets the interval

  c1 = new Dish(x1, y1);
  c2 = new Dish(x2, y2);
  c3 = new Dish(x3, y3);
  c3.set_rotatation(PI/6);
  c1.set_color(color(26,137,175,200));
  c2.set_color(color(26,137,175,55));
  c3.set_color(color(26,137,175,45));
  
  println(" ---> State:", state);
  transmit_ab_start = millis();
}

void draw() {
  background(0);
  noStroke();
  // rotateZ(map(mouseY, 0, height, 0, -PI));
  // rotateX(map(mouseX, 0, width, 0, -PI));
  // println("Z:", mouseY, " X:", mouseX);
  runState();

  transitionState();
}

void runState() {
  if (state == states.STATE_BOOTSTRAP_OUTLINE) {
    show_outlines();
  } else if (state == states.STATE_BOOTSTRAP_C) {
    c3.bootstrap_c();
  } else if (state == states.STATE_SEARCH_C) {
    c3.search();
  } else if (state == states.STATE_BOOTSTRAP_A) {
    c1.bootstrap_a();
    c3.search();
  } else if (state == states.STATE_TRANSMIT_A) {
    c1.transmit();
    c3.search();
  } else if (state == states.STATE_BOOTSTRAP_B) {
    c1.transmit();
    c2.bootstrap_b();
    c3.search();
  } else if (state == states.STATE_TRANSMIT_A2B) {
    c1.transmit();
    c2.receive(false);
    c3.receive(true);
    c3.search();    
  } else if (state == states.STATE_TRANSMIT_B2A) {
    c1.receive(false);
    c2.transmit();
    c3.receive(true);
    c3.search();    
  }
}

void transitionState() {
  // Switch states
  if (state == states.STATE_BOOTSTRAP_OUTLINE && 
      millis() > BOOTSTRAP_OUTLINE_MS) {
    state = states.STATE_BOOTSTRAP_C;
    bootstrap_c_start = millis();
  } else if (state == states.STATE_BOOTSTRAP_C && 
      millis() > bootstrap_c_start + BOOTSTRAP_C_MS) {
    search_c_start = millis();
    state = states.STATE_SEARCH_C;
    println(" ---> State:", state);
  } else if (state == states.STATE_SEARCH_C && 
             millis() > search_c_start + SEARCH_C_MS) {
    bootstrap_a_start = millis();
    state = states.STATE_BOOTSTRAP_A;
    println(" ---> State:", state);
  } else if (state == states.STATE_BOOTSTRAP_A && 
             millis() > bootstrap_a_start + BOOTSTRAP_A_MS) {
    transmit_ab_start = millis();
    state = states.STATE_TRANSMIT_A;
    println(" ---> State:", state);
  } else if (state == states.STATE_TRANSMIT_A && 
             millis() > transmit_a_start + TRANSMIT_A_MS) {
    bootstrap_b_start = millis();
    state = states.STATE_BOOTSTRAP_B;
    println(" ---> State:", state);
  } else if (state == states.STATE_BOOTSTRAP_B && 
             millis() > bootstrap_b_start + BOOTSTRAP_B_MS) {
    transmit_ab_start = millis();
    state = states.STATE_TRANSMIT_A2B;
    println(" ---> State:", state);
  } else if (millis() > transmit_ab_start + TRANSMIT_AB_MS + 1000) {
    transmit_ab_start = millis();
    if (state == states.STATE_TRANSMIT_A2B) {
      c1.set_color(color(183,78,28,55));
      c2.set_color(color(183,78,28,235));
      c3.set_color(color(183,78,28,45));
      state = states.STATE_TRANSMIT_B2A;
      println(" ---> State:", state);
    } else if (state == states.STATE_TRANSMIT_B2A) {
      c1.set_color(color(26,137,175,235));
      c2.set_color(color(26,137,175,55));
      c3.set_color(color(26,137,175,45));
      state = states.STATE_TRANSMIT_A2B;
      println(" ---> State:", state);
    }
  }
}

void show_outlines() {
  c1.outline();
  c2.outline();
  c3.outline();
}

class Dish {
  int x, y, diameter = 90;
  float transp = 1;
  float rot;
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
  
  void outline() {
    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rot);
    fill(255, 255, 255, 255);
    ellipse(0, 0, 100, 100);
    popMatrix();
  }
  
  void transmit() {
    // int[] current_stanza = stanzas[this.stanza_iter];
    // if (millis() - transmit_ab_start > TRANSMIT_AB_MS) return;
    
    float progress = map(millis() - transmit_ab_start, 0, TRANSMIT_AB_MS, 0, 1);
    float alpha_progress = min(1, map(millis() - transmit_ab_start, 0, TRANSMIT_BOOTSTRAP_MS, 0, 1));
    if (millis() - transmit_ab_start > TRANSMIT_AB_MS - TRANSMIT_BOOTSTRAP_MS) {
      alpha_progress = 1 - max(0, map(millis() - transmit_ab_start, TRANSMIT_AB_MS-TRANSMIT_BOOTSTRAP_MS, TRANSMIT_AB_MS, 0, 1));
    }
    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rot);
    int a = (this.message_color >> 24) & 0xFF;
    int r = (this.message_color >> 16) & 0xFF;
    int g = (this.message_color >> 8) & 0xFF;
    int b = this.message_color & 0xFF;
    // stroke(r/2, g/2, b/2, alpha_progress*a);
    // strokeWeight(1);
    
    for (int s=0; s < stanzas.length; s++) {
      float inner_alpha = map(stanzas.length - s, 0, stanzas.length, 0.1, 1);
      int[] stanza = stanzas[s];
      int current_stanza = int(min(stanza.length-1, floor(progress*stanza.length)));
      float stanza_progress = map(progress, 0, 1, 0, stanza.length) - current_stanza;
      int left_amplitude = stanza[current_stanza];
      int right_amplitude = stanza[min(stanza.length-1, current_stanza+1)];
      float interp_amplitude = left_amplitude;
      if (left_amplitude != right_amplitude) {
        interp_amplitude = map(stanza_progress, 0, 1, left_amplitude, right_amplitude);
      }
      float amplitude = s*9+interp_amplitude*.1;
      if (s==0) {
        // println(" ---> Amplitudes: ", current_stanza, stanza_progress, left_amplitude, right_amplitude, interp_amplitude);
      }
      fill(r, g, b, (inner_alpha)*alpha_progress*a);
      ellipse(0, 0, amplitude*.95, amplitude);
    }

    popMatrix();
  }
  
  void receive(boolean glitchy) {
    if (millis() - transmit_ab_start < 1000) return;
    
    float progress = map(millis() - transmit_ab_start, 0, TRANSMIT_AB_MS, 0, 1);
    float alpha_progress = min(1, map(millis() - transmit_ab_start - 1000, 0, TRANSMIT_BOOTSTRAP_MS, 0, 1));
    if (millis() - transmit_ab_start > TRANSMIT_AB_MS - TRANSMIT_BOOTSTRAP_MS) {
      alpha_progress = 1 - max(0, map(millis() - transmit_ab_start - 1000, TRANSMIT_AB_MS-TRANSMIT_BOOTSTRAP_MS, TRANSMIT_AB_MS, 0, 1));
    }
    int a = (this.message_color >> 24) & 0xFF;
    int r = (this.message_color >> 16) & 0xFF;
    int g = (this.message_color >> 8) & 0xFF;
    int b = this.message_color & 0xFF;

    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rot);
    stroke(r/2, g/2, b/2, alpha_progress*a);
    strokeWeight(2);
    
    for (int s=0; s < stanzas.length; s++) {
      int[] stanza = stanzas[s];
      float inner_alpha = map(stanzas.length - s, 0, stanzas.length, 0.1, 1);
      int current_stanza = int(min(stanza.length-1, floor(progress*stanza.length)));
      float stanza_progress = map(progress, 0, 1, 0, stanza.length) - current_stanza;
      int left_amplitude = stanza[current_stanza];
      int right_amplitude = stanza[min(stanza.length-1, current_stanza+1)];
      float interp_amplitude = left_amplitude;
      if (left_amplitude != right_amplitude) {
        interp_amplitude = map(stanza_progress, 0, 1, left_amplitude, right_amplitude);
      }
      float amplitude = s*9+interp_amplitude*.1;
      if (glitchy && random(1) > 0.9) amplitude *= random(0.1, 1);
      if (s==0) {
        // println(" ---> Amplitudes: ", current_stanza, stanza_progress, left_amplitude, right_amplitude, interp_amplitude);
      }
      //noFill();
      if (glitchy) {
        if (this.search_angle > 1.75*PI || this.search_angle < PI) continue;
      }
      fill(r, g, b, (1-inner_alpha)*alpha_progress*a);
      ellipse(0, 0, amplitude*.95, amplitude);
    }
    popMatrix();
  }
  
  void bootstrap_c() {
    float bootstrap_progress = min(1, (millis() - bootstrap_c_start) / float(BOOTSTRAP_C_MS));

    pushMatrix();

    translate(this.x, this.y);
    scale(0.95, 1);
    
    fill(255, 230, 210, 126*bootstrap_progress);
    arc(0, 0, 100, 100, this.search_angle, this.search_angle+PI/6);
    
    popMatrix();
  }
  
  void bootstrap_a() {
    float progress = min(1, (millis() - bootstrap_a_start) / float(BOOTSTRAP_A_MS));

    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rot);
    scale(0.95, 1);

    for (int i=0; i < floor(350*progress); i++) {
      rotate(0.08);
      fill(26, 137, 175, (1-progress)*0.5*255);
      ellipse(i/6, 0, 10, 10);
    }
    
    popMatrix();
  }
  
  void bootstrap_b() {
    float progress = min(1, (millis() - bootstrap_b_start) / float(BOOTSTRAP_B_MS));

    pushMatrix();
    noStroke();
    translate(this.x, this.y);
    rotate(this.rot);
    scale(0.95, 1);

    for (int i=0; i < floor(350*progress); i++) {
      rotate(0.08);
      fill(183,78,28,(1-progress)*0.5*255);
      ellipse(i/8, 0, 10, 10);
    }
    
    popMatrix();
  }
  
  void search() {
    pushMatrix();
    float search_bootstrap_progress = 1;
    if (state == states.STATE_SEARCH_C) {
      search_bootstrap_progress = min(1, (millis() - search_c_start) / float(SEARCH_C_MS));
    }
    this.search_angle += search_bootstrap_progress * PI/72;
    
    translate(this.x, this.y);
    scale(0.95, 1);
    
    fill(255, 230, 210, 126);
    arc(0, 0, 100, 100, this.search_angle, this.search_angle+PI/6);
    
    popMatrix();
    
    if (this.search_angle >= 2*PI) this.search_angle = 0;
  }
  
}
