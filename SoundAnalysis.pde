import ddf.minim.analysis.*;
import ddf.minim.*;
import ddf.minim.spi.*;
import ddf.minim.signals.*;
import ddf.minim.ugens.*;
import ddf.minim.effects.*;

Minim       minim;
AudioPlayer timothy;
FFT         fft;



void setup()
{
  size(512, 512, P3D);
  
  minim = new Minim(this);
  

  timothy = minim.loadFile("Timothy1.mp3", 1024);
  timothy.loop();
  
  fft = new FFT( timothy.bufferSize(), timothy.sampleRate() );
  
}


void draw()
{
  background(0);
  stroke(255);
  

  fft.forward( timothy.mix );
  
  for(int i = 0; i < fft.specSize(); i++)            //FFT
  {
    line( i, height, i, height - fft.getBand(i)*12 );
  } 
  
  
  for(int j =0; j< timothy.bufferSize(); j+=64 ){   // to get 16 values (1024/64)    
    
    float freq = fft.getBand(j)*100;               // this gets the frequency
    ellipse(256, 400, freq, freq);                 // frequency visualized
        
    float volume = timothy.right.level()*1000;      // this gets the volume 
    ellipse(256, 200, volume, volume);             // volume visualized
    
    println(volume/1000);       // don't know how to get them 
    println(freq/100);          // to print as a 2D array
  
  }   
}
