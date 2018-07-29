$(window).on('CUSTOM_FX', function (e) {
	var type = e.originalEvent.detail.type
	var param = e.originalEvent.detail.param
	switch (type) {
		case 'POPUP_OPEN':
			$(".popup-wrap." + param).fadeIn(350);
			break
		case 'POPUP_CLOSE':
			if (param == 'detail') {
				$(".popup-wrap.detail").css({ "display": "none" });
			}
			else {
				$(".popup-wrap").fadeOut(350);
			}
			break
		case 'CONTRACT_OVER':
			$(".table-typeB .help." + param).addClass("animate");
			break
		case 'CONTRACT_OUT':
			$(".table-typeB .help." + param).removeClass("animate");
			break

		case 'SORT_ENTER':
			$(".sort-holder ul").stop().slideDown(300, 'swing');
			break
		case 'SORT_LEAVE':
			$(".sort-holder ul").stop().slideUp(300, 'swing');
			break

		case 'TOKEN_BALANCE':
			$(".table-typeB td .balance").click(function () {
				$(".combo-group").css({ "display": "block" });
				$(this).addClass("on");
			});
			break;
					
		default:
	}
});