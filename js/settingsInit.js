if (localStorage.getItem("x") == null){
    var effects = 0
    var newsVisibility = 1
    var levelIDVisibility = 1

    localStorage.setItem("effects", effects)
    localStorage.setItem("newsVisibility", levelIDVisibility)
    localStorage.setItem("levelIDVisibility", levelIDVisibility)
    
    localStorage.setItem("x", 1)

} else {
    var effects = Number(localStorage.getItem("effects"))
    var newsVisibility = Number(localStorage.getItem("newsVisibility"))
    var levelIDVisibility = Number(localStorage.getItem("levelIDVisibility"))
}