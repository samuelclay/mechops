let mic, fft;
var timestamp = 0;
let volumes = []; 
let frequencies = [];

function setup() {
  createCanvas(710, 400);
  noFill();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(200);

  let spectrum = fft.analyze();

  beginShape();
  for (i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0));
  }
  endShape();

  var waveform = fft.waveform();
  beginShape();
  stroke(255,0,0); // waveform is red
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();
  
  var volume = 0;
  for (var i = 0; i< waveform.length; i++){
    if(volume < Math.abs(waveform[i])) {
      volume = Math.abs(waveform[i]);
    }
  }
  print('volume : ' + volume);
  
  var HzPerBin = 44100 / waveform.length;
  var imax = 5;
  for (var i = 5; i < spectrum.length; ++i){
    if (spectrum[imax] < spectrum [i]) imax = i;
  }
  var hzMax = imax * HzPerBin;
  print ('hzMax : ' + hzMax);
  

  
  if (millis() - timestamp >=500) {
    timestamp = millis();
    volumes.push(volume);
    frequencies.push(hzMax);
  }
  

  
  if (millis() >= 3500){
    console.log('volumes: ' + volumes);
    console.log('frequencies: ' + frequencies);
    exit();
  }
  
  
}