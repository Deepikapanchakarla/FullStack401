
const apiKey = '6271b752';

// Function to fetch movie data
async function getMovieInfo(movieName) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`);
        const data = await response.json();

        if (data.Response === 'True') {
            const movieInfo = {
                title: data.Title,
                year: data.Year,
                genre: data.Genre,
                plot: data.Plot,
                poster: data.Poster,
            };

            return movieInfo;
        } else {
            return "Movie not found. Please check the movie name.";
        }
    } catch (error) {
        return "Error fetching movie data.";
    }
}

// Event listener for the form submission
document.getElementById("movieForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const movieName = document.getElementById("movieName").value;
    const movieData = await getMovieInfo(movieName);

    const movieInfoContainer = document.getElementById("movieInfo");

    if (typeof movieData === "object") {
        movieInfoContainer.innerHTML = `
            <h2>${movieData.title} (${movieData.year})</h2>
            <p>Genre: ${movieData.genre}</p>
            <p>Plot: ${movieData.plot}</p>
            <img src="${movieData.poster}" alt="${movieData.title} Poster">
        `; 
  
    } else {
        movieInfoContainer.innerHTML = `<p>${movieData}</p>`;
    }
});
