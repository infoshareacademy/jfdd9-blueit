var game = (function () {


    var directionX = 0;
    var directionY = 0;

    function moveRight() {
        directionX = 6;
    }

    function moveLeft() {
        directionX = -6;
    }

    function moveUp() {
        directionY = 4;
    }

    function moveDown() {
        directionY = -4;
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
                case 'ArrowUp':
                    moveUp();
                    break;
                case "ArrowDown":
                    moveDown();
                    break;
            }
        })
        document.addEventListener("keyup", function (event) {
            directionX = 0;
            directionY = 0;
        })
    }


    var y = 0;
    requestAnimationFrame(move);
    var road = document.getElementById('road');

    function move() {
        y += 8;
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
                    495
                ), 0);
            getCar().style.marginLeft = (marginLeft + directionX) + 'px'

            var marginBottom = Math.max(
                Math.min(
                    parseInt(getCar().style.marginBottom || 0),
                    900
                ), 0);
            getCar().style.marginBottom = (marginBottom + directionY) + 'px'
        }, 16);


    }

    return {
        start: start
    }
})();