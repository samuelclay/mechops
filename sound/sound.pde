import ddf.minim.analysis.*;
import ddf.minim.*; 

Minim       minim;
AudioPlayer timothy;
FFT         fft;
int bands = 512;
float[] spectrum = new float[bands];

void setup()
{  
        size(512, 512);
        
        minim = new Minim(this);
        
        timothy = minim.loadFile("Timothy1.mp3", 1024);        
        //timothy.play();
        //println(timothy.sampleRate());
        fft = new FFT( timothy.bufferSize(), timothy.sampleRate() );
        fft.linAverages(128);
}


void draw()
{  

  fft.forward( timothy.mix );
          
  //timothy.rewind();
  for(int j = 0; j < fft.avgSize(); j++) {
    print(j, ": ");
    for (int i=0; i<=timothy.length(); i+=1000) {
        timothy.rewind();
        timothy.skip(i);
        //println("\nFreq:\t", j);          
        print(fft.getBand(j), ", ");                                                  
        print(int(map(fft.getBand(j), 0, 1, 0, 255)), ", ");                                                  
    }  
    println();
  }  
  
  exit();
}
