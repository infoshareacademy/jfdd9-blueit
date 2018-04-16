var game = (function () {


    var direction = 0;

    function moveRight() {
        direction = 3;
    }

    function moveLeft() {
        direction = -3;
    }

    function enableControls() {
        document.addEventListener('keydown', function (event) {
            console.log(event.code);
            switch (event.code) {
                case 'ArrowRight':
                    moveRight();
                    break;
                case 'ArrowLeft':
                    moveLeft();
                    break;
            }
        })
    }

    var y = 0;
    requestAnimationFrame(move);
    var road = document.getElementById('road');

    function move() {
        y += 3;
        road.style.backgroundPosition = '0 ' + y + 'px';
        requestAnimationFrame(move);

    }

    function getCar() {
        return document.querySelector('.car')
    }

    function start() {
        enableControls()

        setInterval(function () {
            var marginLeft = Math.max(
                Math.min(
                    parseInt(getCar().style.marginLeft || 0),
                    501
                ), 0);
            getCar().style.marginLeft = (marginLeft + direction) + 'px'
        }, 16);

    }

    return {
        start: start
    }
})();