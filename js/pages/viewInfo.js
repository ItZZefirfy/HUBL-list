function getPlayerLevel(xp) {
    var level = 1
    var xpForLevel = Math.round(Math.pow(level, 1.2)) + 10 * level
    while (xp > xpForLevel) {
        level += 1
        xp -= xpForLevel
        xpForLevel = Math.round(Math.pow(level, 1.2)) + 10 * level
    }

    return [level, xp, xpForLevel]
}

// функция поиска уровня по ID в списке
function getLevelPosition(list, id) {
    for (var i = 0; i < list.length; i++)
        if (id == list[i]["levelID"])
            return i + 1
    
    return 0
}

//функция для подсчета очков за уровень
function getLevelPoints(position, verifier) {
    if (Number(position) > 19) {
        if (verifier) {
            return 2
        } else {
            return 1
        }
    }

    let points = [300, 250, 200, 150, 100, 
                    60, 50, 40, 30, 20, 
                    10, 9, 8, 7, 6, 5, 4, 3, 2][Number(position) - 1]

    
    if (verifier) {
        return points*2
    }
    return points
        
}

// функция выбирает викторов из списка игроков (players) по параметру id - (id уровня)  
function selectPlayersForLevelInfo(players, id) {
    let result = []
    let levels;
    for (let i = 0; i < players.length; i++) {
        levels = players[i]["levels"]
        for (let j = 0; j < levels.length; j++) {
            if (levels[j][0] == id && !levels[j][1]) {
                result.push(players[i]["name"])
            }
        }
    }

    return result
}

// функция добавляет информацию об уровне в пользовательский интерфейс
function addLevelInfoContent(levelData, players, list) {
    document.getElementsByTagName("body")[0].innerHTML +=  `<div id="info-wrapper"></div>`
    
    let levelPosition = getLevelPosition(list, levelData["levelID"])
    let levelPoints = getLevelPoints(levelPosition, false)

    let levelInfoContent;
    if (levelData["videoURL"] != false) {
        levelInfoContent = `<button id="info-back-button" onclick="location.reload()"><i class='bx bx-arrow-back'></i></button>
        <div id="level-info">
        <h1>${"#" + levelPosition + " - " + levelData["name"]}</h1>
        <a href="${levelData["videoURL"]}" target="_blank">
            <img src="${levelData["imageURL"]}">
        </a>
        <div class="flex-row-frame flex-wrap-frame">
            <h2><span>Made by</span> ${levelData["creator"]}</h2>
            <h2><span>Verified by</span> ${levelData["verifier"]}</h2>
            <h2><span>points</span> ${levelPoints}</h2>
            <h2 class="copyIdIcon" onclick="copyLevelId(${levelData["levelID"]})">
                <span>ID:</span> ${levelData["levelID"]} <span><i class="bx bx-copy"></i></span></h2>
        </div>
    </div>`
    } else {
        levelInfoContent = `<button id="info-back-button" onclick="location.reload()"><i class='bx bx-arrow-back'></i></button>
        <div id="level-info">
        <h1>${levelData["name"]}</h1>
        <img src="${levelData["imageURL"]}">
        <div class="flex-row-frame flex-wrap-frame">
            <h2><span>Made by</span> ${levelData["creator"]}</h2>
            <h2><span>Verified by</span> ${levelData["verifier"]}</h2>
            <h2><span>points</span> ${levelPoints}</h2>
            <h2 class="copyIdIcon" onclick="copyLevelId(${levelData["levelID"]})">
                ID: ${levelData["levelID"]} <i class="bx bx-copy"></i></h2>
        </div>
    </div>`
    }

    let victorsContent = '';

    for (let i = 0; i < players.length; i++) {
        victorsContent += `<h3 class="victor">${players[i]}</h3>`
    }

    victorsContent = `<div id="victors">${victorsContent}</div>`

    document.getElementById("info-wrapper").innerHTML += levelInfoContent + "<h1>Victors</h1>" + victorsContent

}

// функция подгружает информацию об игроках и вызывает addLevelInfoContent
function loadPlayersContent(levelData, id, list) {
    fetch(links["players"])
    .then(players => players.json())
    .then(players => selectPlayersForLevelInfo(players, id))
    .then(players => {
        addLevelInfoContent(levelData, players, list)
    })
}

// открывает страницу с информацией о демоне
function viewDemonInfo(id) {
    document.getElementById("levels-wrapper").remove()

    fetch(links["demonlist"], {method: "GET"})
    .then(demonlist => demonlist.json())
    .then(demonlist => {
        for (let i = 0; i < demonlist.length; i++) {
            if (demonlist[i]["levelID"] != id) {continue}
            var levelData = demonlist[i]
            break
        }

        loadPlayersContent(levelData, id, demonlist)
    })
}

// открывает страницу с информацией о челлендже
function viewChallengeInfo(id) {
    document.getElementById("levels-wrapper").remove()

    fetch(links["challengelist"], {method: "GET"})
    .then(challengelist => challengelist.json())
    .then(challengelist => {
        for (let i = 0; i < challengelist.length; i++) {
            if (challengelist[i]["levelID"] != id) {continue}
            var levelData = challengelist[i]
            break
        }

        loadPlayersContent(levelData, id, challengelist)
    })
}

function playerInfoCode(name, players, demons, challenges) {
    document.getElementById("players-wrapper").remove()
    document.getElementsByTagName("body")[0].innerHTML += 
     `<div id="info-wrapper"></div>`
    var wrapper = document.getElementById("info-wrapper")

    var player = "";
    var playerPosition = 0;

    for (var i = 0; i < players.length; i++) {
        if (players[i]["name"] == name) {
            player = players[i]
            playerPosition = i + 1
        }
    }

    player.points = 0

    for (var i = 0; i < player.levels.length; i++) {
        if (getLevelPosition(demons, player.levels[i][0]) != 0) {
            player.points += getLevelPoints(
                getLevelPosition(demons, 
                player.levels[i][0]), 
                player.levels[i][1])
        } else {
            player.points += getLevelPoints(
                getLevelPosition(challenges, 
                player.levels[i][0]), 
                player.levels[i][1])
        }
    }

    var playerLevelClass = ''
    var playerLevel = getPlayerLevel(player.points)
    if (playerLevel[0] < 5) {
        playerLevelClass = `player-level1`
    } else if (playerLevel[0] < 10) {
        playerLevelClass = `player-level2`
    } else if (playerLevel[0] < 15) {
        playerLevelClass = `player-level3`
    } else if (playerLevel[0] < 20) {
        playerLevelClass = `player-level4`
    } else if (playerLevel[0] < 25) {
        playerLevelClass = `player-level5`
    } else {
        playerLevelClass = `player-level6`
    }
    

    var playerInterface = `
    <button id="info-back-button" onclick="location.reload()"><i class='bx bx-arrow-back'></i></button>
    <div class="player-name">
        <h1>#${playerPosition} - ${player.name}</h1>
        <div class="player-xp-info">
            <h3 class="player-level ${playerLevelClass}">level ${playerLevel[0]}</h3>
            <h3>${player.points} points</h3>
        </div>
        <div id="player-level-bar-frame">
            <div id="player-level-bar"></div>
            ${playerLevel[1]}/${playerLevel[2]}
        </div>
    </div>`

    document.querySelector(":root").style.setProperty("--player-level-progress", 
        `${playerLevel[1]/playerLevel[2] * 100}%`)
    wrapper.innerHTML += playerInterface

}

function getChallengelist2(name, players, demons) {
    fetch(links["challengelist"])
    .then(challenges => challenges.json())
    .then(challenges => {
        playerInfoCode(name, players, demons, challenges)
    })
}

function getDemonlist2(name, players) {
    fetch(links["demonlist"])
    .then(demons => demons.json())
    .then(demons => {
        getChallengelist2(name, players, demons)
    })
}

// открывает страницу с информацией об игроке
function viewPlayerInfo(name) {
    fetch(links["players"])
    .then(players => players.json())
    .then(players => {
        getDemonlist2(name, players)
    })
}