var game = (function () {


    var directionX = 0;
    var directionY = 0;

    function brake() {
        directionX = 0;
        directionY = 0;
    }

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
        directionY = -8;
    }

    function enableControls() {
        document.addEventListener('keydown', function (event) {
            // console.log(event.code);
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
                case "Space":
                    brake()
                    break;
            }
        });
        document.addEventListener("keyup", function (event) {
            // console.log(event)
            // directionX = 0;
            // directionY = 0;
        })
    }


    requestAnimationFrame(move);
    var y = 0;
    var z = 0;
    function getRoad() {
        return document.querySelector('.road')
    }
    function getGrass() {
        return document.querySelector('.grass')
    }

    function move() {
        y += 20;
        z += 10;
        getRoad().style.backgroundPosition = '0 ' + y + 'px';
        getGrass().style.backgroundPosition = '0 ' + z + 'px';

        requestAnimationFrame(move);

    }

    function getCar() {
        return document.querySelector('.car')
    }

    function start() {
        enableControls();
        startTimer();
        setInterval(function () {
            var marginLeft = Math.max(
                Math.min(
                    parseInt(getCar().style.marginLeft || 0),
                    495
                ), 0);
            getCar().style.marginLeft = (marginLeft + directionX) + 'px';

            var marginBottom = Math.max(
                Math.min(
                    parseInt(getCar().style.marginBottom || 0),
                    900
                ), 0);
            getCar().style.marginBottom = (marginBottom + directionY) + 'px'
        }, 30);


    }
    var score = 0;
    var timer = 0;
    var timerIntervalId;

    function getLastScreen () {
        return document.querySelector('.last-screen');
    }

    function getScore() {
        return document.querySelector('.score');
    }

    function getTimer() {
        return document.querySelector('.timer');
    }

    function startTimer() {
        timerIntervalId = setInterval(function () {
            timer += 1;
        }, 1000);
    }




    // console.log(getLastScreen());
   /*
    var scoreContainer = document.getElementById('score');
    var score = 0;
    var batteries = getFromRoad(road, 'b');
    var resetButtonNode = document.getElementById('reset-button');
    resetButtonNode.addEventListener('click', start);




    function showScore(score) {
        scoreContainer.innerText = score + ' points';
    }

    function update() {
        if (najazd auta na baterie) {
            score += 1;
        }

        function reset() {
            time = 0;
            score = 0;
            showScore();
        }*/

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

    function getEnemyOrBattery() {
        // Enemy and battery elements declaration
        var enemy = document.createElement('div');
        var battery = document.createElement('div');

        // Adding enemy and battery classes
        enemy.classList.add('enemy_' + (Math.floor(Math.random() * 8 + 1)));
        battery.classList.add('battery');

        // Generating random number from 1 to 10
        var randomNumber = Math.floor(Math.random() * 10 + 1);

        // Returning element depending on the randomNumber
        return randomNumber < 5 ? enemy : battery;
    }

    var intervals = [];

    function removeInterval(id) {
        intervals = intervals.filter(function (interval) {
            return interval.id !== id
        })
    }

    function clearAllIntervals() {

        intervals.forEach(function (interval) {
            clearInterval(interval.id);
            if (interval.element) {
                interval.element.remove();
            }
        })
    }

    function dropEnemyOrBattery(item) {
        // Assigning random number from 0 to 4 to variable
        var index = Math.floor(Math.random() * 4);

        // todo: wykrywanie kolizji z 'car' dla enemy i battery

        // Moving item from top to bottom
        var intervalId = setInterval(function () {
            var marginTop = parseInt(item.style.marginTop || 0);
            var enemySpeed = 8;
            var batterySpeed = 10;

            // Assigning random track to variable
            var track = getTrack(index);

            // Item offset amount from left
            var itemLeftOffset = ((getRoad().clientWidth / 4) - item.clientWidth) / 2;

            // Getting coordinates of item (x, y) and its width and height
            var itemRectX = item.getBoundingClientRect().x;
            var itemRectY = item.getBoundingClientRect().y;
            var itemRectWidth = item.getBoundingClientRect().width;
            var itemRectHeight = item.getBoundingClientRect().height;

            // Getting coordinates of player car (x, y) and its width and height
            var playerCarRectX = getCar().getBoundingClientRect().x;
            var playerCarRectY = getCar().getBoundingClientRect().y;
            var playerCarRectWidth = getCar().getBoundingClientRect().width;
            var playerCarRectHeight = getCar().getBoundingClientRect().height;

            // Adding final left offset to item
            item.style.left = track + itemLeftOffset + 'px';

            // Adding item to DOM
            getRoad().appendChild(item);

            // Assigning speed depending on item type
            item.classList.contains('battery')
                ? item.style.marginTop = (marginTop + batterySpeed) + 'px'
                : item.style.marginTop = (marginTop + enemySpeed) + 'px';

            // Detecting collisions with enemies and batteries
            if (itemRectX < playerCarRectX + playerCarRectWidth &&
                itemRectX + itemRectWidth > playerCarRectX &&
                itemRectY < playerCarRectY + playerCarRectHeight &&
                itemRectHeight + itemRectY > playerCarRectY) {
                if (item.classList.contains('battery')) {
                    clearInterval(intervalId);
                    item.remove();
                    score += 1;
                    console.log('Congratulations! You have picked up the battery - 1 point.', score);
                    getScore().innerText = score;
                    getScore().style.color = 'white';
                    getTimer().innerText = timer;
                    getTimer().style.color = 'white';

                } else {
                    console.log('You wrecked the car! Game over!');
                    getLastScreen().classList.add('last-screen-show');
                    clearInterval(intervalId);
                    clearInterval(timerIntervalId);
                    clearAllIntervals();
                }
            }

            // Removing item from document if it reaches bottom of the screen and clearing interval
            if (parseInt(item.style.marginTop) > getRoad().clientHeight + item.clientHeight) {
                item.remove();
                clearInterval(intervalId);
                removeInterval(intervalId);
            }
        }, 16);

        intervals.push({ id: intervalId, element: item })
    }

    /*function timer() {
        // todo: timer function
    }*/

    // Dropping first item
    // Dropping more items when timer reaches a point in time
    // Min interval - 400 (when enemies don't touch each other)

    var gameIntervalId = setInterval(function () {


        dropEnemyOrBattery(getEnemyOrBattery());
    }, 1000);

    intervals.push({ id: gameIntervalId })



    return {
        start: start
    }
})();