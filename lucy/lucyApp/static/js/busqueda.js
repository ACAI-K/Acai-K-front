const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".resultado-card");
const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", () => {

    const value = searchInput.value.toLowerCase();
    let visibleCards = 0;

    cards.forEach(card => {

        const name = card.dataset.name.toLowerCase();

        if(name.includes(value)){
            card.style.display = "flex";
            visibleCards++;
        }else{
            card.style.display = "none";
        }
    });

    if(visibleCards === 0){
        noResults.classList.remove("hidden");
    }else{
        noResults.classList.add("hidden");
    }

});