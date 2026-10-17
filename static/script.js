const movies = JSON.parse(
    document.getElementById("movieData").textContent
);

const searchInput = document.getElementById("searchInput");
const movieCards = document.querySelectorAll("#movieGrid .movie-card");
const categoryButtons = document.querySelectorAll(".category");
const noResults = document.getElementById("noResults");

const movieModal = document.getElementById("movieModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

const watchlistGrid = document.getElementById("watchlistGrid");
const emptyWatchlist = document.getElementById("emptyWatchlist");

let selectedCategory = "All";

let watchlist = [];

try {
    const saved = JSON.parse(
        localStorage.getItem("teluguflix-watchlist") || "[]"
    );

    if (Array.isArray(saved)) {
        watchlist = saved.filter(id => Number.isInteger(id));
    }
} catch (error) {
    watchlist = [];
}


// SEARCH AND CATEGORY FILTER

function filterMovies() {

    const search = searchInput.value.toLowerCase().trim();

    let visibleCount = 0;

    movieCards.forEach(card => {

        const title = card.dataset.title;
        const hero = card.dataset.hero;
        const genre = card.dataset.genre;

        const matchesSearch =
            title.includes(search) ||
            hero.includes(search) ||
            genre.toLowerCase().includes(search);

        const matchesCategory =
            selectedCategory === "All" ||
            genre === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "";
            visibleCount++;
        } else {
            card.style.display = "none";
        }

    });

    noResults.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterMovies);


// CATEGORY BUTTONS

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterMovies();

    });

});


// MOVIE DETAILS

function showMovieDetails(id) {

    const movie = movies.find(m => m.id === Number(id));

    if (!movie) return;

    modalBody.replaceChildren();

    const heading = document.createElement("h2");
    heading.textContent = movie.title;

    const hero = document.createElement("p");
    hero.textContent = "⭐ Hero: " + movie.hero;

    const genre = document.createElement("p");
    genre.textContent = "🎭 Genre: " + movie.genre;

    const year = document.createElement("p");
    year.textContent = "📅 Release Year: " + movie.year;

    const rating = document.createElement("p");
    rating.textContent = "⭐ Demo Rating: " + movie.rating;

    const description = document.createElement("p");
    description.textContent = movie.description;

    modalBody.append(
        heading,
        hero,
        genre,
        year,
        rating,
        description
    );

    movieModal.hidden = false;

}


// CLOSE MODAL

closeModal.addEventListener("click", () => {
    movieModal.hidden = true;
});

movieModal.addEventListener("click", event => {
    if (event.target === movieModal) {
        movieModal.hidden = true;
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        movieModal.hidden = true;
    }
});


// WATCHLIST

function toggleWatchlist(id) {

    id = Number(id);

    if (watchlist.includes(id)) {

        watchlist = watchlist.filter(movieId => movieId !== id);

    } else {

        watchlist.push(id);

    }

    localStorage.setItem(
        "teluguflix-watchlist",
        JSON.stringify(watchlist)
    );

    renderWatchlist();
    updateListButtons();

}


// UPDATE BUTTONS

function updateListButtons() {

    document.querySelectorAll(".list-btn").forEach(button => {

        const id = Number(button.dataset.id);

        button.textContent = watchlist.includes(id) ? "✓" : "+";

        button.title = watchlist.includes(id)
            ? "Remove from My List"
            : "Add to My List";

    });

}


// RENDER WATCHLIST

function renderWatchlist() {

    watchlistGrid.replaceChildren();

    const savedMovies = movies.filter(movie =>
        watchlist.includes(movie.id)
    );

    emptyWatchlist.hidden = savedMovies.length > 0;

    savedMovies.forEach(movie => {

        const card = document.createElement("div");
        card.className = "movie-card";

        const poster = document.createElement("div");
        poster.className = "poster";

        const image = document.createElement("img");

        image.src = "/static/images/" + encodeURIComponent(movie.image);
        image.alt = movie.title;

        image.onerror = function() {
            image.style.display = "none";
            poster.classList.add("missing-poster");
        };

        const fallback = document.createElement("span");
        fallback.className = "poster-fallback";
        fallback.textContent = "🎬 " + movie.title;

        const info = document.createElement("div");
        info.className = "movie-info";

        const title = document.createElement("h3");
        title.textContent = movie.title;

        const hero = document.createElement("p");
        hero.className = "hero-name";
        hero.textContent = movie.hero;

        const remove = document.createElement("button");
        remove.className = "category";
        remove.textContent = "Remove from List";

        remove.addEventListener("click", () => {
            toggleWatchlist(movie.id);
        });

        poster.append(image, fallback);
        info.append(title, hero, remove);
        card.append(poster, info);

        watchlistGrid.appendChild(card);

    });

}


// MOVIE CARD BUTTON EVENTS

document.getElementById("movieGrid").addEventListener("click", event => {

    const playButton = event.target.closest(".play-btn");

    if (playButton) {
        showMovieDetails(playButton.dataset.id);
        return;
    }

    const listButton = event.target.closest(".list-btn");

    if (listButton) {
        toggleWatchlist(listButton.dataset.id);
    }

});


// INITIALIZE

renderWatchlist();
updateListButtons();
