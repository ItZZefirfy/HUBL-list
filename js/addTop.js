function createTop(page) {
    var _DemonlistPageTop = `<a href="index.html" class="logo"><h1>HUBLGDPS</h1>
<a    class="page selected-page" href="DemonList.html">Demonlist</a>
<a    class="page" href="ChallengeList.html">Challengelist</a>
<a    class="page" href="Players.html">Players</a>
<a    class="page" href="index.html">More</a>`
    var _ChallengeListPageTop = `<a href="index.html" class="logo"><h1>HUBLGDPS</h1>
<a    class="page" href="DemonList.html">Demonlist</a>
<a    class="page selected-page" href="ChallengeList.html">Challengelist</a>
<a    class="page" href="Players.html">Players</a>
<a    class="page" href="index.html">More</a>`
    var _MorePageTop = `<a href="index.html" class="logo"><h1>HUBLGDPS</h1>
<a    class="page" href="DemonList.html">Demonlist</a>
<a    class="page" href="ChallengeList.html">Challengelist</a>
<a    class="page" href="Players.html">Players</a>
<a    class="page selected-page" href="index.html">More</a>`
    var _PlayersPageTop = `<a href="index.html" class="logo"><h1>HUBLGDPS</h1>
<a    class="page" href="DemonList.html">Demonlist</a>
<a    class="page" href="ChallengeList.html">Challengelist</a>
<a    class="page selected-page" href="Players.html">Players</a>
<a    class="page" href="index.html">More</a>`


    var top = document.getElementById("top")
    if (page == 0) /* demonlist (page) id */ { 
        top.innerHTML = _DemonlistPageTop + top.innerHTML

    } else if (page == 1) /* challengelist (page) id */{
        top.innerHTML = _ChallengeListPageTop  + top.innerHTML

    } else if (page == 2) /* more (page) id */ {
        top.innerHTML = _MorePageTop + top.innerHTML

    } else if (page == 3) /* players (page) id */ {
        top.innerHTML = _PlayersPageTop + top.innerHTML

    }
}