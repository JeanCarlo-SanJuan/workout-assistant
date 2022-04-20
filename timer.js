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
        this.routine = routine
        this.mp = new MusicPlayer()

        if (count > 0) {
            this.count = count
        } else {
            if (this.routine.current.span > 0) {
                this.count = this.routine.current.span
            } else {
                this.count = this.DEFAULTCOUNT;
            }
            console.log(this.count);
        }

        this.lastCount = this.count

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

        window.addEventListener("click", e => {
            const cn = e.target.classList;
            if (cn == 'timer-resetter') {
                this.stop();
                this.reset();
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

        this.switcher = $(".switcher");
        console.log(this.switcher);
        for (let i = 0; i < 3; i++) {
            this.switcher[i].addEventListener("click", () => {
                this.routine.setState(i);
                this.onChangeCategory();
                this.stop();
                this.reset();
            })
        }

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
        this.setCount(this.lastCount);
        this.mp.reset();
        this.update();
    }

    setCount(count) {
        this.count = count;
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
            let isNewCategory = this.routine.nextPic()
            if (isNewCategory) {
                this.onChangeCategory();
            }

            this.reset()
        } else {
            this.count--
        }

        if(this.count == 1) {
            speechSynthesis.speak(this.routine.speechNext);
        }

        this.update()
    }

    onChangeCategory() {
        const n = this.routine.current.span;
        console.log(n);
        this.lastCount = n;
    }
    activate() {
        if (this.isEditing) {
            return
        }

        (this.isRunning) ? this.stop() : this.start()
    }
}

const timer = new Timer(0, 
    new Routine({
        "warmup": {
            "span": 15,
            "sets": 1,
            "items": {
                "side stretches": { "url": "./test-circuit/lita-lewis-wide-toe-touch.gif", "span": 'd' },
                "Knee hugs (L & R)": { "url": "./test-circuit/knee-hugs.gif", "span": 'd' },
                "Cross body step kicks": { "url": "./test-circuit/cross-body-step-kicks.png", "span": 'd' },
                "Arm Circles": { "url": "./test-circuit/arm-circles.gif", "span": 'd' },
            }
        },
        "conditioning": {
            "span": 32,
            "sets": 1,
            "items": {
                "High knees": {"span":"d", "url":"https://i.pinimg.com/originals/aa/7d/6a/aa7d6ab4ac2195977e69a287ef8003f0.gif"},
                "Froggers": {"span": "d", "url": "https://media1.popsugar-assets.com/files/thumbor/SN6V5JWaQCRZXqM_7knivTPTVPA/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2016/03/24/837/n/1922398/831b594cc2767b2f_Frogger.gif"},
                "Speed Skaters": {"span": "d", "url": "https://i.pinimg.com/originals/67/c2/df/67c2df4b8da2a14c20845f6901525822.gif"},
                "Plank Jack + Knee Tuck": {"span": "d", "url": "https://flabfix.com/wp-content/uploads/2019/08/Plank-Jack-Knee-Tuck.gif"},
                "Mountain Climbers": {"span": "d", "url": "https://www.mitrecsports.com/assets/Mountain-Climbers-Gif.gif"},
                "Squats":
                    { "url": "https://c.tenor.com/jAjshaoXrewAAAAC/sumo-squat-exercise.gif", "span": 'd' }
            }
        },
        "cooldown": {
            "span": 15,
            "sets": 1,
            "items": {
                "Knee-to-chest pose - Left":
                    { "url": "./test-circuit/knee-to-chest-pose.webp", "span": 'd' },
                "Knee-to-chest pose - Right":
                    { "url": "./test-circuit/knee-to-chest-pose.webp", "span": 'd' },
    
                "Hip Flexors - Left": { "url": "./test-circuit/hip-flexor.gif", "span": 'd' },
                "Hip Flexors - Right": { "url": "./test-circuit/hip-flexor.gif", "span": 'd' },
                "Reclining Twist - Right": {"url": "https://media.self.com/photos/57d887a050778cef321a4544/master/w_1600,c_limit/RECLINING_TWIST1.gif", "span": 'd'},
                "Reclining Twist - left": {"url": "https://media.self.com/photos/57d887a050778cef321a4544/master/w_1600,c_limit/RECLINING_TWIST1.gif", "span": 'd'},
                "Back stretch" : {"url" : "https://c.tenor.com/BMnxygm89cwAAAAd/arch-back-stretching.gif"}
            }
        }
    }, 0)
)

/* 
            "items": {
                "side stretches": { "url": "./test-circuit/lita-lewis-wide-toe-touch.gif", "span": 'd' },
                "Knee hugs (L & R)": { "url": "./test-circuit/knee-hugs.gif", "span": 'd' },
                "Cross body step kicks": { "url": "./test-circuit/cross-body-step-kicks.png", "span": 'd' },
                "Arm Circles (F & B)": { "url": "./test-circuit/arm-circles.gif", "span": 'd' },
                "Cross Arm stretch (L & R)": { "url": "./test-circuit/cross-arm-stretch.webp", "span": 'd' },
                "Side lunges": { "url": "./test-circuit/side-lunges.gif", "span": 'd' },
                "Leg swings": { "url": "./test-circuit/leg-swings.gif", "span": 'd' }
            } */
/* window.addEventListener("load", main) */