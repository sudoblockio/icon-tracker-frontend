$(document).ready(function () {
	$(".close").click(function () {
		$(".popup-wrap").fadeOut(350);
	});
});

$(window).on('CUSTOM_FX_QR_CODE', function () {
	$(".qrcode").click(function () {
		$(".popup-wrap.qr").fadeIn(350);
	});
	$(".close").click(function () {
		$(".popup-wrap").fadeOut(350);
	});
});

$(window).on('CUSTOM_FX_SORT_HOLDER', function () {
	$('.sort-holder ').mouseenter(function () {
		$(".sort-holder ul").stop().slideDown(300, 'swing');
	}).mouseleave(function () {
		$(".sort-holder ul").stop().slideUp(300, 'swing');
	});
});

$(window).on('CUSTOM_FX_TOKEN_BALANCE', function () {
	$(".table-typeB td .balance").click(function(){
		$(".combo-group").css({"display":"block"});
		$(this).addClass("on");
	});
});