// contract over
var ctreteContract = function(){
	$(".table-typeB .link").mouseover(function(){
		var _class;
		if($(this).hasClass("address")){
			_class = "address";
		} else if($(this).hasClass("hash")){
			_class = "hash";
		} else {
			_class = "token";
		}
		$(".table-typeB .help."+_class).addClass("animate");
	}).mouseout(function(){
		var _class;
		if($(this).hasClass("address")){
			_class = "address";
		} else if($(this).hasClass("hash")){
			_class = "hash";
		} else {
			_class = "token";
		}
		$(".table-typeB .help."+_class).removeClass("animate");
	});

}

var createMenu = function(){
	// header
	$('.header-wrap ul li').mouseenter(function(){
		$(this).find(".sub-menu").stop().slideDown(300, 'swing');
		$(this).find("span").addClass("on");
	}).mouseleave(function(){
		$(this).find(".sub-menu").stop().slideUp(300, 'swing');
		$(this).find("span").removeClass("on");
	});

	// sort
	$('.sort-holder ').mouseenter(function(){
		$(".sort-holder ul").stop().slideDown(300, 'swing');
	}).mouseleave(function(){
		$(".sort-holder ul").stop().slideUp(300, 'swing');
	});

	// address token balance
	$(".table-typeB td .balance").click(function(){
		$(".combo-group").css({"display":"block"});
		$(this).addClass("on");
	});

	// qrcode popup
	$(".qrcode").click(function(){
		$(".popup-wrap.qr").fadeIn(350);
	});

	// detail popup
	$(".status").click(function(){
		$(".popup-wrap.detail").css({"display":"block"});
	});

	// close popup
	$(".close").click(function(){
		$(".popup-wrap").fadeOut(350);
	});
}

$(document).ready(function(){
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
