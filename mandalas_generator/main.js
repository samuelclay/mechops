var WIDTH=500,
    preheader="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n",
    header="<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\""+WIDTH+"px\" height=\""+WIDTH+"px\" viewBox=\"0 0 "+WIDTH+" "+WIDTH+"\" enable-background=\"new 0 0 "+WIDTH+" "+WIDTH+"\" xml:space=\"preserve\">\n",
    footer="</svg>",
    REP=1,
    colored=false,
    color="000",
    d1=[],
    d2=[],
    d3=[],
    d4=[],
    RAD=WIDTH/2,
    container=document.getElementById("container"),
    mandala="";
    var freqSlider = document.getElementById("range-freq");
    var freqText = document.getElementById("freq");
    var amplitudeSlider = document.getElementById("range-amplitude");
    var amplitudeText = document.getElementById("amplitude");
    var h1Slider = document.getElementById("range-h1");
    var h1Text = document.getElementById("h1");
    var h2Slider = document.getElementById("range-h2");
    var h2Text = document.getElementById("h2");
    var h3Slider = document.getElementById("range-h3");
    var h3Text = document.getElementById("h3");
    var h4Slider = document.getElementById("range-h4");
    var h4Text = document.getElementById("h4");
    var j1Slider = document.getElementById("range-j1");
    var j1Text = document.getElementById("j1");
    var j2Slider = document.getElementById("range-j2");
    var j2Text = document.getElementById("j2");
    var j3Slider = document.getElementById("range-j3");
    var j3Text = document.getElementById("j3");
    var j4Slider = document.getElementById("range-j4");
    var j4Text = document.getElementById("j4");

function handleRange() {
  freqSlider.oninput = function() {
    freqText.innerText = this.value;
    generate();
  };
  amplitudeSlider.oninput = function() {
    amplitudeText.innerText = this.value;
    generate();
  };

  h1Slider.oninput = function() {
    h1Text.innerText = this.value;
    generate();
  };
  h2Slider.oninput = function() {
    h2Text.innerText = this.value;
    generate();
  };
  h3Slider.oninput = function() {
    h3Text.innerText = this.value;
    generate();
  };
  h4Slider.oninput = function() {
    h4Text.innerText = this.value;
    generate();
  };
  j1Slider.oninput = function() {
    j1Text.innerText = this.value;
    generate();
  };
  j2Slider.oninput = function() {
    j2Text.innerText = this.value;
    generate();
  };
  j3Slider.oninput = function() {
    j3Text.innerText = this.value;
    generate();
  };
  j4Slider.oninput = function() {
    j4Text.innerText = this.value;
    generate();
  };
}

handleRange(); 

const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function randomize() {
  h1Slider.value = scale(Math.random(), 0, 1, 0, 100);
  h1Text.innerText = h1Slider.value;
  h2Slider.value = scale(Math.random(), 0, 1, 0, 100);
  h2Text.innerText = h2Slider.value;
  h3Slider.value = scale(Math.random(), 0, 1, 0, 100);
  h3Text.innerText = h3Slider.value;
  h4Slider.value = scale(Math.random(), 0, 1, 0, 100);
  h4Text.innerText = h4Slider.value;
  j1Slider.value = scale(Math.random(), 0, 1, 0, 100);
  j1Text.innerText = j1Slider.value;
  j2Slider.value = scale(Math.random(), 0, 1, 0, 100);
  j2Text.innerText = j2Slider.value;
  j3Slider.value = scale(Math.random(), 0, 1, 0, 100);
  j3Text.innerText = j3Slider.value;
  j4Slider.value = scale(Math.random(), 0, 1, 0, 100);
  j4Text.innerText = j4Slider.value;
  
  generate();
}

function generate(){
    mandala=header;
    const freq = Math.min(scale(parseInt(freqText.innerText, 10), 20, 2000, 0.35, 1), 1);
    const amplitude = Math.min(scale(parseInt(amplitudeText.innerText, 10), 0, 100, 0, 1), 1);
    // var h1 = scale(Math.random(), 0, 1, 0.1, 0.11);
    // var h2 = scale(Math.random(), 0, 1, 0.49, 0.5);
    // var h3 = scale(Math.random(), 0, 1, 0.69, 0.7);
    // var h4 = scale(Math.random(), 0, 1, 0.89, 0.9);
    var h1 = scale(freq, 0, 1, 0.1, .3)*scale(parseInt(h1Text.innerText, 10), 0, 100, 0, 1);
    var h2 = scale(amplitude, 0, 1, 0.5, 1)*scale(parseInt(h2Text.innerText, 10), 0, 100, 0, 1);
    var h3 = scale(amplitude, 0, 1, 0.5, 1)*scale(parseInt(h3Text.innerText, 10), 0, 100, 0, 1);
    var h4 = scale(amplitude, 0, 1, 0.5, 1)*scale(parseInt(h4Text.innerText, 10), 0, 100, 0, 1);
    var j1 = scale(freq, 0, 1, 0.25, 2)*scale(parseInt(j1Text.innerText, 10), 0, 100, 0, 1);
    var j2 = scale(1, 0, 1, 0.1, 1)*scale(parseInt(j2Text.innerText, 10), 0, 100, 0, 1);
    var j3 = scale(1, 0, 1, 0.1, 1)*scale(parseInt(j3Text.innerText, 10), 0, 100, 0, 1);
    var j4 = scale(amplitude, 0, 1, 0.25, 1)*scale(parseInt(j4Text.innerText, 10), 0, 100, 0, 1);
    
    console.log(['Freq', freq, h1, h2, h3, h4]);
    for(i=0; i<REP; ++i)
    {
    	d1[i]=h1*RAD;
    	d2[i]=h2*RAD;
    	d3[i]=h3*RAD;
    	d4[i]=h4*RAD;
    }

    d1.sort().reverse();
    d4.sort().reverse();

    for(i=0; i<REP; ++i)
    {
	var curang=0,
      ang=Math.PI/(1<<(Math.floor(freq*3)+2));
	if(colored)
	{
	    color=Math.floor(Math.random()*16777216).toString(16);
	}
	while(curang<2*Math.PI)
	{
      mandala+=("<path d=\"M "+(RAD+d1[i]*Math.cos(curang))+","+(RAD+d1[i]*Math.sin(curang))+" C "+(RAD+d2[i]*Math.cos(curang))+","+(RAD+d2[i]*Math.sin(curang))+" "+(RAD+d3[i]*Math.cos(curang+ang))+","+(RAD+d3[i]*Math.sin(curang+ang))+" "+(RAD+d4[i]*Math.cos(curang+ang))+" "+(RAD+d4[i]*Math.sin(curang+ang))+" Z\" stroke=\"black\" fill=\"#"+color+"\" stroke-width=\"2\" />\n");
	    curang+=ang;
      mandala+=("<path d=\"M "+(RAD+d1[i]*Math.cos(curang+ang))+","+(RAD+d1[i]*Math.sin(curang+ang))+" C "+(RAD+d2[i]*Math.cos(curang+ang))+","+(RAD+d2[i]*Math.sin(curang+ang))+" "+(RAD+d3[i]*Math.cos(curang))+","+(RAD+d3[i]*Math.sin(curang))+" "+(RAD+d4[i]*Math.cos(curang))+" "+(RAD+d4[i]*Math.sin(curang))+" Z\" stroke=\"black\" fill=\"#"+color+"\" stroke-width=\"2\" />\n");
	    curang+=ang;
	}
    }

    REP=1;
    // var h1 = scale(Math.random(), 0, 1, 0.9, 0.9);
    // var h2 = scale(Math.random(), 0, 1, 0.3, 0.5);
    // var h3 = scale(Math.random(), 0, 1, 0.5, 0.7);
    // var h4 = scale(Math.random(), 0, 1, 0.7, 0.9);
    console.log(['Freq', freq, j1, j2, j3, j4]);
    for(i=0; i<REP; ++i)
    {
    	d1[i]=j1*RAD;
    	d2[i]=j2*RAD;
    	d3[i]=j3*RAD;
    	d4[i]=j4*RAD;
    }

    d1.sort().reverse();
    d2.sort().reverse();
    d3.sort().reverse();
    d4.sort().reverse();

    for(i=0; i<REP; ++i)
    {
	curang=0;
	ang=Math.PI/(1<<(Math.floor(.5*3)+3));
	if(colored)
	{
	    color=Math.floor(Math.random()*16777216).toString(16);
	}
	while(curang<2*Math.PI)
	{
      mandala+=("<path d=\"M "+(RAD+d1[i]*Math.cos(curang))+","+(RAD+d1[i]*Math.sin(curang))+" C "+(RAD+d2[i]*Math.cos(curang+ang))+","+(RAD+d2[i]*Math.sin(curang+ang))+" "+(RAD+d3[i]*Math.cos(curang+ang))+","+(RAD+d3[i]*Math.sin(curang+ang))+" "+(RAD+d4[i]*Math.cos(curang))+" "+(RAD+d4[i]*Math.sin(curang))+" Z\" stroke=\"black\" fill=\"#"+color+"\" stroke-width=\"2\" />\n");
	    curang+=ang;
      mandala+=("<path d=\"M "+(RAD+d1[i]*Math.cos(curang+ang))+","+(RAD+d1[i]*Math.sin(curang+ang))+" C "+(RAD+d2[i]*Math.cos(curang))+","+(RAD+d2[i]*Math.sin(curang))+" "+(RAD+d3[i]*Math.cos(curang))+","+(RAD+d3[i]*Math.sin(curang))+" "+(RAD+d4[i]*Math.cos(curang+ang))+" "+(RAD+d4[i]*Math.sin(curang+ang))+" Z\" stroke=\"black\" fill=\"#"+color+"\" stroke-width=\"2\" />\n");
	    curang+=ang;
	}
    }

    mandala+=footer;
    container.innerHTML=mandala;
    var a=document.getElementById("download");
    a.href = window.URL.createObjectURL(new Blob([preheader+mandala], {type: 'image/svg'}));
    a.download = "mandala-"+freqText.innerText.padStart(5, '0')+"-"+amplitudeText.innerText.padStart(3, '0')+".svg";
    a.onclick = advance;
}

var position = 0;
var lastFreqAmplitude = [];
var frequencies = [
[0, 4],
[0, 4],
[0, 4],
[0, 4],
[0, 4],
[86, 12],
[108, 4],
[108, 4],
[108, 4],
[108, 20],
[108, 4],
[108, 4],
[108, 4],
[108, 12],
[108, 4],
[65, 27],
[65, 12],
[65, 20],
[65, 4],
[65, 4],
[65, 12],
[86, 4],
[86, 20],
[86, 12],
[108, 27],
[108, 4],
[108, 4],
[108, 12],
[108, 4],
[108, 4],
[108, 4],
[129, 27],
[129, 4],
[129, 35],
[129, 12],
[129, 20],
[129, 4],
[129, 4],
[129, 12],
[129, 4],
[129, 12],
[129, 12],
[129, 12],
[172, 12],
[108, 35],
[108, 35],
[108, 35],
[108, 20],
[108, 27],
[108, 51],
[108, 27],
[108, 27],
[108, 35],
[108, 27],
[129, 43],
[129, 27],
[129, 51],
[108, 27],
[108, 4],
[108, 20],
[108, 35],
[129, 27],
[129, 35],
[108, 35],
[108, 27],
[108, 27],
[108, 27],
[108, 27],
[108, 35],
[108, 27],
[129, 35],
[151, 27],
[129, 27],
[129, 35],
[129, 20],
[129, 27],
[129, 4],
[108, 20],
[108, 27],
[108, 35],
[280, 51],
[108, 67],
[108, 12],
[108, 35],
[108, 35],
[108, 27],
[108, 43],
[108, 35],
[151, 67],
[151, 35],
[151, 20],
[1272, 43],
[1272, 67],
[1272, 75],
[1272, 20],
[108, 43],
[108, 12],
[108, 27],
[151, 35],
[151, 27],
[108, 35],
[108, 20],
[129, 59],
[194, 27],
[1056, 20],
[108, 27],
[108, 20],
[151, 43],
[151, 35],
[129, 59],
[129, 20],
[129, 20],
[129, 20],
[129, 4],
[151, 20],
[129, 27],
[151, 35],
[280, 43],
[108, 75],
[108, 43],
[108, 51],
[108, 4],
[108, 27],
[108, 35],
[108, 27],
[129, 35],
[151, 27],
[129, 51],
[129, 27],
[194, 67],
[194, 27],
[194, 20],
[129, 20],
[129, 35],
[151, 27],
[151, 35],
[129, 27],
[129, 35],
[129, 51],
[108, 20],
[108, 43],
[108, 27],
[108, 27],
[108, 35],
[129, 27],
[129, 43],
[129, 27],
[129, 35],
[129, 12],
[108, 43],
[108, 12],
[108, 4],
[108, 43],
[108, 27],
[108, 43],
[108, 51],
[108, 35],
[884, 35],
[884, 43],
[841, 51],
[517, 51],
[280, 27],
[108, 27],
[108, 43],
[1272, 43],
[1272, 51],
[1272, 35],
[108, 43],
[108, 20],
[108, 20],
[108, 27],
[129, 20],
[129, 35],
[151, 27],
[151, 43],
[172, 43],
[172, 59],
[86, 27],
[86, 20],
[86, 43],
[86, 27],
[86, 27],
[86, 43],
[86, 27],
[151, 27],
[86, 43],
[86, 20],
[86, 12],
[86, 12],
[108, 20],
[108, 20],
[108, 12],
[108, 20],
[108, 20],
[108, 27],
[108, 20],
[108, 20],
[604, 20],
[108, 27],
[108, 27],
[302, 43],
[129, 35],
[216, 20],
[86, 43],
[86, 27],
[108, 20],
[108, 12],
[108, 20],
[108, 27],
[108, 20],
[129, 27],
[129, 4],
[86, 27],
[108, 27],
[108, 12]
];
var scaledFreq = [];

function advance() {
  while (1) {
    position += 1;
    if (position >= frequencies.length) {
      console.log(['Done', scaledFreq]);
      break;
    }

    var freq = (""+Math.round(scale(frequencies[position][0], 0, 1500, 1, 20000))).padStart(5, '0');
    var amplitude = (""+Math.round(scale(frequencies[position][1], 0, 50, 1, 100))).padStart(3, '0');
    
    scaledFreq.push([freq, amplitude]);
    
    if (_.contains(lastFreqAmplitude, freq+"-"+amplitude))
      continue;
    
    lastFreqAmplitude.push(freq+"-"+amplitude);
    freqSlider.value = freq;
    freqText.innerText = freq;
    amplitudeSlider.value = amplitude;
    amplitudeText.innerText = amplitude;
    generate();
    break;
  }
}

function toggleColor()
{
    if(colored)
	colored=false;
    else
	colored=true;
    color="ffffff";
    generate();
}


function exportImage()
{
	var canvas = document.createElement( 'canvas' );
	canvas.width = WIDTH;
	canvas.height = WIDTH;

	var ctx = canvas.getContext( '2d' );

	ctx.clearRect( 0, 0, WIDTH, WIDTH );

	ctx.beginPath();
	ctx.fillStyle = "#000";
	ctx.rect( 0, 0, WIDTH, WIDTH );
	ctx.fill();
  var _mainCanvas = $( '<canvas/>' ).css( { "position": "absolute", "top": 0, "left": 0 } );
  $("body").append(_mainCanvas);
	ctx.drawImage( _mainCanvas[0], 0, 0 );

	var img = canvas.toDataURL( "image/png" );
	var w = window.open( 'about:blank', 'image from canvas' );

	window.document.write(
			"<span style='display:block; text-align:center'>Right click on image to save.</span>" +
			"<img src='" + img + "'/>"
	);
}

generate();
// exportImage();
