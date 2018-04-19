window.addEventListener('scroll', function (event) {
    var heroHeadline = document.querySelector('.hero-headline');
    $(window).width() <= 1280
        ? heroHeadline.style.top = (100 + window.pageYOffset * 0.6) + 'px'
        : heroHeadline.style.top = (100 + window.pageYOffset * 0.77) + 'px'
});

