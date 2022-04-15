class Exercise {
    /**
     * 
     * @param {String} name 
     * @param {Number} span 
     * @param {String} imgURL 
     */
    constructor(name, span, imgURL) {
        this.name = name
        this.span = span
        this.img =  imgURL
    }

    static parseJSON(name, {"span":span, "url": url}) {
        return new Exercise(name, span, url )
    }
}

class PartialRoutine {
    items = {}
    constructor({"items" : items, "sets" : sets}) {
        //Todo: make items from Exercise

        for (const [key, val] of Object.entries(items)) {
            this.items[key] = Exercise.parseJSON(key, val)
        }
        this.sets = sets
        this.len = Object.keys(items).length
    }
}

class Routine {
    states = {
        warmup : 0,
        conditioning: 1,
        cooldown: 2
    }
    currentExercise = null
    constructor(obj, state = null, index = 0, setCount = 0) {
        const r = new $c("#routine")
        this.root = r.root
        this.children = {
            currentExercise : r.get("current"),
            nextExercise : r.get("next")
        }

        this.stateCount = Object.keys(this.states).length

        this.preview = r.get("preview")
        this.state = (state === null) ? this.states.warmup : state;

        this.index = index
        this.setCount = setCount
        /* [this.warmup, this.conditioning, this.cooldown] = 
        ["warmup", "conditioning", "cooldown"].map(key => {
            return new PartialRoutine(obj[key])
        }) */
        this.warmup = new PartialRoutine(obj["warmup"])
        this.conditioning = new PartialRoutine(obj["conditioning"])
        this.cooldown = new PartialRoutine(obj["cooldown"])
        console.log(this.state);

        this.setState(state | 0)

        this.update()
    }

    setRoutine() {
        this.current = [this.warmup, this.conditioning, this.cooldown][this.state]
    }

    setState(state = null) {
        if (state === null) {
            this.state++
        } else {
            this.state = state
        }
        this.state %= this.stateCount

        this.setRoutine()
        this.setSideBar()
    }

    setSideBar() {
        this.preview.innerHTML = "";
        for (const exercise of Object.values(this.current.items)) {
            const div = $$("div")
            div.innerText = exercise.name
            this.preview.appendChild(div)
        }
    }

    nextPic() {
        this.index++

        this.index %= this.current.len

        if (this.setCount == this.current.sets) {
            this.category++
            this.category %= 3
            this.index = 0
            this.setCount = 0
            this.setSideBar()
        }

        this.update()
    }

    get_current_exercise() {
        return Object.entries(this.current.items)[this.index]
    }

    update() {
        const [, exercise] = this.get_current_exercise()
        console.log(exercise);
        this.children.currentExercise.src = exercise.img;
        this.children.currentExercise.alt = exercise.name;
    }
}