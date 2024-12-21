fetch(links["news"])
.then( news => news.json() )
.then ( news => {
    var news_wrapper = document.getElementById("news-wrapper")

    //добавление новостей на страницу
    for (var i = 0; i < news.length; i++) {
        news_wrapper.innerHTML = "<div class='news-post'>" + news[i] + "</div>" + news_wrapper.innerHTML
    }
})