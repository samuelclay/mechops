var WIDTH=500,
    preheader="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n",
    header="<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\""+WIDTH+"px\" height=\""+WIDTH+"px\" viewBox=\"0 0 "+WIDTH+" "+WIDTH+"\" enable-background=\"new 0 0 "+WIDTH+" "+WIDTH+"\" xml:space=\"preserve\">\n",
    footer="</svg>",
    REP=Math.floor(.1*4)+2,
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
    var amplitudeSlider = document.getElementById("range-amplitude");
    var freqText = document.getElementById("freq");
    var amplitudeText = document.getElementById("amplitude");

function handleRange() {
  freqSlider.oninput = function() {
    freqText.innerText = this.value;
    generate();
  };
  amplitudeSlider.oninput = function() {
    amplitudeText.innerText = this.value;
    generate();
  };
}

handleRange(); 

const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function generate(){
    mandala=header;
    const freq = scale(parseInt(freqText.innerText, 10), 20, 20000, 0.15, 1);
    const amplitude = scale(parseInt(amplitudeText.innerText, 10), 0, 100, 0, 1);
    var h1 = scale(Math.random(), 0, 1, 0.1, 0.3);
    var h2 = scale(Math.random(), 0, 1, 0.3, 0.5);
    var h3 = scale(Math.random(), 0, 1, 0.5, 0.7);
    var h4 = scale(Math.random(), 0, 1, 0.7, 0.9);
    console.log(['Freq', freq, h1, h2, h3, h4]);
    for(i=0; i<REP; ++i)
    {
    	d1[i]=freq*h1*RAD;
    	d2[i]=freq*h2*RAD;
    	d3[i]=freq*h3*RAD;
    	d4[i]=freq*h4*RAD;
    }

    d1.sort().reverse();
    d4.sort().reverse();

    for(i=0; i<REP; ++i)
    {
	var curang=0,
	    ang=Math.PI/(1<<(Math.floor(Math.random()*3)+2));
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

    REP=Math.floor(Math.random()*3)+1;
    var h1 = scale(Math.random(), 0, 1, 0.1, 0.3);
    var h2 = scale(Math.random(), 0, 1, 0.3, 0.5);
    var h3 = scale(Math.random(), 0, 1, 0.5, 0.7);
    var h4 = scale(Math.random(), 0, 1, 0.7, 0.9);
    console.log(['Freq', freq, h1, h2, h3, h4]);
    for(i=0; i<REP; ++i)
    {
    	d1[i]=freq*h1*RAD;
    	d2[i]=freq*h2*RAD;
    	d3[i]=freq*h3*RAD;
    	d4[i]=freq*h4*RAD;
    }

    d1.sort().reverse();
    d2.sort().reverse();
    d3.sort().reverse();
    d4.sort().reverse();

    for(i=0; i<REP; ++i)
    {
	curang=0;
	ang=Math.PI/(1<<(Math.floor(amplitude*3)+3));
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
