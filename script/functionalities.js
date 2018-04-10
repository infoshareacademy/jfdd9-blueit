function funcBoxesClassSwitch () {
/*    var
    if(document)*/
}

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("scroll", function () {
        var box1 = document.querySelector(".func-box-1");
        var box2 = document.querySelector(".func-box-2");
        if (document.documentElement.scrollTop > 400) {
            if (box1.classList.contains('opacity0') && box2.classList.contains('opacity0')){
                box1.classList.remove('opacity0');
                box1.classList.add('opacity1');
                box2.classList.remove('opacity0');
                box2.classList.add('opacity1');
            }
        }
        else {
            // el.classList.add('is-paused');
            box1.classList.remove('opacity1');
            box1.classList.add('opacity0');
            box2.classList.remove('opacity1');
            box2.classList.add('opacity0');
        }


    });
});