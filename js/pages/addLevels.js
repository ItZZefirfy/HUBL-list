function copyLevelId(ID) {
    navigator.clipboard.writeText(`${ID}`)
    // вскоре здесь будет больше кода 
}

function addLevels(type) {
    // type - ссылка на бд, а точнее элемент в словаре /js/BD.js
    fetch(links[type])
    .then(levels => levels.json())
    .then(levels => {
        var level;
        var levelData;

        function generateLevelElement (name, creator, videoURL, imageURL, position, LevelId) {
            // проверка на наличие видео
            if (videoURL != false) {
                var link = `<a class="level-image" href="${videoURL}" target="_blank"><img src="${imageURL}" alt=""></a>`
            } else {
                var link = `<div class="level-image"><img src="${imageURL}" alt=""></div>`
            }

            if (levelIDVisibility) {
                var id = `<h3>ID: ${LevelId}</h3>`
            } else {
                var id = ''
            }
            
            //сборка элемента
            if (type == "demonlist") {
                return `<div class="level">${link}
                    <div class="level-text" onclick="viewDemonInfo(${levelData["levelID"]})">
                    <h1>#${position} - ${name}</h1><h3>${creator}</h3>
                    ${id}</div></div>`
            } else if (type == "challengelist") {
                return `<div class="level">${link}
                    <div class="level-text" onclick="viewChallengeInfo(${levelData["levelID"]})">
                    <h1>#${position} - ${name}</h1><h3>${creator}</h3>
                    ${id}</div></div>`
            }
        }
        
        function pasteLevelElement(text) {
            var levelsWrapper = document.getElementById('levels-wrapper')
            levelsWrapper.innerHTML = text + levelsWrapper.innerHTML
        }

        for (var i = levels.length-1; i > -1; i--) {
            // добавление элементов на страницу
            levelData = levels[i]
            level = generateLevelElement(levelData["name"], 
                                        levelData["creator"], 
                                        levelData["videoURL"], 
                                        levelData["imageURL"], 
                                        i + 1,
                                        levelData["levelID"])
            
            pasteLevelElement(level)
        }
    })
}