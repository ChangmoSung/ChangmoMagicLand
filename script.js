const memoryGame = {};

let cards = [
    {
        url: "assets/kungfupanda.png",
        alt: "kungFuPanda",
        id: 'kungFuPanda',
        text: "There are no coincidences in this world",
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
        text: 'The cold never bothered me anyway',
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
        text: 'I laugh in the face of danger',
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
        text: 'When he lies his niose gets big',
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
        text: 'Reach for the sky',
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
        text: 'Fish are friends, not food.',
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
        text: 'That was totally wicked',
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
        text: 'It is kind of fun to do the impossible',
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
        text: 'Are you Princess Fiona?',
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
        text: 'Nothing is more important than family',
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

    $('.resetButton').on('click', () => {
        location.reload();
    });
    

    // This is for timer and count and to count the number of matches. The timer won't start until users click on a card that's why I use .one
    // Once users click on a card, the time goes down by 1 every second.
    $gameBoardContainer.one('click', '.card', () => {
        const timeChecker = () => {
            memoryGame.timer--;
            $timer.text(`TIME: ${memoryGame.timer}`);

            if (memoryGame.timer === 20) {
                $('.bonusTime').css('opacity', '1');
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
                            <p>You tried ${count} times and brought ${numberOfMatches} friends back home!!</p>
                            <button class="playAgain">PLAY AGAIN</button>
                        </div>
                    `;

                    $gameBoard.append(resultDescription);
                    $('.textMatch').text('YOU ARE THE BEST!!');

                    // to play again.
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
        let lessThan20Seconds = false;
        $('.bonusTime').one('click', function() {
            lessThan20Seconds = !lessThan20Seconds;
            
            if (memoryGame.timer <= 20 && lessThan20Seconds) {
                memoryGame.timer += 10;
            };
        });
    });


    $('.card').on('click', function() {
        if(!gameOver) {
            // The userFlippedCard variable is set to false on load and it turns to true and false every time users click on a card which means after users click one time, usersFlippedCard will be true and after users click two times, userFlippedCard will be false so when userFlippedCard is true, the value of the first clicked card will be set to firstPick variable and when it's false, the second clicked card will be set to secondPick variable.
            userFlippedCard = !userFlippedCard;

            if (userFlippedCard) {
                // to prevent users from clicking on already clicked cards
                firstPick = $(this).css('pointer-events', 'none')
                                   .addClass('flipped');

            } else {
                secondPick = $(this).addClass('flipped');

                $('.card').css('pointer-events', 'none');

                count++;
                $count.text(`COUNT: ${count}`);
            };


            // here's where I check if the two cards that users selected match or not. If both of the cards have the same id AND if the userFlippedCard variable is false, check if the cards match. userFlippedCard has to be false for the purpose of the game because every time users click on a card, the value of the variable changes back and forth between true and false and it's set to false on load.
            if (firstPick.attr('id') === secondPick.attr('id') && !userFlippedCard) {
                numberOfMatches++;

                $('.card').css('pointer-events', 'auto');

                // to prevent users from clicking on already clicked cards
                firstPick.addClass('matched')
                         .css('pointer-events', 'none');
                secondPick.addClass('matched')
                          .css('pointer-events', 'none');

                firstPick = '';
                secondPick = '';

                if ($('.card').hasClass('matched')) {
                    $('.matched').css('pointer-events', 'none');

                    cards.filter(card => {
                        if(card.id === $(this).attr('id')) {
                            $('.textMatch').text(card.text)
                                           .css('opacity', '1');


                            // snow flake effect for when the cards match.
                            const snowFlakeDiv = $('<div>').addClass('snowFlake');
                            const snowImg = new Image();
                            snowImg.src = 'assets/snowFlake.png';
                            snowFlakeDiv.append(snowImg);
                            $('.elsa').append(snowFlakeDiv);


                            //audio sound for when the cards match.
                            const matchAudio = new Audio(`${card.audio}`);
                            matchAudio.play();


                            // the snow flake effect fades out after 1.5 seconds.
                            snowFlakeDiv.delay(1500).fadeOut('fast');
                        }
                    })

                } else {
                    $('.card').css('pointer-events', 'auto');
                }

            } else {
                setTimeout(() => {
                    firstPick.removeClass('flipped')
                             .css('pointer-events', 'auto');
                    secondPick.removeClass('flipped')
                              .css('pointer-events', 'auto');

                    firstPick = '';
                    secondPick = '';

                    $('.card').css('pointer-events', 'auto');
                    $('.matched').css('pointer-events', 'none');
                }, 500);
            };
        };
    });
};


// Show all the cards on the game board based on the level that users selected. 
memoryGame.getCards = function() {
    cards.forEach(card => {
        const $cardContainer = $('<div>');

        if(memoryGame.levelSelected === 3) {
            $cardContainer.addClass('card level3')
                         .attr('id', `${card.id}`);

        } else if (memoryGame.levelSelected === 2) {
            $cardContainer.addClass('card level2')
                         .attr('id', `${card.id}`);
                         
        } else {
            $cardContainer.addClass('card')
                         .attr('id', `${card.id}`);
        }

        const frontImg = $('<img>').addClass('front')
                                   .attr('src', `${card.url}`)
                                   .attr('aria-hidden', 'true');

        const backImg = $('<img>').addClass('back')
            .attr('src', 'assets/castle.png')
            .attr('aria-hidden', 'true');

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

memoryGame.prepareToStart = function() {
    const $descriptionContainer = $('.descriptionContainer');
    const $title = $('.title');
    const $clock = $('.clock');
    const $alidin = $('.alidin');
    const $elsa = $('.elsa');

    $gameStartButton.on('click', () => {

        // const welcomeAudio = new Audio('assets/KakaoTalk_Audio_2020-02-09-15-23-49.m4a');
        // welcomeAudio.play();

        $descriptionContainer.fadeOut();
        $title.css('transform', 'translateY(-110%)');
        
        setTimeout(() => {
            $gameBoard.css('display', 'block');
            $gameBoardContainer.css('display', 'flex');
            $clock.css('display', 'flex');
            $count.text('COUNT: 0');
            $timer.text(`TIME: ${memoryGame.timer}`);
            $alidin.css('opacity', '1');
            $elsa.css('opacity', '1');
            
            memoryGame.shuffle(cards);
        }, 500);
    });
};


// users have to select a level to start the game so there are three of the same functions attached to each event listener.
memoryGame.timer = '';
memoryGame.targettedMatches = 0;
memoryGame.levelSelected = false;

memoryGame.init = function() {
    let $level1 = $('.level1');
    let $level2 = $('.level2');
    let $level3 = $('.level3');

    $('.level').on('click', function () {
        memoryGame.levelSelected = true;

        if (memoryGame.levelSelected) {
            const numberOfLevel1Cards = $(this).attr('data-cardNumber');
            const level1Cards = cards.slice(0, numberOfLevel1Cards);
            const level1Time = $(this).attr('data-time');

            cards = level1Cards;
            memoryGame.timer = level1Time;

            if (memoryGame.timer === '40' && cards.length === 20) {
                memoryGame.targettedMatches = 10;
                memoryGame.levelSelected = 3;
                $level3
                    .css('pointer-events', 'none');
                $level2
                    .css('opacity', '0')
                    .css('pointer-events', 'none');
                $level1
                    .css('opacity', '0')
                    .css('pointer-events', 'none');
            } else if (memoryGame.timer === '50' && cards.length === 20) {
                memoryGame.targettedMatches = 10;
                memoryGame.levelSelected = 2;
                $level3
                    .css('pointer-events', 'none')
                    .css('opacity', '0');
                $level2
                    .css('pointer-events', 'none');
                $level1
                    .css('opacity', '0')
                    .css('pointer-events', 'none');
            } else {
                memoryGame.targettedMatches = 8;
                memoryGame.levelSelected = 1;
                $level3
                    .css('pointer-events', 'none')
                    .css('opacity', '0');
                $level2
                    .css('opacity', '0')
                    .css('pointer-events', 'none');
                $level1
                    .css('pointer-events', 'none');
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