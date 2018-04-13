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
        enemy.classList.add('enemy_' + (Math.floor(Math.random() * (3 - 1 + 1)) + 1));
        //Adding enemy to DOM
        getRoad().appendChild(enemy);
        //Checking enemy position in respect to changes in window width
        setInterval(function () {
            //Positioning enemy on the road
            enemy.style.left = getRoad().offsetLeft + getRoad().clientWidth / 4 + 'px';
            //Moving enemy from top to bottom
            var marginTop = parseInt(enemy.style.marginTop || 0);
            var enemySpeed = 2;
            enemy.style.marginTop = (marginTop + enemySpeed) + 'px';
        }, 16);
    }

    dropEnemy();


    return {
        start: start
    }
})();