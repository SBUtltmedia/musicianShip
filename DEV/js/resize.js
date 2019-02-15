$(window).resize(resizeWindow);
var aspect = 4/ 3;
var baseFontFactor = 60;
var paddingFactor = .9;
var stageHeight,  stageWidth;
function resizeWindow() {
  var viewport =  $(window)
  console.log(viewport.width(),$(window).width())

var w= viewport.width() ;
var h=  viewport.height();


  var calcw = w;
  var calch = h;
  if (w/h>=aspect) {
    stageHeight = calch;
    stageWidth = (aspect) * calch;

  }
else{

  stageHeight =  calcw/aspect;
  stageWidth =  calcw ;

}
    stageLeft = (calcw - stageWidth*paddingFactor) / 2;
  //stageLeft = stageWidth / 2;
  stageTop = 0;


  $("#stage").css({
    width: stageWidth*paddingFactor + "px",
    height: stageHeight*paddingFactor + "px",
    left: stageLeft + "px",
  });
  //console.log(stageLeft, stageTop)
  $("html").css("font-size", (stageHeight / baseFontFactor) + "px");

}
