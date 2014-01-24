
/*
    + LevelDiv 0.1 (beta)
    + Created by: Ovdsteen (https://github.com/ovdsteen)
    + Function: Make elemnts inside wrapper same height.
    + Options: wrapper | element | extraheight
*/

jQuery.LevelDiv = function(options){

    $elementWrapper = $(options.wrapper);

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
