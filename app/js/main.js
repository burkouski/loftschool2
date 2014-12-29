$(function(){
    $('.js-triger').on('click', function(e){
        e.preventDefault();

        var $this = $(this),
            item = $this.closest('.js-item'),
            list = $this.closest('.js-list'),
            items = list.find('.js-item'),
            content = item.find('.js-sublist'),
            otherContent = list.find('.js-sublist'),
            duration = 300;
        console.log(item)
        if (!item.hasClass('active')) {
            items.removeClass('active');
            item.addClass('active');

            otherContent.stop(true, true).slideUp(duration);
            content.stop(true, true).slideDown(duration);

        } else {
            content.stop(true, true).slideUp(duration);
            item.removeClass('active');
        }

    });

    var
        $window = $(window),
        $body = $("body"),
        $totop = $('.js-totop');

    $window.on('scroll', function(){
        var $this = $(this);
        console.log($this.scrollTop());
        if ($this.scrollTop() > 200) {
            $totop.slideDown(300)
        }
        else {
            $totop.slideUp(300)
        }
    });
    $(window).scroll();
    $totop.on('click', function(){
        $body.animate({ scrollTop: "0" });
    })
});
