function lastNews(max=5) {
    fetch(links["news"])
    .then( news => news.json() )
    .then ( news => {
        var news_wrapper = document.getElementById("news-wrapper")
        console.log(news)


        for (var i = news.length-1; i < news.length; i--) {
            console.log(news[i])
            news_wrapper.innerHTML += "<div class='news-post'>" + news[i] + "</div>"

            if (i == (news.length-1) - (max-1)) {
                break
            }
        }
    })
}