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

    function getCar() {
        return document.querySelector('.car')
    }

    function start() {
        enableControls()

        setInterval(function () {
            var marginLeft = parseInt(getCar().style.marginLeft || 0);
            getCar().style.marginLeft = (marginLeft + direction) + 'px'
        }, 16)
    }


    function getRoad() {
        return document.querySelector('.road');
    }

    function dropEnemy() {
        var enemy = document.createElement('div');
        // Adding random class enemy_1 or enemy_2
        enemy.classList.add('enemy_' + Math.floor(Math.random() * (2 - 1 + 1)) + 1);

    }


    return {
        start: start
    }
})();