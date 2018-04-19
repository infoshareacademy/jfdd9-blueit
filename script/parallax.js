window.addEventListener('scroll', function (event) {
    document.querySelector('.hero-headline').style.top = (100 + window.pageYOffset * 0.85) + 'px';

})

