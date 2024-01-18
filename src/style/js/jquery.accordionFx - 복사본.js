(function ($) {
    var defaults = {
        _fullOpen: true,
        _isChild: false,
        accorClick: function () {},
        company: '상상의자유',
        author: 'kissyweb@gmail.com',
    }

    $.fn.accordionFx = function (options) {
        var I_F = {}
        var _class = this.attr('id')
        var _length = 2
        var init = function () {
            I_F.set = $.extend({}, defaults, options)
            loadedFx()
        }
        var loadedFx = function () {
            $('#' + _class + ' .one').click(function (e) {
                var _index = $(e.target).closest('li').index()
                // var _length = $(this).parent().parent().children().length;
                var _length = $(this).parent().parent().parent().children().length

                $(this).parent().parent().addClass('on')
                if (I_F.set._fullOpen) {
                    accorClick(
                        _class,
                        _index,
                        $(this).parent().parent().find('.content').is(':hidden')
                    )
                    // console.log( _length,  $(this).parent().parent().find(".content").is(':hidden') )
                    // if($(this).parent().find(".content").is(':hidden')){
                    if ($(this).parent().parent().find('.content').is(':hidden')) {
                        // $(this).parent().find(".title").addClass("on");
                    } else {
                        // $(this).parent().find(".title").removeClass("on");
                        $(this).parent().parent().removeClass('on')
                    }
                    // $(this).parent().find(".content").slideToggle(500);
                    $(this).parent().parent().find('.content').slideToggle(500)
                } else {
                    for (var i = 0; i < _length; i++) {
                        if (i === _index) {
                            if ($(this).parent().parent().find('.content').is(':hidden')) {
                                // $(this).parent().find(".title").addClass("on");
                            } else {
                                $(this).parent().parent().removeClass('on')
                            }
                            $(this).parent().parent().find('.content').slideToggle(500)
                        } else {
                            $('#' + _class + ' li:eq(' + i + ') .content').slideUp(500)
                            $('#' + _class + ' li:eq(' + i + ') .title').removeClass('on')
                        }
                    }
                }
            })
            $('#' + _class + ' .btnClose').click(function (e) {
                $(this).parent().slideUp(500)
            })
        }
        init()
        return this
    }
})(jQuery)
