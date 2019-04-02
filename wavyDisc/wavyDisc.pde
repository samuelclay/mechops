int numRadii = 8;
float theta = 0.0;
float[] yvalues;
float amplitude = 6.0;  // Height of wave
float dx; 

void setup() {
  size(640, 360, P3D);
  yvalues = new float[numRadii+1];  // Using an array to store height values for each radius
  dx = 1; // sets the interval
}

void draw() {
  background(0);
  lights();
  translate(width / 2, height / 2);
  rotateZ(map(mouseY, 0, height, 0, -PI));
  rotateX(map(mouseX, 0, width, 0, -PI));
  noStroke();
  fill(255, 255, 255);
  translate(0, -40, 0);
  calcWave();
  drawSatellite(210, 10, 50, 32, numRadii);
}

void calcWave() {
  // Increment theta (try different values for 'angular velocity' here
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  float x = theta;
  for (int i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x)*amplitude;
    x+=dx;
  }
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
