
function addPlayer_interface(name, points, position, icon) {
    var wrapper = document.getElementById("players-wrapper")

    if (icon == false) {
        var result = `<div class="player">
                    <img src="https://raw.githubusercontent.com/ItZZefirfy/HUBL-DataBase/refs/heads/players-system-test/icons/--default--.png" alt="">
                    <div class="player-text-wrapper">
                        <h1>#${position} - ${name}</h1>
                        <h3>${points} <span>points</span></h3>
                    </div>
                </div>`
    } else {
        var result = `<div class="player">
                    <img src="https://raw.githubusercontent.com/ItZZefirfy/HUBL-DataBase/refs/heads/players-system-test/icons/${icon}" alt="">
                    <div class="player-text-wrapper">
                        <h1>#${position} - ${name}</h1>
                        <h3>${points} <span>points</span></h3>
                    </div>
                </div>`
    }
    

    wrapper.innerHTML = wrapper.innerHTML + result
}

function addPlayers_Code(players, demons, challenges) {
    var levels
    var points
    for (var i = 0; i < players.length; i++) {
        levels = players[i].levels
        players[i].points = 0

        for (var j = 0; j < levels.length; j++) {
            if (getLevelPosition(demons, levels[j][0]) != 0) {
                points = getLevelPoints(
                            getLevelPosition(
                                demons, 
                                levels[j][0]
                            ), 
                            levels[j][1]
                        )
            } else {
                points = getLevelPoints(
                    getLevelPosition(
                        challenges, 
                        levels[j][0]
                    ), 
                    levels[j][1]
                )
            }
            players[i].points += points

        }
    }

    players.sort(function (a, b) {
        if (a.points > b.points) {
            return -1;
          }
          if (a.points < b.points) {
            return 1;
          }
          // a должно быть равным b
          return 0;
    })

    console.log(players)

    for (var i = 0; i < players.length; i++) {
        addPlayer_interface(players[i].name, players[i].points, i + 1, players[i].icon)
    }
}

function getChallengelist(players, demons) {
    fetch(links["challengelist"])
    .then(challenges => challenges.json())
    .then(challenges => {
        addPlayers_Code(players, demons, challenges)
    })
}

function getDemonlist(players) {
    fetch(links["demonlist"])
    .then(demons => demons.json())
    .then(demons => {
        getChallengelist(players, demons)
    })
}

function addPlayers() {
    fetch(links["players"])
    .then(players => players.json())
    .then(players => {
        getDemonlist(players)
    })
}