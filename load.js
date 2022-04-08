
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

    /**
     * @param {Object} routine 
     */
    constructor(routine) {
        /* this.warmup = routine["warm-up"]
        this.conditioning = routine["conditioning"];
        this.cooldown = routine["cooldown"]; */
        this.routine = routine;
        this.category = this.categories.warmup;

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

    get_category() {
        return this.routine[this.required[this.category]]["items"]
    }
    set_sidebar() {
        for(const [key, val] of Object.entries(this.get_category())) {
            const div = $$("div")
            div.innerText = key;
            this.preview.appendChild(div)
        }
    }
    /**
     * @param {Object} targ 
     * @returns 
     */
    get_current() {
        return Object.entries(this.get_category())[this.index] 
    }

    update(i = null) {
        if (i !== null) {
            this.index = i
        }
        const [name, src] = this.get_current()
        //this.get_item(this.routine[this.required[this.category]]);
        this.current.src = src;
        this.alt = name;
    }
}

const routine = new Routine({"warm-up": {
    "sets": 1,
    "items": {
        "side stretches": "./circuit/lita-lewis-wide-toe-touch.gif",
        "Knee hugs (L & R)": "./circuit/knee-hugs.gif",
        "Cross body step kicks" : "./circuit/cross-body-step-kicks.png",
        "Arm Circles (F & B)" : "./circuit/arm-circles.gif",
        "Cross Arm stretch (L & R)" : "./circuit/cross-arm-stretch.webp",
        "Side lunges": "./circuit/side-lunges.gif",
        "Leg swings" : "./circuit/leg-swings.gif"
    }
},
"conditioning": {
    "sets": 3,
    "items": {
        "Front plank" : "",
        "Russian Twist": "",
        "Chest Presses": "./circuit/chest-presses.png",
        "Squats": "",
        "Standing Bicep Curls": "./circuit/bicep-curls.png"
    }
},
"cooldown": {
    "sets": 1,
    "items": {
        "Knee-to-chest pose (L & R)": "./circuit/knee-to-chest-pose.webp",
        "Seated single-leg hamstring stretch (L & R)": "./circuit/seated-single-leg.gif",
        "Seated Forward Bend": "./circuit/seated-forward-bend.webp",
        "Hip Flexors": "./circuit/hip-flexor.gif"
    }
}})