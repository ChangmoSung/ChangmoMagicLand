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
        url: "assets/mickey-mouse.png",
        alt: "mickey mouse",
        id: 'mickeymouse',
        text: 'It is kind of fun to do the impossible'
    },
    {
        url: "assets/mickey-mouse.png",
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
    })
    
    $('.container').one('click', '.card', () => {
        const timeChecker = () => {
            timer--;
            $('.timer').text(`TIME: ${timer}`);
            
            if (timer === 0 || targettedMatches === numberOfMatches) {
                gameOver = true;
                $('.container').css('pointer-events', 'none');
                clearInterval(interval);

                setTimeout(() => {
                    $('.gameBoard').empty();

                    const resultDescription = `
                        <div class="result">
                            <h2>RESULT</h2>
                            <p>You tried ${count} times and got ${numberOfMatches} matched</p>
                            <button class="playAgain">PLAY AGAIN</button>
                        </div>
                    `;

                    $('.gameBoard').append(resultDescription);
                    $('.textMatch').text('YOU ARE THE BEST!!');
                    $('.playAgain').on('click', () => {
                        location.reload();
                    })
                }, 2500)
            }
        }

        let lessThan15Seconds = false;
        $('.bonusTime').one('click', () => {
            lessThan15Seconds = true;
            if(timer < 15 && lessThan15Seconds) {
                timer += 10;
            }
        })

        const interval = setInterval(() => {
            timeChecker();
        }, 1000);
    })


    $('.card').on('click', function() {
        if(!gameOver) {
            userFlippedCard = !userFlippedCard;

            if (userFlippedCard) {
                firstPick = $(this).css('pointer-events', 'none').addClass('flipped');

            } else {
                secondPick = $(this).addClass('flipped');
                $('.card').css('pointer-events', 'none');

                count++;
                $('.count').text(`COUNT: ${count}`)
            }

            if (firstPick.attr('id') === secondPick.attr('id') && !userFlippedCard) {
                numberOfMatches++;

                $('.card').css('pointer-events', 'auto');

                firstPick.addClass('matched').css('pointer-events', 'none');
                secondPick.addClass('matched').css('pointer-events', 'none');

                firstPick = '';
                secondPick = '';

                if ($('.card').hasClass('matched')) {
                    $('.matched').css('pointer-events', 'none');

                    cards.filter(card => {
                        if(card.id === $(this).attr('id')) {
                            $('.textMatch').text(card.text).css('opacity', '1');

                            const snowFlakeDiv = $('<div>').addClass('snowFlake');
                            const snowImg = new Image();
                            snowImg.src = 'assets/unnamed.png';
                            snowFlakeDiv.append(snowImg);
                            $('.elsa').append(snowFlakeDiv);

                            const matchAudio = new Audio(`${card.audio}`);
                            matchAudio.play();

                            setTimeout(() => {  
                                snowFlakeDiv.fadeOut('fast');
                            },1500)
                        }
                    })

                } else {
                    $('.card').css('pointer-events', 'auto');
                }

            } else {
                setTimeout(() => {
                    firstPick.removeClass('flipped').css('pointer-events', 'auto');
                    secondPick.removeClass('flipped').css('pointer-events', 'auto');

                    firstPick = '';
                    secondPick = '';

                    $('.card').css('pointer-events', 'auto');
                    $('.matched').css('pointer-events', 'none');
                    
                }, 500);
            }
        }  
    })
}


memoryGame.getCards = function() {
    cards.forEach(card => {
        const cardContainer = $('<div>');
    
        if(timer === 30) {
            cardContainer.addClass('card level3').attr('id', `${card.id}`);
        } else if (cards.length === 20) {
            cardContainer.addClass('card level2').attr('id', `${card.id}`);
        } else{
            cardContainer.addClass('card').attr('id', `${card.id}`);
        }

        const frontImg = $('<img>').addClass('front').attr('src', `${card.url}`);

        const backImg = $('<img>').addClass('back').attr('src', 'assets/disney-castle.png');

        cardContainer.append(frontImg, backImg);

        $('.container').append(cardContainer);
    })
    
    memoryGame.checkCards();
}


memoryGame.shuffle = function shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    memoryGame.getCards();
}


memoryGame.prepareToStart = function() {
    $('.gameStart button').on('click', () => {

        // const welcomeAudio = new Audio('assets/KakaoTalk_Audio_2020-02-09-15-23-49.m4a');
        // welcomeAudio.play();

        $('.descriptionContainer').fadeOut();
        $('.title').css('transform', 'translateY(-100%)');
        
        setTimeout(() => {
            $('.gameBoard').css('display', 'block')
            $('.container').css('display', 'flex');
            $('.clock').css('display', 'flex');
            $('.count').text('COUNT: 0');
            $('.timer').text(`TIME: ${timer}`);
            $('.alidin').css('opacity', '1');
            $('.elsa').css('opacity', '1');
            
            memoryGame.shuffle(cards);
        }, 500);
    });
};


let timer;
let targettedMatches = 0;

memoryGame.init = function() {
    const level1 = $('.level1');
    const level2 = $('.level2');
    const level3 = $('.level3');
    let levelSelected = false;

    level1.on('click', function() {
        levelSelected = true;
        targettedMatches = 8;

        if (levelSelected) {
            const numberOfLevel1Cards = $(this).attr('data-cardNumber');
            const level1Cards = cards.slice(0, numberOfLevel1Cards);
            const level1Time = $(this).attr('data-time');

            cards = level1Cards;
            timer = level1Time;

            level1
                .css('pointer-events', 'none');

            level2
                .css('opacity', '0')
                .css('pointer-events', 'none');

            level3
                .css('opacity', '0')
                .css('pointer-events', 'none');

            memoryGame.prepareToStart();
        }
    })

    level2.on('click', function () {
        levelSelected = true;
        targettedMatches = 10;

        if (levelSelected) {
            const numberOfLevel2Cards = $(this).attr('data-cardNumber');
            const level2Cards = cards.slice(0, numberOfLevel2Cards);
            const level2Time = $(this).attr('data-time');

            cards = level2Cards;
            timer = level2Time;

            level1
                .css('opacity', '0')
                .css('pointer-events', 'none');

            level2
                .css('pointer-events', 'none');

            level3
                .css('opacity', '0')
                .css('pointer-events', 'none');

            $('.container').addClass('level2CardWidth');

            memoryGame.prepareToStart();
        } 
    })

    level3.on('click', function () {
        levelSelected = true;
        targettedMatches = 10;

        if(levelSelected) {
            const numberOfLevel3Cards = $(this).attr('data-cardNumber');
            const level3Cards = cards.slice(0, numberOfLevel3Cards);
            const level3Time = $(this).attr('data-time');
            
            cards = level3Cards;
            timer = level3Time;

            level1
                .css('opacity', '0')
                .css('pointer-events', 'none');

            level2
                .css('opacity', '0')
                .css('pointer-events', 'none');

            level3
                .css('pointer-events', 'none');

            memoryGame.prepareToStart();
        }
    })

    $('.gameStart button').on('click', function() {
        if(!levelSelected) {
            alert('select level!!');
        };
    });
};


$(function() {
    memoryGame.init();
});