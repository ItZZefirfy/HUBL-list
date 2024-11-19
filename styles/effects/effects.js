function addSnow (count, element) {
    var snow = '<div class="snow"></div>'
    
    for (var i = 0; i < count; i++) {
        element.innerHTML = snow + element.innerHTML
    }
}
