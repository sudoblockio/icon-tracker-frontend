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
	$('.header-wrap ul li, .header-wrap .connect.join').mouseenter(function(){
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

	// sort
	$('.footer-wrap .mainnet').mouseenter(function(){
		$(".footer-wrap .mainnet ul").stop().slideDown(300, 'swing');
	}).mouseleave(function(){
		$(".footer-wrap .mainnet ul").stop().slideUp(300, 'swing');
	});

	// contract status
	$(".status-holder > span").click(function(){
		$(".status-holder ul").stop().slideDown(300, 'swing');
		$(this).addClass("on");
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

	// qrcode popup
	$(".btn-scam").click(function(){
		$(".popup-wrap.scam").fadeIn(350);
	});

	// detail popup
	$(".status").click(function(){
		$(".popup-wrap.detail").css({"display":"block"});
	});

	// close popup
	$(".close").click(function(){
		$(".popup-wrap").fadeOut(350);
	});	

	// drop
	$(".drop-btn").click(function(){
		var _parent = $(this).parent().parent();
		_parent.toggleClass("on");
	});	

	// governance
	$(".governance .start").click(function(){
		var _parent = $(this).parent().parent();
		$(".governance").toggleClass("on");
		$(".governance .screen1 .table-box").slideToggle(500);
	});

	// search
	$(".header-wrap .search-group span").click(function(){
		$(".pop-search").fadeIn(350);
	});
	
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$(".pop-search").fadeOut(100); 
		}
	});
	$(".pop-search .dimmed").click(function(){
		$(".pop-search").fadeOut(100); 
	});
	$(".search-group.txt .txt-type-search").on("change keyup", function() {

		console.log($(this).parents().hasClass("fixing"))
		if($(this).parents().hasClass("fixing")){
			if( $(this).val().length){
				$(".home .search-group.txt em").css("display","inline-block");
			} else {
				$(".home .search-group.txt em").css("display","none");
			}
		} else {
			if( $(this).val().length){
				$(".pop-search .search-group.txt em").css("display","inline-block");
			} else {
				$(".pop-search .search-group.txt em").css("display","none");
			}
		}
	});
	$(".search-group.txt em").click(function(){
		$(".search-group.txt .txt-type-search").val("");
		$(this).css("display","none");
	});
}

$(document).ready(function(){
	$(document).mouseup(function(e){
		var container = $(".combo-group");
		if(container.has(e.target).length===0){
			container.css("display","none");
			$(".table-typeB td .balance").removeClass("on");
		}
		var status = $(".header-wrap .logo");
		if(status.has(e.target).length===0){
			$(".status-holder ul").css("display","none");
			$(".status-holder > span").removeClass("on");
		}
	});

	ctreteContract();
	createMenu();
});


$(window).ready(function(){

});
