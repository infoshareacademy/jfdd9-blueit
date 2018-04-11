document.addEventListener("DOMContentLoaded", function () {
    var funcBox = document.querySelectorAll('.func-box');
    // var screenPosition = funcBox1.getBoundingClientRect();

    document.addEventListener("scroll", function () {
        funcBox.forEach(function (element) {
            /*console.log('\nwindow.innerHeight: ', window.innerHeight);
            console.log('Top: ', element.getBoundingClientRect().top);
            console.log('Bottom: ', element.getBoundingClientRect().bottom);
            console.log('Height: ', element.getBoundingClientRect().height);*/
            if (element.getBoundingClientRect().top < window.innerHeight - (element.getBoundingClientRect().height / 2)) {
                element.classList.add('func-show-box');
            }
            else {
                element.classList.remove('func-show-box');
            }
        });
    });
});