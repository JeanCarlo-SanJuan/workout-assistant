class MusicPlayer {
  root = undefined

  constructor() {
      this.icon = $("#music-icon")
      this.picker = $("#music-picker")
      this.label = $("#music-label")
      const my = this
      this.picker.addEventListener("change", e=> {
          const [file] = this.picker.files
            // Create a blob that we can use as an src for our audio element
          const urlObj = URL.createObjectURL(file);

          this.root = new Audio(urlObj)

          // Clean up the URL Object when done with it
          this.root.addEventListener("load", () => {
            URL.revokeObjectURL(urlObj);
          });
      
          this.label.innerText = `Now Playing: ${file.name}`
      })

      this.icon.addEventListener("click", () => {
        this.picker.click()
      })
  }
  play() {
      if(this.root)
      this.root.play()
  }

  stop() {
    if(this.root)
      this.root.pause()
  }

  shuffle() {

  }

  seek(t) {
    if(this.root)
      this.root.currentTime = t
  }
  reset() {
    if(this.root)
      this.seek(0)
  }
}