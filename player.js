const [picker, footer] = $("#bg-picker", "footer")

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