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
function addLevelInfoContent(levelData, players) {
    document.getElementsByTagName("body")[0].innerHTML +=  `<div id="info-wrapper"></div>`

    let levelInfoContent;
    if (levelData["videoURL"] != false) {
        levelInfoContent = `<div id="level-info">
        <h1>${levelData["name"]}</h1>
        <a href="${levelData["videoURL"]}" target="_blank">
            <img src="${levelData["imageURL"]}">
        </a>
        <h2><span>By</span> ${levelData["creator"]}</h1>
    </div>`
    } else {
        levelInfoContent = `<div id="level-info">
        <h1>${levelData["name"]}</h1>
        <img src="${levelData["imageURL"]}">
        <h2><span>By</span> ${levelData["creator"]}</h1>
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
function loadPlayersContent(levelData, id) {
    fetch(links["players"])
    .then(players => players.json())
    .then(players => selectPlayersForLevelInfo(players, id))
    .then(players => {
        addLevelInfoContent(levelData, players)
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

        loadPlayersContent(levelData, id)
    })
}

// открывает страницу с информацией о челлендже
function viewChallengeInfo(id) {
    document.getElementById("levels-wrapper").remove()

    fetch(links["challengelist"], {method: "GET"})
    .then(demonlist => demonlist.json())
    .then(demonlist => {
        for (let i = 0; i < demonlist.length; i++) {
            if (demonlist[i]["levelID"] != id) {continue}
            var levelData = demonlist[i]
            break
        }

        loadPlayersContent(levelData, id)
    })
}

// открывает страницу с информацией об игроке
function viewPlayerInfo(name) {

}