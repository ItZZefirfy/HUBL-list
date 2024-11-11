

function addLevels(type) {
    fetch(links[type])
    .then(levels => levels.json())
    .then(levels => {
        console.log(levels)
        var level;
        var levelData;

        function generateLevelElement (name, creator, videoURL, imageURL, position, LevelId) {
            var image = '<img class="level-image" src="' + imageURL + '" alt="">'
            if (videoURL != false) {
                var link = '<a href="' + videoURL + '" target="_blank">' + image + '</a>'
            } else {
                var link = image
            }
            
        
            var copyId = 'onclick="navigator.clipboard.writeText(\'' + LevelId + '\')"'
            var text = '<div class="level-text"><h1>#' + position + ' - ' + name + '</h1><h3>' + creator + '</h3><h3 class="copyIdIcon" ' + copyId + '>ID: ' + LevelId + ' <i class="bx bx-copy"></i></h3></div>'
            //<h3>ID: ' + LevelId + '</h3><i class="bx bx-copy copyIdIcon" ' + copyId + '</i>
            var result = '<div class="level">' + link + text + '</div>'
        
            return result
        }
        
        function pasteLevelElement(text) {
            var levelsWrapper = document.getElementById('levels-wrapper')
            levelsWrapper.innerHTML = text + levelsWrapper.innerHTML
        }

        for (var i = levels.length-1; i > -1; i--) {
            levelData = levels[i]
            level = generateLevelElement(levelData["name"], 
                                        levelData["creator"], 
                                        levelData["videoURL"], 
                                        levelData["imageURL"], 
                                        i + 1,
                                        levelData["levelID"])
            //logs
            console.log(level)
            console.log(levelData)
            
            pasteLevelElement(level)
        }
        
        delete level
    })
}