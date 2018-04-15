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

    function getTrack() {
        var track1 = getRoad().offsetLeft + 'px';
        var track2 = getRoad().offsetLeft + getRoad().clientWidth / 4 + 'px';
        var track3 = getRoad().offsetLeft + getRoad().clientWidth / 2 + 'px';
        var track4 = getRoad().offsetLeft + (getRoad().clientWidth - getRoad().clientWidth / 4) + 'px';
        var trackArray = [track1, track2, track3, track4];
        return trackArray[Math.floor(Math.random() * (trackArray.length))];
    }

    function dropEnemy() {
        var enemy = document.createElement('div');
        // Adding random class enemy_1 or enemy_2
        enemy.classList.add('enemy_' + (Math.floor(Math.random() * (3 - 1 + 1)) + 1));
        //Adding enemy to DOM (road div)
        getRoad().appendChild(enemy);
        //Positioning enemy on the road
        //Checking enemy position in respect to changes in window width (don't work now as 'enemy.style.left = getTrack();' was moved out of interval)
        enemy.style.left = getTrack();
        setInterval(function () {
            //Moving enemy from top to bottom
            var marginTop = parseInt(enemy.style.marginTop || 0);
            var enemySpeed = 2;
            enemy.style.marginTop = (marginTop + enemySpeed) + 'px';
        }, 16);
    }

    function dropBattery () {
        var battery = document.createElement('div');
        //Adding class 'battery'
        battery.classList.add('battery');
        //Adding battery to DOM (road div)
        getRoad().appendChild(battery);
        //Positioning battery on the road
        battery.style.left = getTrack();
        setInterval(function () {
            var marginTop = parseInt(battery.style.marginTop || 0);
            var batterySpeed = 2;
            battery.style.marginTop = (marginTop + batterySpeed) + 'px';
        }, 32);
    }

    dropEnemy();

    dropBattery();

    return {
        start: start
    }
})();