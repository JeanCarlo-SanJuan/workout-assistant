const defaultCount = 30;
const delay = 1000;

categories = {
    warmup : "0",
    conditioning: "1",
    cooldown: "2"
}

const timer = {
    container : $("#timer"),
    span : $("#timer-span"),
    music : $("#timer-song"),
    count : defaultCount,
    lastcount : defaultCount,
    isRunning : false,
    isEditing : false,
    category : categories.warmup,
    set : 1,
    Audio : null,
    re : /\d+/,
    filterInput : function() {
        timer.count = timer.re.exec(timer.span.innerText)

        if (timer.count <= 0) {
            timer.count = timer.lastcount;
        }

        timer.lastcount = timer.count
        console.log("Timer set:", timer.count)
        timer.update()

        timer.isEditing = false
    }

    , reset: function() {
        timer.count = timer.lastcount
        timer.Audio.currentTime = 0;
        timer.update()
    }
    , update: function() {
        timer.span.innerText = timer.count
    }

    ,countdown : function() {
        if(timer.count == 0) {
            timer.reset()
        } else {
            timer.count--
            timer.update()
        }
    }
    , stop: function() {
        clearInterval(timer.isRunning)
        timer.isRunning = false;
        timer.container.removeAttribute("active")
        timer.Audio.pause()
    }
    , start: function() {
        timer.isRunning = setInterval(timer.countdown, delay)
        timer.container.toggleAttribute("active")
        timer.Audio.play()
    }
    , activate: function() {
            if (timer.isEditing) {
            return
        }

        (timer.isRunning) ? timer.stop(): timer.start()
    }
}
 
/* timer.span.addEventListener("input", e => {
    setTimeout(timer.filterInput,delay)
}) */

timer.span.addEventListener("focus", e => {
    timer.isEditing = true;
    timer.stop()
});

timer.span.addEventListener("focusout", timer.filterInput)

window.addEventListener("keyup", e => {
    switch(e.code) {
        case "Space":
            timer.activate()
            break;
        case "Escape":
            timer.stop()
            timer.reset()
            break;
        case "Tab":
            break;
        case "Enter":
            if (timer.isEditing) {
                timer.span.blur()
            }
    }
})

function main() {
    timer.span.innerText = timer.count;
    
}

window.addEventListener("load", main)

const song_icon = $("#song-icon");
song_icon.addEventListener("click", e => {
    picker.click()
})