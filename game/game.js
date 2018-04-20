var game = (function () {
    var theme = new Audio('track.mp3')
    theme.play()
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
                    brake();
                    break;
            }
        });
        document.addEventListener("keyup", function (event) {
            // console.log(event)
            // directionX = 0;
            // directionY = 0;
        })
    }


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
        if (gameOver === true) {
            return;
        }
        requestAnimationFrame(move);
    }

    function getCar() {
        return document.querySelector('.car')
    }

    var carInterval;
    var welcomeScreen = document.querySelector(".welcome-screen");
    function start() {
        welcomeScreen.classList.add("welcome-screen-hide");
        enableControls();
        startTimer();
        updateScoreByTime();
        // updateScore(Math.floor((timer * 0.2)));
        carInterval = setInterval(function () {
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

        // Dropping items
        var gameIntervalId = setInterval(function () {
            dropEnemyOrBattery(getEnemyOrBattery());
        }, 1000);

        intervals.push({id: gameIntervalId});
        requestAnimationFrame(move);

    }


    var score = 0;
    var timer = 0;
    var scoreIntervalId;
    var timerIntervalId;
    var pointsForBattery = 5;
    var pointsPerSecond = 2;

    function getLastScreen() {
        return document.querySelector('.last-screen');
    }

    var scoreNode = document.querySelectorAll('.score');

    function showScore(score) {
        scoreNode.forEach(function (node) {
            return node.innerText = Math.round((score * 100) / 100) + ' points';
        });
    }

    function updateScore(delta) {
        score += delta;
        showScore(score);
    }

    function updateScoreByTime() {
        scoreIntervalId = setInterval(function () {
            updateScore(pointsPerSecond);
        }, 1000);
    }

    var timerNode = document.querySelectorAll('.timer');

    function showTime(timer) {
        timerNode.forEach(function (node) {
            return node.innerText = timer + ' seconds';
        });
    }

    function updateTime(delta) {
        timer += delta;
        showTime(timer);
    }

    function startTimer() {
        timerIntervalId = setInterval(function () {
            updateTime(1);
        }, 1000);
    }

    function resetGame() {
        timer = 0;
        score = 0;
        window.location.reload();
    }

    var resetBtn = document.querySelector('.reset-button');

    resetBtn.addEventListener('click', resetGame);

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
        return randomNumber < 7 ? enemy : battery;
    }

    var intervals = [];
    var gameOver = false;

    function removeInterval(id) {
        intervals = intervals.filter(function (interval) {
            return interval.id !== id;
        });
    }

    function clearAllIntervals() {

        intervals.forEach(function (interval) {
            clearInterval(interval.id);
            if (interval.element) {
                interval.element.remove();
            }
        });
        intervals = [];
    }

    var battsnd = new Audio('battery.mp3')
    var endsnd = new Audio('end.mp3')

    function dropEnemyOrBattery(item) {
        // Assigning random number from 0 to 4 to variable
        var index = Math.floor(Math.random() * 4);

        // Moving item from top to bottom
        var itemIntervalId = setInterval(function () {
            var marginTop = parseInt(item.style.marginTop || 0);
            var enemySpeed;
            if (timer >= 0 && timer < 5) {
                enemySpeed = 5;
            } else if (timer >= 5 && timer < 10) {
                enemySpeed = 7;
            } else if (timer >= 10 && timer < 15) {
                enemySpeed = 9;
            } else if (timer >= 15 && timer < 20) {
                enemySpeed = 11;
            } else if (timer >= 20 && timer < 25) {
                enemySpeed = 13;
            } else {
                enemySpeed = 15;
            }
            var batterySpeed = 8;

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
                itemRectHeight + itemRectY > playerCarRectY
            ) {
                if (item.classList.contains('battery')) {
                    clearInterval(itemIntervalId);
                    item.remove();
                    battsnd.play()
                    // score += 1;
                    // console.log('Congratulations! You have picked up the battery - 1 point.', score);
                    // getScore().innerText = 'Points: ' + score;
                    // getScore().style.color = 'white';
                    // getTimer().innerText = 'Time: ' + timer + ' sec';
                    // getTimer().style.color = 'white';
                    updateScore(pointsForBattery);

                } else {
                    getLastScreen().classList.add('last-screen-show');
                    showTime(timer);
                    clearInterval(itemIntervalId);
                    clearInterval(scoreIntervalId);
                    clearInterval(timerIntervalId);
                    clearInterval(carInterval);
                    clearAllIntervals();
                    gameOver = true;
                    // getCar().remove();
                    // clearInterval(carInterval);
                    console.log(intervals);
                    endsnd.play()
                    theme.pause()
                }
            }

            // Removing item from document if reaches bottom of the screen and clearing interval
            if (parseInt(item.style.marginTop) > getRoad().clientHeight + item.clientHeight) {
                item.remove();
                clearInterval(itemIntervalId);
                removeInterval(itemIntervalId);
            }
        }, 16);

        // Adding 'itemIntervalId' to 'intervals' array
        intervals.push({id: itemIntervalId, element: item})
    }


    return {
        start: start
    }
})();