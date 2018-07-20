$(document).ready(function () {
	$(".close").click(function () {
		$(".popup-wrap").fadeOut(350);
	});
});

$(window).on('CUSTOM_FX_QRCODE', function () {
	$(".qrcode").click(function () {
		$(".popup-wrap.qr").fadeIn(350);
	});
	$(".close").click(function () {
		$(".popup-wrap").fadeOut(350);
	});
});

$(window).on('CUSTOM_FX_SORTHOLDER', function () {
	$('.sort-holder ').mouseenter(function () {
		$(".sort-holder ul").stop().slideDown(300, 'swing');
	}).mouseleave(function () {
		$(".sort-holder ul").stop().slideUp(300, 'swing');
	});
});