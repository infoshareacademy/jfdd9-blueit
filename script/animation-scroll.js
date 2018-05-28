var links = document.querySelectorAll('#hero-section a[href^="#"]');
var navLinks = document.querySelectorAll('#nav-div a[href^="#"]');
var menu = document.querySelector('#hero-nav');

links.forEach(function (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    var targetSelector = link.getAttribute('href');
    var targetElement = document.querySelector(targetSelector);
    window.scroll({
      top: targetElement.offsetTop,
      behavior: 'smooth'
    });
  });
});

window.addEventListener('scroll', function (event) {
  var currentPosition = window.pageYOffset;
  Array.prototype.map.call(navLinks, function (link) {
    return document.querySelector(
      link.getAttribute('href')
    )
  }).forEach(function (element, index) {
    var pos = currentPosition + menu.offsetHeight + 1;
    if (
      pos > element.offsetTop &&
      pos < element.offsetHeight + element.offsetTop
    ) {
      navLinks.forEach(function (link) {
        link.classList.remove('active')
      });
      navLinks[index].classList.add('active')
    }
  })
});

