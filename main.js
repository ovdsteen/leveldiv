$( document ).ready(function() {
    setTimeout(function(){
        $.LevelDiv(
            {
                wrapper: '.row-equal',
                element: '.col-equal',
                responsive: true,
                stopsize: 768,
                delta: 300,
                extraheight:0, // or use data attribute data-extraheight=""
                btngroup:'btn-group'
            }
        );
    }, 200);
});