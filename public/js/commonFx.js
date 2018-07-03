var ctreteContract = function(){
	$(".table-typeB .link").mouseover(function(){
		var _class = $(this).attr("class").substr(5);
		$(".table-typeB .help."+_class).addClass("animate");
	}).mouseout(function(){
		var _class = $(this).attr("class").substr(5);
		$(".table-typeB .help."+_class).removeClass("animate");
	});

}

var createMenu = function(){
	$('.header-wrap ul li').mouseenter(function(){
		$(this).find(".sub-menu").slideDown(300, 'swing');
		$(this).find("span").addClass("on");
	}).mouseleave(function(){
		$(this).find(".sub-menu").slideUp(300, 'swing');
		$(this).find("span").removeClass("on");
	});
}

$(document).ready(function(){
	var init = function(){}
	ctreteContract();
	createMenu();


});


$(window).ready(function(){

});
