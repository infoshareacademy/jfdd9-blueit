window.addEventListener('scroll', function (event) {
    var heroHeadline = document.querySelector('.hero-headline');
    $(window).width() < 992
        ? heroHeadline.style.top = (100 + window.pageYOffset * 0.7) + 'px'
        : heroHeadline.style.top = (100 + window.pageYOffset * 0.77) + 'px';
});

