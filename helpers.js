class $c {
    constructor(root_id) {
        this.root = $(root_id)
        this.root_id = root_id
    }

    /**
     * 
     * @param {String} child_id 
     * @returns HTMLElement 
     */
    get(child_id) {
        return $(`${this.root_id}-${child_id}`)
    }
}