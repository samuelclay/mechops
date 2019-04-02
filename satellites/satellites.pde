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

// Wavy Globals
int numRadii;
float theta;
float[] yvalues;
//float amplitude = 6.0;  // Height of wave
float dx;

public enum states {STATE_BOOTSTRAP_C, 
                    STATE_SEARCH_C, 
                    STATE_BOOTSTRAP_A,
                    STATE_TRANSMIT_A,
                    STATE_BOOTSTRAP_B,
                    STATE_TRANSMIT_A2B, 
                    STATE_TRANSMIT_B2A};
public enum transmit_states {STATE_TRANSMIT_FADE,
                             STATE_TRANSMIT_REST,
                             STATE_TRANSMIT_BOOTSTRAP,
                             STATE_TRANSMIT_BROADCAST};
states state;
transmit_states transmit_state;

int stanza_iter;
int search_c_start = 0;
int bootstrap_a_start = 0;
int transmit_a_start = 0;
int bootstrap_b_start = 0;
int transmit_ab_start = 0;

final int BOOTSTRAP_C_MS = 5 * 1000;
final int SEARCH_C_MS = 5 * 1000;
final int BOOTSTRAP_A_MS = 3 * 1000;
final int TRANSMIT_A_MS = 2 * 1000;
final int BOOTSTRAP_B_MS = 3 * 1000;
final int TRANSMIT_AB_MS = 3 * 1000;

final int TRANSMIT_REST_MS = 2 * 1000;
final int TRANSMIT_BOOTSTRAP_MS = 2 * 1000;
final int TRANSMIT_BROADCAST_MS = 2 * 1000;


void setup() {
  size(800, 800, P3D);
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
  numRadii = stanzas.length;
  theta = 0.0;
  yvalues = new float[numRadii+1];  // Using an array to store height values for each radius
  dx = 1; // sets the interval

  c1 = new Dish(x1, y1);
  c2 = new Dish(x2, y2);
  c3 = new Dish(x3, y3);
  c3.set_rotatation(PI/6);
  c1.set_color(color(26,137,175,100));
  
  state = states.STATE_TRANSMIT_A2B;
  transmit_state = transmit_states.STATE_TRANSMIT_REST;
  //println(" ---> State:", state);
  transmit_ab_start = millis();
}

void draw() {
  background(0);
  lights();
  translate(width / 2, height / 2);
  rotateZ(map(mouseY, 0, height, 0, -PI));
  rotateX(map(mouseX, 0, width, 0, -PI));
  noStroke();
  //fill(255, 255, 255);
  //translate(0, -40, 0);
  
  runState();

  transitionState();
}

void runState() {
  if (state == states.STATE_BOOTSTRAP_C) {
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
  if (state == states.STATE_BOOTSTRAP_C && 
      millis() > BOOTSTRAP_C_MS) {
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
    transmit_a_start = millis();
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
      c1.set_color(color(183,78,28,45));
      c2.set_color(color(183,78,28,100));
      c3.set_color(color(183,78,28,25));
      state = states.STATE_TRANSMIT_B2A;
      println(" ---> State:", state);
    } else if (state == states.STATE_TRANSMIT_B2A) {
      c1.set_color(color(26,137,175,100));
      c2.set_color(color(26,137,175,45));
      c3.set_color(color(26,137,175,25));
      state = states.STATE_TRANSMIT_A2B;
      println(" ---> State:", state);
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
    if (millis() - transmit_ab_start > TRANSMIT_AB_MS) return;
    
    float progress = map(millis() - transmit_ab_start, 0, TRANSMIT_AB_MS, 0, 1);
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
      //fill(this.message_color);
      //ellipse(0, 0, amplitude*.9, amplitude);
      calcWave();
      drawSatellite(100, 5, 5, 32, numRadii);
    }
    popMatrix();
  }
  
  void receive() {
    // int[] current_stanza = stanzas[this.stanza_iter];
    if (millis() - transmit_ab_start < 1000) return;
    float progress = map(millis() - transmit_ab_start - 1000, 0, TRANSMIT_AB_MS, 0, 200);

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
      //noFill();
      fill(this.message_color);
      ellipse(0, 0, amplitude*.9, amplitude);
    }
    popMatrix();
  }
  
  void bootstrap_c() {
    float bootstrap_progress = max(0, 1 - (BOOTSTRAP_C_MS - millis()) / float(BOOTSTRAP_C_MS));

    pushMatrix();

    translate(this.x, this.y);
    scale(0.9, 1);
    
    fill(255, 230, 210, 76*bootstrap_progress);
    arc(0, 0, 200, 200, this.search_angle, this.search_angle+PI/6);
    
    popMatrix();
  }
  
  void bootstrap_a() {
    float progress = min(1, (millis() - bootstrap_a_start) / float(BOOTSTRAP_A_MS));

    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rot);
    scale(0.9, 1);

    for (int i=0; i < floor(350*progress); i++) {
      rotate(0.1);
      fill(26, 137, 175, 255);
      ellipse(i/6, 0, 10, 10);
    }
    
    popMatrix();
  }
  
  void bootstrap_b() {
    float progress = min(1, (millis() - bootstrap_b_start) / float(BOOTSTRAP_B_MS));

    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rot);
    scale(0.9, 1);

    for (int i=0; i < floor(350*progress); i++) {
      rotate(0.1);
      fill(183,78,28,255);
      ellipse(i/6, 0, 10, 10);
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
    scale(0.9, 1);
    
    fill(255, 230, 210, 76);
    arc(0, 0, 200, 200, this.search_angle, this.search_angle+PI/6);
    
    popMatrix();
    
    if (this.search_angle >= 2*PI) this.search_angle = 0;
  }
  
  void reset() {
    this.ran = false;
  }
  
  void calcWave() {
    // Increment theta (try different values for 'angular velocity' here
    theta += 0.05;
  
    // For every x value, calculate a y value with sine function
    float x = theta;
    for (int i = 0; i < stanzas.length; i++) {
      for (int j = 0; j < stanzas[i].length; j++) {
      //yvalues[i] = sin(x)*amplitude;
      yvalues[i] = stanzas[i][j];
      x+=dx;
      }
    }
    println(yvalues);
  }

  void drawSatellite(float topRadius, float bottomRadius, float tall, int sides, int strips) {
    float angle = 0;
    float angleIncrement = TWO_PI / sides;
    float radiusIncrement = (topRadius - bottomRadius)/strips; 
    float curRadius = topRadius;
    float nextRadius = topRadius - radiusIncrement;
    float stripHeight = tall/strips; 
    
    for (int j = 0; j < strips; j++){
      beginShape(QUAD_STRIP);
      angle = 0;
      for (int i = 0; i < sides + 1; ++i) {
        vertex(curRadius*cos(angle), (j*stripHeight)+yvalues[j], curRadius*sin(angle));
        vertex(nextRadius*cos(angle), ((j+1)*stripHeight)+yvalues[j+1], nextRadius*sin(angle));
        angle += angleIncrement;
      }
      endShape();
      curRadius = nextRadius;
      nextRadius -= radiusIncrement;
    }
    
    // Draw the circular bottom cap
    if (bottomRadius != 0) {
      angle = 0;
      beginShape(TRIANGLE_FAN);
      // Center point
      vertex(0, tall, 0);
      for (int i = 0; i < sides + 1; i++) {
        vertex(bottomRadius * cos(angle), ((strips)*stripHeight)+yvalues[strips], bottomRadius * sin(angle));
        angle += angleIncrement;
      }
      endShape();
    }
  }
}
