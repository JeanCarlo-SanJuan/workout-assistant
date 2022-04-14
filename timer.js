class Timer {
    DEFAULTCOUNT = 30; //
    isTicking = false
    isEditing = false
    RE = /\d+/;

    /**
     * 
     * @param {Number} count 
     * @param {Routine} routine 
     * @param {MusicPlayer} mp
     */
    constructor(count = 0, routine) {
        this.count = (count >= 1) ? count : this.DEFAULTCOUNT
        this.lastCount = this.count

        this.routine = routine
        this.mp = new MusicPlayer()

        const r = new $c("#timer")
        this.root = r.root
        this.label = r.get("span")

        const my = this
        window.addEventListener("keyup", function(e) {
            switch (e.code) {
                case "Space":
                    my.activate()
                    break;
                case "Escape":
                    my.stop()
                    my.reset()
                    break;
                case "Tab":
                    break;
                case "Enter":
                    if (my.isEditing) {
                        my.label.blur()
                    }
                    break;
            }
        })

        this.label.addEventListener("focus", () => {
            this.isEditing = true;
            this.stop()
        });

        this.label.addEventListener("focusout", () => {
            this.filterInput()})

        //todo: make this a configurable feature
        /* this.label.addEventListener("input", e => {
            setTimeout(this.filterInput, delay)
        }) */

        this.update()
    }

    filterInput() {
        this.count = this.RE.exec(this.label.innerText)

        if (this.count <= 0) {
            this.reset()
        } else {
            this.lastCount = this.count
        }

        console.log("Timer set:", this.count)
        this.update()
        this.isEditing = false
    }

    reset() {
        this.count = this.lastCount;
        this.mp.reset();
        this.update();
    }

    update() {
        this.label.innerText = this.count;
    }

    stop() {
        clearInterval(this.isRunning)
        this.isRunning = false;
        this.root.removeAttribute("active")
        this.mp.stop()
    }

    start() {
        const my = this
        this.isRunning = setInterval(function() {my.countDown()}, delay)
        this.root.toggleAttribute("active")
        this.mp.play()
    }

    countDown() {
        if (this.count == 0) {
            this.reset()
            this.routine.nextPic()
        } else {
            this.count--
            this.update()
        }
    }

    activate() {
        if (this.isEditing) {
            return
        }

        (this.isRunning) ? this.stop() : this.start()
    }
}

const timer = new Timer(35, 
    new Routine({
        "warmup": {
            "sets": 1,
            "items": {
                "side stretches": { "url": "./test-circuit/lita-lewis-wide-toe-touch.gif", "span": 'd' },
                "Knee hugs (L & R)": { "url": "./test-circuit/knee-hugs.gif", "span": 'd' },
                "Cross body step kicks": { "url": "./test-circuit/cross-body-step-kicks.png", "span": 'd' },
                "Arm Circles (F & B)": { "url": "./test-circuit/arm-circles.gif", "span": 'd' },
                "Cross Arm stretch (L & R)": { "url": "./test-circuit/cross-arm-stretch.webp", "span": 'd' },
                "Side lunges": { "url": "./test-circuit/side-lunges.gif", "span": 'd' },
                "Leg swings": { "url": "./test-circuit/leg-swings.gif", "span": 'd' }
            }
        },
        "conditioning": {
            "sets": 3,
            "items": {
                "Front plank":
                    { "url": "", "span": 'd' },
                "Russian Twist":
                    { "url": "", "span": 'd' }
                ,
                "Chest Presses": "./test-circuit/chest-presses.png",
                "Push-ups":
                    { "url": "", "span": 'd' }
                ,
                "Squats":
                    { "url": "", "span": 'd' }
                ,
                "Standing Bicep Curls": { "url": "./test-circuit/bicep-curls.png", "span": 'd' }
            }
        },
        "cooldown": {
            "sets": 1,
            "items": {
                "Knee-to-chest pose (L & R)":
                    { "url": "./test-circuit/knee-to-chest-pose.webp", "span": 'd' },
    
                "Seated single-leg hamstring stretch (L & R)": { "url": "./test-circuit/seated-single-leg.gif", "span": 'd' },
                "Seated Forward Bend":
                    { "url": "./test-circuit/seated-forward-bend.webp", "span": 'd' },
                "Hip Flexors":
                    { "url": "./test-circuit/hip-flexor.gif", "span": 'd' }
            }
        }
    })
)

/* window.addEventListener("load", main) */