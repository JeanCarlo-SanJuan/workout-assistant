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
    constructor({"span":span, "items" : items, "sets" : sets}) {
        //Todo: make items from Exercise

        this.span = span
        this.sets = sets
        this.len = Object.keys(items).length

        for (const [key, val] of Object.entries(items)) {
            this.items[key] = Exercise.parseJSON(key, val)
        }

    }
}

class Routine {
    speechNext = new SpeechSynthesisUtterance("Next");

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
        removeAllChildNodes(this.preview);
         
        const vals =  Object.values(this.current.items);
        for (let i = 0; i < vals.length; i++) {
            const exercise = vals[i];
            const div = $$("div", {}, ["timer-resetter"])

            div.innerText = exercise.name
            div.addEventListener("click", () => {
                this.index = i;
                this.update();
            })
            this.preview.appendChild(div)
        }

        this.update();
    }

    nextPic() {
        this.index++

        if(this.index == this.current.len) {
            this.setCount++;
            this.index = 0;
        }

        if (this.setCount == this.current.sets) {
            this.nextCategory()
            return true;
        }

        this.update()
        return false;
    }

    nextCategory() {
        this.setState()
        this.index = 0
        this.setCount = 0
        this.setSideBar()
        this.update()
    }

    get_current_exercise() {
        const exec = Object.entries(this.current.items)[this.index];
        return exec;
    }

    update() {
        const [, exercise] = this.get_current_exercise()
        this.children.currentExercise.src = exercise.img;
        this.children.currentExercise.alt = exercise.name;
    }
}