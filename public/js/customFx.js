$(document).ready(function () {
	$(".close").click(function () {
		$(".popup-wrap").fadeOut(350);
	});
});


$(window).on('CUSTOM_FX', function (e) {
	switch (e.originalEvent.detail) {
		case 'QR_CODE':
			$(".qrcode").click(function () {
				$(".popup-wrap.qr").fadeIn(350);
			});
			$(".close").click(function () {
				$(".popup-wrap").fadeOut(350);
			});
			break;
		case 'SORT_HOLDER':
			$('.sort-holder ').mouseenter(function () {
				$(".sort-holder ul").stop().slideDown(300, 'swing');
			}).mouseleave(function () {
				$(".sort-holder ul").stop().slideUp(300, 'swing');
			});
			break;
		case 'TOKEN_BALANCE':
			$(".table-typeB td .balance").click(function () {
				$(".combo-group").css({ "display": "block" });
				$(this).addClass("on");
			});
			break;
		case 'QR_CODE':
			break;

		default:
	}
});