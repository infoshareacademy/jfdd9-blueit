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

    function getTrack(index) {
        // Getting each track position
        var track1 = getRoad().offsetLeft;
        var track2 = getRoad().offsetLeft + getRoad().clientWidth / 4;
        var track3 = getRoad().offsetLeft + getRoad().clientWidth / 2;
        var track4 = getRoad().offsetLeft + (getRoad().clientWidth - getRoad().clientWidth / 4);
        // Track array to draw from
        var trackArray = [track1, track2, track3, track4];
        // Returning random track from trackArray
        return trackArray[index];
    }

    function enemyOrBattery() {
        // Enemy and battery elements declaration
        var enemy = document.createElement('div');
        var battery = document.createElement('div');
        // Adding enemy and battery classes
        enemy.classList.add('enemy_' + (Math.floor(Math.random() * 3 + 1)));
        battery.classList.add('battery');
        // Generating random number from 1 to 10
        var randomNumber = Math.floor(Math.random() * 10 + 1);
        // Returning element depending on the randomNumber
        return randomNumber < 10 ? enemy : battery;
    }

    function dropEnemyOrBattery(item) {
        // Assigning random number from 0 to 4 to variable
        var index = Math.floor(Math.random() * 4);

        // todo: wykrywanie kolizji z 'car' dla enemy i battery

        // Moving item from top to bottom
        setInterval(function () {
            var marginTop = parseInt(item.style.marginTop || 0);
            var enemySpeed = 3;
            var batterySpeed = 4;
            // Assigning random track to variable
            var track = getTrack(index);
            // Item offset amount from left
            var itemLeftOffset = ((getRoad().clientWidth / 4) - item.clientWidth) / 2;
            // Adding final left offset to item
            item.style.left = track + itemLeftOffset + 'px';
            // Adding item to DOM
            getRoad().appendChild(item);
            // Assigning speed depending on item type
            item.classList.contains('battery')
                ? item.style.marginTop = (marginTop + batterySpeed) + 'px'
                : item.style.marginTop = (marginTop + enemySpeed) + 'px';
            // Removing item from document
            if (parseInt(item.style.marginTop) > getRoad().clientHeight + item.clientHeight) {
                item.remove();
            }
        }, 16);
    }

    // Dropping first item
    dropEnemyOrBattery(enemyOrBattery());
    // Dropping next items in time intervals
    setInterval(function () {
        dropEnemyOrBattery(enemyOrBattery());
    }, 3000);


    return {
        start: start
    }
})();