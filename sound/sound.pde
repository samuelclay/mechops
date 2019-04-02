import ddf.minim.analysis.*;
import ddf.minim.*; 

Minim       minim;
AudioPlayer timothy;
FFT         fft;


void setup()
{  
        size(512, 512, P3D);
        
        minim = new Minim(this);
        
        timothy = minim.loadFile("Timothy1.mp3", 1024);        
        timothy.play();
             
        fft = new FFT( timothy.bufferSize(), timothy.sampleRate() );
                
}


void draw()
{  

  fft.forward( timothy.mix );
  
          
  //timothy.rewind();
  for (int i=0; i<timothy.length(); i+=1000) {  
      println("\nPosition:" , timothy.position()); 
      for(int j = 0; j < fft.specSize()-1; j+=32) {
        timothy.cue(i);
        println("\nFreq:\t", j);          
        print(fft.getBand(j)*100, ",");                                                  
    }  
    println();
  }  
  
}
























/*void draw()
{  

  fft.forward( timothy.mix );
        
  //timothy.rewind();
  for(int j = 0; j < fft.specSize()-1; j+=32) {   
      println("\nFreq:\t", j);
      for (int i=0; i<timothy.length(); i+=1000) {
        timothy.cue(i);
        println("\nPosition:" , timothy.position());          
        print(fft.getBand(i)*100, ",");                                                  
    }  
    println();
  }  
  exit();
  
}*/
