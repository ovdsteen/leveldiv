/*
    + LevelDiv 0.2 (beta)
    + Created by: Ovdsteen (https://github.com/ovdsteen)
    + Function: Make elemnts inside wrapper same height.
    + Options: wrapper | element | extraheight | responsive
*/
jQuery.LevelDiv = function(options){

    var rtime = new Date(1, 1, 2000, 12,00,00);
    var timeout = false;
    var delta = 200;

    var level = function(){
        $elementWrapper = $(options.wrapper);
        $elementWrapper.find(options.element).height(''); //reset height
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
                    $(this).find(options.element).each(function(index, element) {
                        $(this).height(maxheight+options.extraheight);
                    });
                }
            }
        });
    };
    var resizeend = function(){
        if (new Date() - rtime < delta) {
            setTimeout(resizeend, delta);
        } else {
            timeout = false;
            level();
        }
    }
    if (options.responsive){
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
