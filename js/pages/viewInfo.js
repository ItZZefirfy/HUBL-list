// функция поиска уровня по ID в списке
function getLevelPosition(list, id) {
    for (var i = 0; i < list.length; i++)
        if (id == list[i]["levelID"])
            return i + 1
    
    return 0
}

//функция для подсчета очков за уровень
function getLevelPoints(position, verifier) {
    if (Number(position) > 10) {
        if (verifier) {
            return 200
        } else {
            return 100
        }
    }

    let points = [3000, 2500, 2000, 1500, 1000, 
                    600, 500, 400, 300, 200][Number(position) - 1]

    
    if (verifier) {
        console.log("---", points*2)
        return points*2
    }
    console.log("---", points)
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

// открывает страницу с информацией об игроке
function viewPlayerInfo(name) {

}