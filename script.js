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
        setOutcome();
        userHpUpdate(score.user);
        pcHpUpdate(score.pc);
        $(".moveset button").prop("disabled", true);
        setTimeout( function() {
            $(".moveset button").prop("disabled", false);
        }, 2000);
        gameEnd();
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
        }
    };

    //HP Bar
    let score = {
        user: 5,
        pc: 5
    };

    function userHpUpdate(hp) {
        $(".remainingHpUser").css("width", `${hp * 2}0%`);
    };

    function pcHpUpdate(hp) {
        $(".remainingHpPc").css("width", `${hp * 2}0%`);
    };



    // Append Log Outcome

    function logOutput(printLog) {
        $("ul.eventLog").append(`
        <li>${printLog}
        </li>
        `);
    }


    function appendLog(a, b) {
        
        logOutput(`User plays ${a}, PC plays ${b}.`);

        let userV = "user";
        let pcV = "pcFlip";
        
        if (a == b){
            logOutput("Draw! Keep going!");
            sprite(userV, tieGif, tieRandom());
            sprite(pcV, tieGif, tieRandom());
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
        }
    };


    function winnerLoser(x, y) {
        if (x.score === 0) {
            spriteWin(y, finishGif, finishRng());
            spriteWin(x, downGif, 2).delay(10000);
        } else if (y.score === 0) {
            spriteWin(x, finishGif, finishRng());
            spriteWin(y, downGif, 2).delay(10000);
        } else {
            sprite(x, hitGif, hitRandom());
            sprite(y, downGif, winRandom());
        };
    };




    // Animation Sprite

    function sprite(player, match, gifSet) {
        $(`img.${player}`).remove();

        $(`.action.${player}`).html(`<img class="${player}" src='assets/${match[gifSet].gif}'></img>`);

        setTimeout( function() {
            $(`img.${player}`).remove();
            $(`.standby.${player}`).html(`<img class="${player}" src="assets/player-stance.gif">`);
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
    }

    let hitRng = 0;

    function hitRandom() {
        hitRng = Math.floor(Math.random() * 3);
        return hitRng;
    };

    let winRng = 0;
    
    function winRandom() {
        winRng = Math.floor(Math.random() * 2);
        return winRng;
    }

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
    ];
    
    let finishGif = [
        {
            gif: "player-special-kick.gif",
            delay: 3000,
        },
        {
            gif: "player-shoryuken.gif",
            delay: 3000,
        },
        {
            gif: "player-special-beam",
            delay: 9000,
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
            gif: "player-guard.gif",
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
        if (score.user === 0 || score.pc === 0) {
            $(".moveset button").prop("disabled", true);
            if (score.user === 0) {
                logOutput(`<b>YOU WIN!</b>`);
                spriteWin("user", winGif, winRandom());
                spriteWin("pcFlip", downGif, 2);
            } else if (score.pc === 0) {
                logOutput(`<b>YOU LOSE!</b>`);
                spriteWin("pcFlip", winGif, winRandom());
                spriteWin("user", downGif, 2);
            };
        };
    }

    
    //Reset Button
    $(".reset").on("click", function() {
        score.pc = 5;
        score.user = 5;
        userHpUpdate(score.user);
        pcHpUpdate(score.pc);
        $("ul.eventLog").html("");
        $("button").prop("disabled", false);
        resetGif("user");
        resetGif("pcFlip");
    });
    
    //Gif Reset
    function resetGif(player) {
        $(`img.${player}`).remove();
        $(`.standby.${player}`).html(`<img class="${player}" src="assets/player-stance.gif">`);
    };
});