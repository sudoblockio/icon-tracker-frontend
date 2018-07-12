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

	$('.sort-holder ').mouseenter(function(){
		$(".sort-holder ul").slideDown(300, 'swing');
	}).mouseleave(function(){
		$(".sort-holder ul").slideUp(300, 'swing');
	});

	$(".table-typeB td .balance").click(function(){
		$(".combo-group").css({"display":"block"});
		$(this).addClass("on");
	});

	$(".qrcode").click(function(){
		$(".popup-wrap.qr").fadeIn(350);
	});

	$(".status").click(function(){
		$(".popup-wrap.detail").css({"display":"block"});
	});

	$(".close").click(function(){
		$(".popup-wrap").fadeOut(350);
	});
}

$(document).ready(function(){
	var init = function(){}

	$(document).mouseup(function(e){
		var container = $(".combo-group");
		if(container.has(e.target).length===0){
			container.css("display","none");
			$(".table-typeB td .balance").removeClass("on");
		}
	});

	ctreteContract();
	createMenu();


});


$(window).ready(function(){

});
