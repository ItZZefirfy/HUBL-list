/*
            <div class="level">
                <a href="https://www.youtube.com/watch?v=9YYQBbrsV5Y&t" target="_blank">
                    <img class="level-image" src="https://i.ytimg.com/vi/9YYQBbrsV5Y/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD6GDfA-4xwwh0EZIxNt3X3fiZz6Q" alt="" height="100px">
                </a>
                <div class="level-text">
                    <h1>Tartarus</h1>
                    <h3>verified by Dolphy</h3>
                </div>
            </div>        
*/

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

for (var i = levels.length-1; i > -1; i--) {
    levelData = levels[i]
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