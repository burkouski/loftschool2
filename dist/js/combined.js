$(function(){$(".js-triger").on("click",function(s){s.preventDefault();var e=$(this),i=e.closest(".js-item"),t=e.closest(".js-list"),l=t.find(".js-item"),o=i.find(".js-sublist"),a=t.find(".js-sublist"),c=300;console.log(i),i.hasClass("active")?(o.stop(!0,!0).slideUp(c),i.removeClass("active")):(l.removeClass("active"),i.addClass("active"),a.stop(!0,!0).slideUp(c),o.stop(!0,!0).slideDown(c))})});