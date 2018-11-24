
$(function () {
    $(".btn-load-submit").click(function(){
        layer.load({shade:[0.4,"#000"]});
        var formId=$(this).attr("data-formId");
        $(formId).submit();
    });
    $(".btn-back").click(function () {
        history.back();
    });
});
(function ($) {
    $.fn.extend({
      checkedVal:function () {
          if(this.length<=0){
              return false;
          }
          var arr=new Array();
          for(var i=0;i<this.length;i++){
              arr.push(this[i].value);
          }
          return arr.toString();
      }
    })
})(jQuery)