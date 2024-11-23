window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    /*if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scroll-btn").style.display = "block";
    } else {
        document.getElementById("scroll-btn").style.display = "none";
    }*/
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    console.log(document.documentElement.scrollTop)
    console.log(document.body.scrollTop)
    document.body.scrollTop = 0;            // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}