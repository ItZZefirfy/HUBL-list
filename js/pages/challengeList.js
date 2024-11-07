function generateLevelElement (name, creator, videoURL, imageURL, position) {
    var image = '<img class="level-image" src="' + imageURL + '" alt="" height="100px">'
    if (videoURL != false) {
        var link = '<a href="' + videoURL + '" target="_blank">' + image + '</a>'
    } else {
        var link = image
    }
    
    
    var text = '<div class="level-text"><h1>#' + position + ' - ' + name + '</h1><h3>' + creator + '</h3></div>'
    var result = '<div class="level">' + link + text + '</div>'

    return result
}

function pasteLevelElement(text) {
    var levelsWrapper = document.getElementById('levels-wrapper')
    levelsWrapper.innerHTML = text + levelsWrapper.innerHTML
}

var level;
var levelData;

for (var i = challenges.length-1; i > -1; i--) {
    levelData = challenges[i]
    level = generateLevelElement(levelData["name"], 
                                 levelData["creator"], 
                                 levelData["videoURL"], 
                                 levelData["imageURL"], 
                                 i + 1)
    //logs
    console.log(level)
    console.log(levelData)
    
    pasteLevelElement(level)
}

delete level