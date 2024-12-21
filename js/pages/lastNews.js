function lastNews(max=5) {
    if (Number(localStorage.getItem("newsVisibility"))) {
        fetch(links["news"])
        .then( news => news.json() )
        .then ( news => {
            var news_wrapper = document.getElementById("news-wrapper")

            // добавление новостей на страницу
            for (var i = news.length-1; i < news.length; i--) {
                news_wrapper.innerHTML += "<div class='news-post'>" + news[i] + "</div>"

                // выход из цикла, когда вывелась #{max} новость 
                if (i == (news.length-1) - (max-1)) {
                    break
                }
            }
        })

    } else {
        // удаление заголовка
        document.getElementById("lastNews").remove()
        document.getElementById("news-wrapper").remove()
    }
}