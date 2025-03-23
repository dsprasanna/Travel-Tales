// destination Search function
function searchPlaces() {
    let input = document.getElementById('search-bar').value.toLowerCase();
    let container = document.querySelector('.destination-content');
    container.innerHTML = ''; // Clear before adding filtered results

    let filtered = destinations.filter(dest => dest.name.toLowerCase().includes(input));

    filtered.forEach(dest => {
        let box = document.createElement('div');
        box.classList.add('box');
        box.innerHTML = `
            <img src="${dest.image}" alt="${dest.name}">
            <h4>${dest.name}</h4>
            <h6>${dest.location}</h6>
            <div class="row">
                <p><b>$99</b>/person</p>
                <a href="${dest.link}" class="button">View Details</a>
            </div>
        `;
        container.appendChild(box);
    });

}



// // to add nearby place section in page 
// <div id="nearby-places"></div>
// <h2>📍 Nearby Places</h2>
// </div>



// nearby script to display nearby options
function displayPlaces(category, places) {
    
    const container = document.getElementById("nearby-places");

    // Check if a section for this category already exists
    let existingSection = document.querySelector(`.info-section[data-category="${category}"]`);

    if (!existingSection) {
        // Create a new section if it doesn't exist
        existingSection = document.createElement("div");
        existingSection.classList.add("info-section");
        existingSection.setAttribute("data-category", category);

        const sectionHeader = document.createElement("h3");
        sectionHeader.textContent = categoryNames[category];

        const placesContainer = document.createElement("div");
        placesContainer.classList.add("places-container");

        existingSection.appendChild(sectionHeader);
        existingSection.appendChild(placesContainer);
        container.appendChild(existingSection);
    }

    const placesContainer = existingSection.querySelector(".places-container");

    // Clear previous places before adding new ones
    placesContainer.innerHTML = "";

    places.slice(0, 50).forEach(place => {
        const placeName = place.name || "Unknown Name";
        const placeAddress = place.vicinity || "Address not available";
        const placeRating = place.rating ? `⭐ ${place.rating}/5` : "No rating available";

        let placeImage = "images/default.jpg";
        if (place.photos && place.photos.length > 0) {
            placeImage = place.photos[0].getUrl({ maxWidth: 400 });
        }

        // Create Place Card
        const placeCard = document.createElement("div");
        placeCard.classList.add("place-card");
        placeCard.innerHTML = `
            <img src="${placeImage}" alt="${placeName}" class="place-img" onerror="this.onerror=null; this.src='images/default.jpg';">
            <div class="place-info">
                <strong>${placeName}</strong>
                <p>📍 ${placeAddress}</p>
                <p>${placeRating}</p>
            </div>
        `;

        // Add click event to open a new page
        placeCard.addEventListener("click", () => {
            const queryParams = new URLSearchParams({
                name: placeName,
                image: placeImage,
                address: placeAddress,
                rating: placeRating
            });
            window.open(`nearby-place.html?${queryParams.toString()}`, "_blank");
        });

        placesContainer.appendChild(placeCard);
    });
}


