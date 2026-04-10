window.onload = function () {
    startTyping();
    startCountdown();
    setAccordion();
    setScrollReveal();
};

function startTyping() {
    var text = "We're getting\nmarried!";
    var target = document.getElementById("typingText");
    var loadingWrap = document.getElementById("loadingWrap");
    var pageWrap = document.getElementById("pageWrap");
    var i = 0;

    function typing() {
        if (i < text.length) {
            if (text.charAt(i) == "\n") {
                target.innerHTML += "<br />";
            } else {
                target.innerHTML += text.charAt(i);
            }
            i++;
            setTimeout(typing, 90);
        } else {
            setTimeout(function () {
                loadingWrap.style.transition = "opacity 0.4s";
                loadingWrap.style.opacity = "0";

                setTimeout(function () {
                    loadingWrap.style.display = "none";
                    pageWrap.className = "";
                }, 400);
            }, 500);
        }
    }

    typing();
}

function startCountdown() {
    var weddingDate = new Date("2026-09-20T12:30:00");

    function update() {
        var now = new Date();
        var gap = weddingDate - now;

        if (gap < 0) gap = 0;

        var days = Math.floor(gap / (1000 * 60 * 60 * 24));
        var hours = Math.floor((gap / (1000 * 60 * 60)) % 24);
        var minutes = Math.floor((gap / (1000 * 60)) % 60);
        var seconds = Math.floor((gap / 1000) % 60);

        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;
    }

    update();
    setInterval(update, 1000);
}

function setAccordion() {
    var buttons = document.getElementsByClassName("acc-btn");

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            var content = this.nextElementSibling;

            if (content.style.display == "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        };
    }
}



function setScrollReveal() {
    var sections = document.getElementsByClassName("reveal-section");

    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    entries[i].target.className += " show";
                    observer.unobserve(entries[i].target);
                }
            }
        }, {
            threshold: 0.15
        });

        for (var j = 0; j < sections.length; j++) {
            observer.observe(sections[j]);
        }
    } else {
        window.onscroll = function () {
            for (var k = 0; k < sections.length; k++) {
                var rect = sections[k].getBoundingClientRect();
                if (rect.top < window.innerHeight - 80) {
                    if (sections[k].className.indexOf("show") === -1) {
                        sections[k].className += " show";
                    }
                }
            }
        };

        window.onscroll();
    }
}