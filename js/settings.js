if (Boolean(effects)) {
    document.getElementById("effects-option").className = "checkbox checkbox-selected"
} else {
    document.getElementById("effects-option").className = "checkbox"
}

if (Boolean(newsVisibility)) {
    document.getElementById("news-visible-option").className = "checkbox checkbox-selected"
} else {
    document.getElementById("news-visible-option").className = "checkbox"
}

if (Boolean(newsVisibility)) {
    document.getElementById("levelID-option").className = "checkbox checkbox-selected"
} else {
    document.getElementById("levelID-option").className = "checkbox"
}


document.getElementById("effects-option").onclick = function () {
    let effects_options = document.getElementById("effects-option")
    if (effects) {
        effects_options.className = "checkbox"
        effects = false
    } else {
        effects_options.className = "checkbox checkbox-selected"
        effects = true
    }
}

document.getElementById("news-visible-option").onclick = function () {
    let effects_options = document.getElementById("news-visible-option")
    if (newsVisibility) {
        effects_options.className = "checkbox"
        newsVisibility = false
    } else {
        effects_options.className = "checkbox checkbox-selected"
        newsVisibility = true
    }
}

document.getElementById("levelID-option").onclick = function () {
    let effects_options = document.getElementById("levelID-option")
    if (levelIDVisibility) {
        effects_options.className = "checkbox"
        levelIDVisibility = false
    } else {
        effects_options.className = "checkbox checkbox-selected"
        levelIDVisibility = true
    }
}

document.getElementById("submit").onclick = function () {
    localStorage.setItem("effects", Number(effects))
    localStorage.setItem("newsVisibility", Number(newsVisibility))
    localStorage.setItem("levelIDVisibility", Number(levelIDVisibility))

    //console.log(localStorage.getItem("effects"), localStorage.getItem("newsVisibility"), localStorage.getItem("levelIDVisibility"))
}