const memoryGame = {};

// I'm using let here because the value of this array changes based on the level that users selected
let cards = [
    {
        url: "assets/kungfupanda.png",
        alt: "kungFuPanda",
        id: 'kungFuPanda',
        audio: 'assets/kungfupanda.m4a'
    },
    {
        url: "assets/kungfupanda.png",
        alt: "kungFuPanda",
        id: 'kungFuPanda'

    },
    {
        url: "assets/elsaCard.png",
        alt: "elsa",
        id: 'elsa',
        audio: 'assets/elsa.m4a'
    },
    {
        url: "assets/elsaCard.png",
        alt: "elsa",
        id: 'elsa'
    },
    {
        url: "assets/lionking.png",
        alt: "lion king",
        id: 'lionKing',
        audio: 'assets/symba.m4a'
    },
    {
        url: "assets/lionking.png",
        alt: "lion king",
        id: 'lionKing'
    },
    {
        url: "assets/pinocchio.png",
        alt: "pinocchio",
        id: 'pinocchio',
        audio: 'assets/pinocchio.m4a'
    },
    {
        url: "assets/pinocchio.png",
        alt: "pinocchio",
        id: 'pinocchio'
    },
    {
        url: "assets/woody.png",
        alt: "woody",
        id: 'woody',
        audio: 'assets/woody.m4a'
    },
    {
        url: "assets/woody.png",
        alt: "woody",
        id: 'woody'
    },
    {
        url: "assets/nemo.png",
        alt: "nemo",
        id: 'nemo',
        audio: 'assets/nemo.m4a'
    },
    {
        url: "assets/nemo.png",
        alt: "nemo",
        id: 'nemo'
    },
    {
        url: "assets/mrIncredible.png",
        alt: "Mr.Incredible",
        id: 'mrIncredible',
        audio: 'assets/incredibles.m4a'
    },
    {
        url: "assets/mrIncredible.png",
        alt: "Mr.Incredible",
        id: 'mrIncredible'
    },
    {
        url: "assets/mickeymouse.png",
        alt: "mickey mouse",
        id: 'mickeymouse',
        audio: 'assets/mickeymouse.m4a'
    },
    {
        url: "assets/mickeymouse.png",
        alt: "mickey mouse",
        id: 'mickeymouse'
    },
    {
        url: "assets/shrek.png",
        alt: "shrek and fiona",
        id: 'shrek',
        audio: 'assets/shrek.m4a'
    },
    {
        url: "assets/shrek.png",
        alt: "shrek and fiona",
        id: 'shrek'
    },
    {
        url: "assets/coco.png",
        alt: "coco",
        id: 'coco',
        audio: 'assets/coco.m4a'
    },
    {
        url: "assets/coco.png",
        alt: "coco",
        id: 'coco'
    }
];


memoryGame.checkCards = function() {
    let count = 0;
    let firstPick = '';
    let secondPick = '';
    let userFlippedCard = false;
    let gameOver = false;
    let numberOfMatches = 0;
    
  
    // This is for timer and counter. The timer won't start until users click on a card and it only runs once. That's why I use .one
    $gameBoardContainer.one('click', () => {
        const $bonusTime = $('.bonusTime').css('pointer-events', 'none')
                                          .prop('disabled', true);

        const timeChecker = () => {
            // Once users click on a card, the time goes down by 1 every second.
            memoryGame.timer--;

            $timer.text(`TIME: ${memoryGame.timer}`);

            if (memoryGame.timer === 20) {
                $bonusTime.css('opacity', '1')
                          .css('pointer-events', 'auto')
                          .prop('disabled', false);
            };


            // Once their targetted number of matches is met or time is up, make all the cards unclickable and show the result.
            if (memoryGame.timer === 0 || memoryGame.targettedMatches === numberOfMatches) {
                gameOver = true;
                
                $gameBoardContainer.css('pointer-events', 'none');
                clearInterval(interval);

                setTimeout(() => {
                    $gameBoard.empty();

                    const resultDescription = `
                        <div class="result">
                            <h2>RESULT</h2>
                            <p>You tried <span>${count}</span> times and brought <span>${numberOfMatches === memoryGame.targettedMatches ? 'ALL' : numberOfMatches}</span> friends back home!!</p>
                            <button class="playAgain">PLAY AGAIN</button>
                        </div>
                    `;

                    $gameBoard.append(resultDescription);

                    // To reset the whole game
                    $('.playAgain').on('click', () => {
                        location.reload();
                    });
                }, 2500);
            };
        };

        const interval = setInterval(() => {
            timeChecker();
        }, 1000);


        // When users have less than 20 seconds left, they can get 10 extra seconds by clicking on the bonus button.
        $bonusTime.one('click', function () {
            const $extra10Seconds = $('<p>').addClass('extra10Seconds')
                                            .text('+10');

            $('.clock').append($extra10Seconds);
            setTimeout(() => {
                $('.extra10Seconds').fadeOut();
            }, 4000);

            memoryGame.timer += 10;
        });
    });


    $('.card').on('click', function() {
        if(!gameOver) {
            // The userFlippedCard variable is set to false on game start and it turns to true and false every time users click on a card which means after users click one time, usersFlippedCard will be true and after users click two times, userFlippedCard will be false so when userFlippedCard is true, the value of the first clicked card will be set to firstPick variable and when it's false, the second clicked card will be set to secondPick variable.
            userFlippedCard = !userFlippedCard;

            if (userFlippedCard) {
                // to prevent users from clicking on already clicked cards
                firstPick = $(this).css('pointer-events', 'none')
                                   .addClass('flipped')
                                   .prop('disabled', true);

            } else {
                secondPick = $(this).addClass('flipped');

                $('.card').css('pointer-events', 'none').prop('disabled', true);

                count++;
                $count.text(`COUNT: ${count}`);
            };


            // here's where I check if the two cards that users clicked match or not. If both of the cards have the same id AND if the userFlippedCard variable is false, check if the cards match. userFlippedCard has to be false for the purpose of the game because every time users click on a card, the value of the variable changes back and forth between true and false and it's set to false on load.
            if (firstPick.attr('id') === secondPick.attr('id') && !userFlippedCard) {
                numberOfMatches++;

                $('.card').css('pointer-events', 'auto').prop('disabled', false);

                // to prevent users from clicking on already clicked cards
                firstPick.addClass('matched')
                         .css('pointer-events', 'none')
                         .prop('disabled', true);

                secondPick.addClass('matched')
                          .css('pointer-events', 'none')
                          .prop('disabled', true);

                firstPick = '';
                secondPick = '';

                
                // I'm using .hasClass so every card that has a class of matched get unclickable
                if ($('.card').hasClass('matched')) {
                    $('.matched').css('pointer-events', 'none')
                                 .prop('disabled', true);

                    cards.filter(card => {
                        if(card.id === $(this).attr('id')) {
                            // snowflake effect for when the cards match.
                            const snowImg = new Image();
                            const snowFlakeDiv = $('<div>').addClass('snowFlake');

                            snowImg.src = 'assets/snowFlake.png';
                            snowFlakeDiv.append(snowImg);

                            $('.elsa').append(snowFlakeDiv);

                            snowFlakeDiv.delay(1500).fadeOut('fast');

                            //audio sound for when the cards match.
                            const matchAudio = new Audio(`${card.audio}`);
                            matchAudio.play();
                        }
                    })

                } else {
                    $('.card').css('pointer-events', 'auto').prop('disabled', false);
                }

            } else {
                // If the cards that users clicked on don't match, they get clickable again
                setTimeout(() => {
                    firstPick.removeClass('flipped')
                             .css('pointer-events', 'auto')
                             .prop('disabled', false);
                    secondPick.removeClass('flipped')
                              .css('pointer-events', 'auto')
                              .prop('disabled', false);

                    firstPick = '';
                    secondPick = '';

                    $('.card').css('pointer-events', 'auto').prop('disabled', false);
                    $('.matched').css('pointer-events', 'none').prop('disabled', true);
                }, 500);
            };
        };
    });

    // To reset the whole game
    $('.resetButton').on('click', () => {
        location.reload();
    });
};


// Show all the cards on the game board based on the level that users selected. 
memoryGame.getCards = function() {
    cards.forEach(card => {
        const $cardContainer = $('<button>').attr('id', card.id);

        if(memoryGame.levelSelected === 3) {
            $cardContainer.addClass('card level3');

        } else if (memoryGame.levelSelected === 2) {
            $cardContainer.addClass('card level2');
                         
        } else {
            $cardContainer.addClass('card');
        }

        const frontImg = $('<img>').addClass('front')
                                   .attr('src', card.url);

        const backImg = $('<img>').addClass('back')
                                  .attr('src', 'assets/castle.png');

        $cardContainer.append(frontImg, backImg);

        $gameBoardContainer.append($cardContainer);
    });
    
    memoryGame.checkCards();
};


// before getting cards, shuffle them so they can show up in random places.
memoryGame.shuffle = function shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    };

    memoryGame.getCards();
};


// Once users click on the start button, make the main description section fade out and the game board, animation images and timer fade in.
const $gameBoardContainer = $('.container');
const $gameStartButton = $('.gameStart button');
const $timer = $('.timer');
const $count = $('.count');
const $gameBoard = $('.gameBoard');
// These variables above need to be used in other functions so I put them in the global scope

memoryGame.prepareToStart = function() {
    const $descriptionContainer = $('.description');
    const $title = $('.title');
    const $clock = $('.clock');
    const $alidin = $('.alidin');
    const $elsa = $('.elsa');

    $gameStartButton.on('click', () => {
        $descriptionContainer.fadeOut();
        $title.css('transform', 'translateY(-150%)');
        
        setTimeout(() => {
            $count.text('COUNT: 0');
            $timer.text(`TIME: ${memoryGame.timer}`);
            $gameBoard.css('display', 'block');
            $gameBoardContainer.css('display', 'flex');
            $clock.css('display', 'flex');
            $alidin.css('opacity', '1');
            $elsa.css('opacity', '1');
            
            memoryGame.shuffle(cards);
        }, 500);
    });
};


// users have to select a level to start the game. Once users select a level, the data for timer, the number of cards and targetted matches gets stored to variables and level buttons get unclickable
memoryGame.timer = '';
memoryGame.targettedMatches = 0;
memoryGame.levelSelected = false;

memoryGame.init = function() {
    const $level1 = $('.level1');
    const $level2 = $('.level2');
    const $level3 = $('.level3');

    $('.level').on('click', function () {
        memoryGame.levelSelected = true;

        $level1.css('pointer-events', 'none')
               .prop('disabled', true);

        $level2.css('pointer-events', 'none')
               .prop('disabled', true);

        $level3.css('pointer-events', 'none')
               .prop('disabled', true);

        // The value of timer and the number of cards and targetted matches are set based on the level that users selected
        if (memoryGame.levelSelected) {
            const numberOfCards = $(this).attr('data-cardNumber');
            const numberOfSlicedCards = cards.slice(0, numberOfCards);
            const time = $(this).attr('data-time');

            cards = numberOfSlicedCards;
            memoryGame.timer = time;

            if (memoryGame.timer === '50' && cards.length === 20) {
                memoryGame.targettedMatches = 10;
                memoryGame.levelSelected = 3;
                
                $level1.css('opacity', '0');
                $level2.css('opacity', '0');

            } else if (memoryGame.timer === '60' && cards.length === 20) {
                memoryGame.targettedMatches = 10;
                memoryGame.levelSelected = 2;

                $level1.css('opacity', '0');
                $level3.css('opacity', '0');

            } else {
                memoryGame.targettedMatches = 8;
                memoryGame.levelSelected = 1;

                $level2.css('opacity', '0');
                $level3.css('opacity', '0');
            }

            memoryGame.prepareToStart();
        };
    })


    // to prevent users from starting the game without choosing a level.
    $gameStartButton.on('click', function() {
        if(!memoryGame.levelSelected) {
            $('.description p').text('Please select level😁').css('padding-top', '7%');
        };
    });
};


$(function() {
    memoryGame.init();
});