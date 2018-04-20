document.addEventListener("DOMContentLoaded", function () {
    // Selecting all func boxes
    var funcBox = document.querySelectorAll('.func-box');

    function showFuncBoxes (){
        // For each element (func box) add or remove classes
        funcBox.forEach(function (element) {
            var elementRect = element.getBoundingClientRect();

            // Element.getBoundingClientRect() method returns position of the element relative to the viewport
            // window.innerHeight calculates Height (in pixels) of the browser window viewport
            if (elementRect.top < window.innerHeight - (elementRect.height / 3)) {
                element.classList.add('func-show-box');
            }
            else {
                element.classList.remove('func-show-box');
            }
        });
    }

    showFuncBoxes();

    // Event listener on scroll
    document.addEventListener("scroll", function () {
        showFuncBoxes();
    });
});