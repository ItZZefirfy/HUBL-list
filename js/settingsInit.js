if (localStorage.getItem("x") == null){
    // значения по умолчанию
    var effects = 0
    var newsVisibility = 1
    var levelIDVisibility = 1

    localStorage.setItem("effects", effects)
    localStorage.setItem("newsVisibility", levelIDVisibility)
    localStorage.setItem("levelIDVisibility", levelIDVisibility)
    
    // хз зачем, но убирать нельзя
    localStorage.setItem("x", 1)

} else {
    // чтение значений из localStorage
    var effects = Number(localStorage.getItem("effects"))
    var newsVisibility = Number(localStorage.getItem("newsVisibility"))
    var levelIDVisibility = Number(localStorage.getItem("levelIDVisibility"))
}