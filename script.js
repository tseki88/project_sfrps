$(function() {



    // Computer RNG function
    let pcInput = "";

    function pcRng() {
        pcInput = Math.floor(Math.random() * 3);
        return pcInput;
    };


    // On click return button ID (playerInput)
    // Executes Game
    let userInput = "";

    $(".moveset button").on("click", function() {
        userInput = $(this).attr("value");
        pcRng();
        $(".moveset button").prop("disabled", true);
        setOutcome();
        // userHpUpdate(score.user);
        // pcHpUpdate(score.pc);
        if (score.pc != 0 && score.user != 0) {
            setTimeout(function() {
                $(".moveset button").prop("disabled", false);
            }, 3000);
        } else {
            gameEnd();
        };
    });

    // $(".moveset button").on("click", function() {
    // });


    const setOutcome = function() {
        const a = inputToString(parseInt(userInput));
        const b = inputToString(pcInput);
        appendLog(a, b);
    };

    //Used to convert playerInput for Log
    function inputToString(x) {
        switch(x){
            case 0:
                return "Rock";
                break;
    
            case 1:
                return "Paper";
                break;
    
            case 2:
                return "Scissor";
                break;
        };
    };

    //HP Bar
    let score = {
        user: 5,
        pc: 5,
    };

    function userHpUpdate(hp) {
        $(".remainingHpUser").css("width", `${hp * 2}0%`);
    };

    function pcHpUpdate(hp) {
        $(".remainingHpPc").css("width", `${hp * 2}0%`);
    };



    // Append Log Outcome

    function logOutput(printLog) {
        $("ul.eventLog").prepend(`
        <li>${printLog}
        </li>
        `);
    };


    function appendLog(a, b) {
        
        logOutput(`User plays ${a}, PC plays ${b}.`);

        let userV = "user";
        let pcV = "pcFlip";
        
        if (a == b){
            logOutput("Draw! Keep going!");
            sprite(userV, tieGif, tieRandom());
            sprite(pcV, tieGif, tieRandom());
            setTimeout(function() {
                $(".moveset button").prop("disabled", false);
            }, 2000);
        } else if (a == "Rock"){
            if (b == "Paper"){
                logOutput("Paper beats rock, you lose");
                score.user -= 1;
                winnerLoser(pcV, userV);
            } else {
                logOutput("Rock beats scissor, you win!");
                score.pc -= 1;
                winnerLoser(userV, pcV);
            }
        } else if (a == "Paper"){
            if (b == "Rock"){
                logOutput("Paper beats rock, you win!");
                score.pc -= 1;
                winnerLoser(userV, pcV);
            } else {
                logOutput("Scissor beats paper, you lose");
                score.user -= 1;
                winnerLoser(pcV, userV);
            }
        } else if (a == "Scissor") {
            if (b == "Rock"){
                logOutput("Rock beats scissor, you lose");
                score.user -= 1;
                winnerLoser(pcV, userV);
            } else {
                logOutput("Scissor beats paper, you win!");
                score.pc -= 1;
                winnerLoser(userV, pcV);
            }
        };
    };


    function winnerLoser(x, y) {
        userHpUpdate(score.user);
        pcHpUpdate(score.pc);
        //need a way to access score 

        let checkX = x;

        switch (checkX) {
            case "user":
                checkX = score.user;
                break;
            case "pcFlip":
                checkX = score.pc;
                break;
            default:
                break;
        };

        let checkY = y;

        switch (checkY) {
            case "user":
                checkY = score.user;
                break;
            case "pcFlip":
                checkY = score.pc;
                break;
            default:
                break;
        };

        if (checkX == 0) {
            // setTimeout(() => {
                spriteWin(y, finishGif, finishRandom());
                spriteWin(x, downGif, 3);
            // },0);
        } else if (checkY == 0) {
            // setTimeout(() => {
                spriteWin(x, finishGif, finishRandom());
                spriteWin(y, downGif, 3);
            // },0);
        } else {
            sprite(x, hitGif, hitRandom());
            sprite(y, downGif, downRandom());
        };
    };




    // Animation Sprite

    function sprite(player, match, gifSet) {
        $(`img.${player}`).remove();

        $(`.action.${player}`).html(`<img class="${player}" src='assets/${match[gifSet].gif}'></img>`);

        setTimeout( function() {
            $(`img.${player}`).remove();
            $(`.standby.${player}`).html(`<img class="${player}" src="assets/player-stance.gif"></img>`);
        }, match[gifSet].delay);
    };



    // When Game Ends, the standby-sprite doesn't reset
    function spriteWin(player, match, gifSet) {
        $(`img.${player}`).remove();

        $(`.action.${player}`).html(`<img class="${player}" src='assets/${match[gifSet].gif}'></img>`);
    };



    // Gif Randomizers
    let tieRng = 0;
    
    function tieRandom() {
        tieRng = Math.floor(Math.random() * 2);
        return tieRng;
    };

    let hitRng = 0;

    function hitRandom() {
        hitRng = Math.floor(Math.random() * 5);
        return hitRng;
    };

    let winRng = 0;
    
    function winRandom() {
        winRng = Math.floor(Math.random() * 2);
        return winRng;
    };

    let downRng = 0;

    function downRandom() {
        downRng = Math.floor(Math.random() * 3);
        return downRng;
    };

    let finishRng = 0;

    function finishRandom() {
        finishRng = Math.floor(Math.random() * 3);
        return finishRng;
    };

    // Gif Array Sets
    let tieGif = [
        {
            gif: "player-punch.gif",
            delay: 2000,
        },
        {
            gif: "player-kick.gif",
            delay: 2000,
        },
    ];
    
    let hitGif = [
        {
            gif: "player-finish-kick.gif",
            delay: 3000,
        },
        {
            gif: "player-finish-punch.gif",
            delay: 3000,
        },
        {
            gif: "player-beam.gif",
            delay: 3000,
        },
        {
            gif: "player-shoryuken.gif",
            delay: 3000,
        },
        {
            gif: "player-special-kick.gif",
            delay: 3000,
        },
    ];
    
    let finishGif = [
        {
            gif: "player-finish-kick2.gif",
            delay: 7700,
        },
        {
            gif: "player-special-beam.gif",
            delay: 7700,
        },
        {
            gif: "player-special-punch.gif",
            delay: 8000,
        },
    ];

    let winGif = [
        {
            gif: "player-win.gif",
        },
        {
            gif: "player-win2.gif"
        },
    ];

    let downGif = [
        {
            gif: "player-down2.gif",
            delay: 3000,
        },
        {
            gif: "player-down3.gif",
            delay: 3000,
        },
        {
            gif: "player-down.gif",
            delay: 3000,
        },
        {
            gif: "player-down-final.gif",
        },
    ];

    //Button Disable Function
    function gameEnd() {
        setTimeout(function() {
            $(".moveset button").prop("disabled", true);
            if (score.user === 0 || score.pc === 0) {
                if (score.pc === 0) {
                    logOutput(`<b>WIN!</b>`);
                    logOutput(`<b>YOU</b>`);
                    spriteWin("user", winGif, winRandom());
                    spriteWin("pcFlip", downGif, 3);
                } else if (score.user === 0) {
                    logOutput(`<b>LOSE!</b>`);
                    logOutput(`<b>YOU</b>`);
                    spriteWin("pcFlip", winGif, winRandom());
                    spriteWin("user", downGif, 3);
                };
            };
        }, 8000);
    };


    //Refresh Countdown
    function countdown() {
        $("ul.eventLog").html("<li>Refreshing Game</li>");
        setTimeout(() => {
            $("ul.eventLog").append("<li>4</li>").delay(1000);
        }, 1000);
        setTimeout(() => {
            $("ul.eventLog").append("<li>3</li>").delay(1000);
        }, 2000);
        setTimeout(() => {
            $("ul.eventLog").append("<li>2</li>").delay(1000);
        }, 3000);
        setTimeout(() => {
            $("ul.eventLog").append("<li>1</li>").delay(1000);
        }, 4000);
    };
    
    //Reset Button
    $(".reset").on("click", function() {
        score.pc = 5;
        score.user = 5;
        countdown();
        setTimeout(() => {
            userHpUpdate(score.user);
            pcHpUpdate(score.pc);
            $("ul.eventLog").html("");
            $("button").prop("disabled", false);
            resetGif("user");
            resetGif("pcFlip");
        }, 5000);
    });
    
    //Gif Reset
    function resetGif(player) {
        $(`img.${player}`).remove();
        $(`.standby.${player}`).html(`<img class="${player}" src="assets/player-stance.gif">`);
    };
});