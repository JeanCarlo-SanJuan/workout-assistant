
class Routine {
    required = ["warm-up", "conditioning", "cooldown"]
    current = $("#current")
    next = $("#next")
    preview = $("#preview-routine")
    categories = {
        warmup : 0,
        conditioning: 1,
        cooldown: 2
    }
    index = 0;
    set = 0;
    /**
     * @param {Object} routine 
     */
    constructor(routine) {
        this.routine = routine;
        this.category = this.categories.cooldown;

        this.update()
        this.set_sidebar()
    }

    verify() {
        for (const r in this.required) {
            if (this.routine[r] === undefined) {
                return false;
            }
        }

        return true;
    }

    get_category_info(key = null) {
        const cat = this.routine[this.required[this.category]]

        return (key === null) ? cat: cat[key]
    }

    set_sidebar() {
        this.preview.innerHTML = "";

        for(const [key, val] of Object.entries(this.get_category_info("items"))) {
            const div = $$("div")
            div.innerText = key;
            this.preview.appendChild(div)
        }
    }
    get_current_exercise() {
        return Object.entries(this.get_category_info("items"))[this.index] 
    }

    nextPic() {
        this.index++

        if (Object.entries(this.get_category_info("items")).length == this.index) {
            this.index = 0
            this.set++
        }

        if(this.set == this.get_category_info("sets")) {
            this.category++
            this.category %= 3
            this.index = 0
            this.set = 0
            this.set_sidebar()
        }

        this.update()
    }

    reset() {
        this.index = 0
    }

    update() {
        const [name, src] = this.get_current_exercise()
        this.current.src = src;
        this.current.alt = name;

        console.log(name);
    }
}


const routine = new Routine({
    "warm-up": {
        "sets": 1,
        "items": {
            "side stretches": "./test-circuit/lita-lewis-wide-toe-touch.gif",
            "Knee hugs (L & R)": "./test-circuit/knee-hugs.gif",
            "Cross body step kicks": "./test-circuit/cross-body-step-kicks.png",
            "Arm Circles (F & B)": "./test-circuit/arm-circles.gif",
            "Cross Arm stretch (L & R)": "./test-circuit/cross-arm-stretch.webp",
            "Side lunges": "./test-circuit/side-lunges.gif",
            "Leg swings": "./test-circuit/leg-swings.gif"
        }
    },
    "conditioning": {
        "sets": 3,
        "items": {
            "Front plank": "",
            "Russian Twist": "",
            "Chest Presses": "./test-circuit/chest-presses.png",
            "Push-ups": "",
            "Squats": "",
            "Standing Bicep Curls": "./test-circuit/bicep-curls.png"
        }
    },
    "cooldown": {
        "sets": 1,
        "items": {
            "Knee-to-chest pose (L & R)": "./test-circuit/knee-to-chest-pose.webp",
            "Seated single-leg hamstring stretch (L & R)": "./test-circuit/seated-single-leg.gif",
            "Seated Forward Bend": "./test-circuit/seated-forward-bend.webp",
            "Hip Flexors": "./test-circuit/hip-flexor.gif"
        }
    }
})