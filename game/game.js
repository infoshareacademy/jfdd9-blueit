var game = (function () {


    var direction = 0;

    function moveRight() {
        direction = 1;
    }
    function moveLeft() {
        direction = -1;
    }

    function enableControls() {
        document.addEventListener('keydown', function (event) {
            console.log(event.code);
            switch(event.code) {
                case 'ArrowRight':
                    moveRight();
                    break;
                case 'ArrowLeft':
                    moveLeft();
                    break;
            }
        })
    }
    function getCar() {
        return document.querySelector('.car')
    }
    function start () {
        enableControls()

        setInterval(function () {
            var marginLeft = Math.max(
                Math.min(
                parseInt(getCar().style.marginLeft || 0),
                501
            ),0);
            getCar().style.marginLeft = (marginLeft + direction) + 'px'
        }, 16);

    }
    return {
        start: start
    }
})();