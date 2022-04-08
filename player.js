const [picker, footer] = $("#bg-picker", "footer")

/* const parter = {
  elems: $(".part"),
  active : null,
  init : function() {

    parter.active = parter.elems[0]
    parter.active.toggleAttribute("active");

    for (const part of parter.elems) {
      part.addEventListener("click", e => {
        parter.active.toggleAttribute("active");
        part.toggleAttribute("active");
        parter.active = part;
      })
    }
  }
} */

picker.addEventListener("change", e=> {
    const [file] = picker.files
      // Create a blob that we can use as an src for our audio element
    const urlObj = URL.createObjectURL(file);
    // Clean up the URL Object when done with it
    player.addEventListener("load", () => {
      URL.revokeObjectURL(urlObj);
    });

    timer.Audio = new Audio(urlObj)
    footer.innerText = `Now Playing: ${file.name}`
})

parter.init()
