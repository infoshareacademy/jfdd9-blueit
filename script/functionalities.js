function funcBoxesClassSwitch () {
/*    var
    if(document)*/
}

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("scroll", function () {
        var func1 = document.getElementById("func-1");
        if (document.documentElement.scrollTop > 450) {
            func1.classList.add("func-show");
        } else {
            func1.classList.remove("func-show");
        }
    });
});