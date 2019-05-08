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
    const amplitude = Math.min(scale(parseInt(amplitudeText.innerText, 10), 0, 100, 0.25, 1), 1);
    // var h1 = scale(Math.random(), 0, 1, 0.1, 0.11);
    // var h2 = scale(Math.random(), 0, 1, 0.49, 0.5);
    // var h3 = scale(Math.random(), 0, 1, 0.69, 0.7);
    // var h4 = scale(Math.random(), 0, 1, 0.89, 0.9);
    var h1 = scale(amplitude, 0, 1, 0.90, 0.05)*scale(parseInt(h1Text.innerText, 10), 0, 100, 0, 1);
    var h2 = scale(amplitude, 0, 1, 1, 1)*scale(parseInt(h2Text.innerText, 10), 0, 100, 0, 1);
    var h3 = scale(amplitude, 0, 1, 1, 1)*scale(parseInt(h3Text.innerText, 10), 0, 100, 0, 1);
    var h4 = scale(amplitude, 0, 1, 1, 1)*scale(parseInt(h4Text.innerText, 10), 0, 100, 0, 1);
    var j1 = scale(amplitude, 0, 1, 0.70, 1)*scale(parseInt(j1Text.innerText, 10), 0, 100, 0, 1);
    var j2 = scale(1, 0, 1, 1, 1)*scale(parseInt(j2Text.innerText, 10), 0, 100, 0, 1);
    var j3 = scale(1, 0, 1, 1, 1)*scale(parseInt(j3Text.innerText, 10), 0, 100, 0, 1);
    var j4 = scale(amplitude, 0, 1, 1, 1)*scale(parseInt(j4Text.innerText, 10), 0, 100, 0, 1);
    
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
[108, 20],
[108, 12],
[108, 4],
[108, 4],
[108, 4],
[108, 4],
[108, 4],
[108, 4],
[86, 4],
[65, 4],
[65, 4],
[108, 20],
[108, 20],
[108, 4],
[108, 4],
[108, 4],
[108, 4],
[108, 4],
[108, 4],
[108, 4],
[474, 4],
[43, 4],
[2285, 12],
[108, 12],
[108, 4],
[108, 12],
[108, 4],
[108, 4],
[65, 27],
[65, 20],
[65, 20],
[65, 12],
[65, 12],
[65, 4],
[86, 12],
[108, 4],
[108, 4],
[108, 4],
[108, 4],
[86, 20],
[86, 20],
[86, 12],
[86, 12],
[86, 12],
[86, 4],
[86, 20],
[86, 20],
[86, 12],
[86, 12],
[86, 4],
[86, 4],
[108, 27],
[108, 12],
[108, 4],
[108, 4],
[108, 4],
[86, 27],
[108, 12],
[108, 4],
[108, 4],
[108, 4],
[108, 4],
[108, 4],
[108, 4],
[108, 4],
[108, 4],
[108, 4],
[129, 20],
[129, 4],
[129, 4],
[129, 4],
[65, 4],
[129, 35],
[129, 20],
[129, 4],
[129, 12],
[129, 4],
[129, 4],
[3794, 12],
[129, 4],
[129, 4],
[129, 4],
[129, 4],
[129, 27],
[129, 20],
[129, 4],
[129, 4],
[129, 4],
[388, 12],
[108, 12],
[86, 12],
[108, 20],
[237, 12],
[237, 12],
[237, 12],
[172, 12],
[172, 12],
[172, 12],
[172, 12],
[172, 27],
[108, 43],
[108, 27],
[108, 27],
[1186, 27],
[1186, 43],
[1186, 35],
[194, 27],
[1056, 20],
[1056, 27],
[1121, 27],
[1121, 27],
[1121, 27],
[108, 43],
[108, 43],
[108, 27],
[798, 27],
[539, 27],
[151, 43],
[151, 27],
[151, 35],
[151, 27],
[539, 27],
[539, 35],
[129, 43],
[129, 27],
[129, 27],
[539, 35],
[345, 35],
[108, 51],
[108, 35],
[108, 20],
[108, 12],
[108, 4],
[86, 20],
[108, 51],
[86, 20],
[108, 20],
[151, 27],
[539, 35],
[539, 12],
[151, 27],
[151, 27],
[151, 20],
[1250, 27],
[1250, 35],
[108, 51],
[108, 27],
[108, 12],
[129, 35],
[1272, 51],
[560, 27],
[194, 27],
[841, 27],
[625, 27],
[948, 27],
[1272, 27],
[108, 51],
[108, 35],
[108, 27],
[108, 20],
[798, 27],
[539, 35],
[151, 43],
[151, 35],
[151, 27],
[539, 27],
[129, 35],
[129, 35],
[129, 27],
[129, 20],
[129, 27],
[129, 20],
[108, 35],
[108, 35],
[108, 12],
[108, 12],
[86, 4],
[108, 12],
[86, 51],
[86, 20],
[108, 12],
[151, 27],
[819, 27],
[539, 12],
[345, 35],
[884, 35],
[884, 43],
[474, 43],
[474, 51],
[108, 67],
[108, 51],
[108, 43],
[108, 43],
[841, 35],
[194, 27],
[194, 51],
[905, 35],
[905, 27],
[884, 35],
[884, 27],
[108, 51],
[108, 43],
[539, 43],
[151, 43],
[841, 43],
[841, 20],
[151, 67],
[151, 59],
[151, 27],
[841, 43],
[862, 51],
[259, 51],
[129, 51],
[1272, 43],
[1272, 43],
[1272, 59],
[1272, 59],
[1272, 59],
[1272, 67],
[1272, 51],
[625, 20],
[1121, 35],
[366, 20],
[108, 43],
[108, 43],
[108, 20],
[474, 27],
[841, 27],
[841, 12],
[151, 35],
[151, 27],
[151, 27],
[151, 27],
[151, 27],
[108, 51],
[108, 20],
[108, 20],
[108, 20],
[1056, 43],
[345, 35],
[194, 35],
[1056, 27],
[1056, 27],
[1056, 20],
[1056, 20],
[108, 51],
[108, 27],
[108, 27],
[108, 43],
[798, 20],
[798, 27],
[151, 43],
[151, 35],
[151, 27],
[259, 27],
[259, 27],
[129, 51],
[129, 27],
[129, 27],
[259, 20],
[259, 20],
[194, 20],
[108, 35],
[194, 43],
[194, 12],
[194, 12],
[194, 4],
[108, 27],
[108, 20],
[108, 12],
[108, 20],
[841, 35],
[841, 43],
[280, 35],
[280, 35],
[280, 35],
[280, 43],
[1056, 43],
[216, 43],
[108, 59],
[108, 51],
[1186, 43],
[1186, 51],
[1186, 51],
[194, 43],
[194, 27],
[280, 4],
[86, 35],
[1121, 35],
[841, 27],
[108, 51],
[108, 35],
[108, 27],
[108, 27],
[517, 27],
[1336, 27],
[151, 35],
[151, 35],
[151, 43],
[151, 27],
[259, 35],
[129, 51],
[129, 43],
[129, 27],
[1078, 27],
[1078, 27],
[194, 35],
[108, 43],
[108, 35],
[108, 27],
[86, 12],
[108, 4],
[86, 35],
[86, 27],
[151, 20],
[474, 27],
[1056, 35],
[539, 27],
[237, 20],
[151, 27],
[151, 20],
[151, 35],
[151, 43],
[108, 43],
[108, 27],
[108, 12],
[108, 35],
[323, 35],
[280, 43],
[194, 27],
[280, 20],
[280, 12],
[86, 27],
[948, 27],
[108, 43],
[108, 35],
[108, 27],
[151, 27],
[1078, 35],
[129, 27],
[151, 51],
[151, 35],
[151, 35],
[151, 35],
[129, 27],
[237, 35],
[129, 43],
[129, 27],
[129, 27],
[259, 35],
[194, 59],
[108, 35],
[108, 27],
[108, 12],
[86, 4],
[86, 4],
[86, 43],
[86, 20],
[151, 12],
[151, 27],
[1336, 20],
[108, 12],
[884, 35],
[1336, 35],
[884, 35],
[948, 43],
[948, 27],
[108, 51],
[108, 51],
[108, 12],
[841, 43],
[280, 51],
[194, 35],
[194, 43],
[905, 35],
[884, 35],
[884, 35],
[884, 43],
[108, 51],
[1056, 43],
[1056, 43],
[841, 43],
[841, 43],
[1250, 43],
[1595, 67],
[948, 51],
[259, 35],
[841, 51],
[259, 27],
[108, 67],
[108, 51],
[1272, 43],
[1272, 51],
[1272, 43],
[1272, 43],
[1272, 51],
[1272, 43],
[1272, 20],
[1121, 35],
[1121, 43],
[108, 67],
[108, 35],
[108, 27],
[151, 35],
[862, 27],
[862, 12],
[151, 35],
[151, 35],
[259, 20],
[259, 27],
[259, 35],
[129, 43],
[129, 35],
[129, 12],
[539, 20],
[280, 27],
[280, 27],
[172, 35],
[86, 27],
[86, 27],
[582, 43],
[582, 20],
[86, 59],
[86, 35],
[86, 27],
[86, 20],
[86, 27],
[345, 27],
[345, 27],
[280, 35],
[280, 27],
[453, 35],
[259, 27],
[302, 35],
[86, 35],
[86, 27],
[86, 27],
[194, 43],
[194, 43],
[194, 20],
[194, 35],
[194, 27],
[194, 12],
[129, 27],
[86, 43],
[86, 27],
[86, 27],
[108, 43],
[108, 27],
[108, 12],
[108, 12],
[345, 12],
[108, 20],
[129, 20],
[108, 27],
[129, 35],
[604, 20],
[604, 12],
[604, 20],
[302, 12],
[129, 20],
[410, 12],
[539, 20],
[1056, 20],
[711, 20],
[86, 35],
[86, 20],
[86, 20],
[108, 35],
[108, 20],
[108, 27],
[108, 35],
[108, 27],
[604, 20],
[108, 35],
[108, 20],
[129, 43],
[129, 27],
[129, 27],
[237, 43],
[237, 27],
[237, 27],
[129, 51],
[129, 20],
[129, 20],
[237, 20],
[237, 12],
[86, 27],
[86, 27],
[86, 35],
[108, 35],
[108, 27],
[108, 20],
[345, 20],
[711, 12],
[711, 12],
[108, 27],
[129, 20],
[108, 43],
[108, 35],
[604, 20],
[302, 12],
[604, 20],
[302, 4],
[129, 43],
[129, 4],
[539, 4],
[539, 4],
[108, 12],
[172, 35],
[86, 20],
[86, 20],
[108, 35],
[129, 27],
[108, 35],
[108, 20],
[711, 12],
[108, 27],
[129, 20],
[108, 20],
[129, 35],
[129, 20],
[237, 27],
[237, 35],
[237, 27],
[129, 43],
[129, 35],
[86, 20],
[151, 27],
[151, 35],
[86, 27],
[86, 27]
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
