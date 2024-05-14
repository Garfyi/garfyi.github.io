var purrAudio;
var canPet = true;
var amountOfPet = 0;

function onLoad() {
    purrAudio = document.getElementById("purrAudio");
    const timeoutId = setTimeout(() => { window.location.replace("hell.html") }, 12000);
}

function petCat() {
    if (canPet) {
        if (amountOfPet > 2) {
            window.location.replace("heaven.html")
        }

        purrAudio.play();
        amountOfPet++;
        canPet = false;
        setTimeout(() => { canPet = true; }, 2000);
    }
    console.log("CAT IS GETTING PET");
}