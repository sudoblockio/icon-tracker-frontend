var resizeScreen = function(){
	var _h = $(window).innerHeight ();
	_h = _h-306;
	$(".home .content-wrap .screen1 .content .list-group").css("height", _h +"px");
}

$(document).ready(function(){
	resizeScreen();

});


$(window).ready(function(){

});
$(window).load(function(){
	$( window ).resize(function() {
		resizeScreen();
	});

});