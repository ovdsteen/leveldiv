/*
    + LevelDiv 0.3 (beta)
    + Created by: Ovdsteen (https://github.com/ovdsteen)
    + Function: Make elemnts inside wrapper same height.
    + Options: wrapper | element | responsive | mobile | delta  | extraheight  | stopsize
*/
jQuery.LevelDiv = function(options){

    $elementWrapper = $(options.wrapper);

    var rtime = new Date(1, 1, 2000, 12,00,00);
    var timeout = false;
    var delta = options.delta ? options.delta : 200;
    var stopsize = options.stopsize ? options.stopsize : false;
    var btngroup = options.btngroup ? options.btngroup : false;
    var responsive = options.responsive ? options.responsive : true

    if ( $elementWrapper.data('extraheight') ){
        extraheight = $elementWrapper.data('extraheight');
    }else{
        extraheight = options.extraheight ? options.extraheight : false;
    }
    var level = function(){
        $elementWrapper.find(options.element).height(''); //reset height
        if ( stopsize  && stopsize > $(window).width() ){
            if (btngroup){
                $elementWrapper.find("."+btngroup).removeClass('pos-absolute'); //set btn group absolute
            }
        }else{
            if (btngroup){
                $elementWrapper.find("."+btngroup).addClass('pos-absolute'); //set btn group absolute
            }
            $( $elementWrapper).each(function( index ) {
                if ( $(this).length ){
                    var a   = new Array();
                    var i   = 0;
                    $(this).find(options.element).each(function(index, element) {
                        a[i] = $(this).height();
                        i++;
                    });
                    if (i!=0){
                        var maxheight =  Math.max.apply( Math, a );
                        $isbutton = $(this).find("."+btngroup); // check if there's a button
                        var buttonheight = 0;
                        if ( $isbutton.length ){
                            buttonheight = $isbutton.height()+parseInt($isbutton.css('padding-top'))+parseInt($isbutton.css('padding-bottom'));
                        }
                        $(this).find(options.element).each(function(index, element) {
                            $(this).height(maxheight+extraheight+buttonheight);
                        });
                    }
                }
            });
        }
    };
    var resizeend = function(){
        if (new Date() - rtime < delta) {
            setTimeout(resizeend, delta);
        } else {
            timeout = false;
            level();
        }
    }
    if (responsive){
        $(window).resize(function() {
            rtime = new Date();
            if (timeout === false) {
                timeout = true;
                setTimeout(resizeend, delta);
            }
        });
    }
    return level();
};
