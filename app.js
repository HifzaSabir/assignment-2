// Define an array of objects to represent movie data
const movies = [
    { title: "The Shawshank Redemption", genre: "Drama", rating: 9.3, releaseYear: 1994 },
    { title: "The Godfather", genre: "Crime", rating: 9.2, releaseYear: 1972 },
    { title: "The Dark Knight", genre: "Action", rating: 9.0, releaseYear: 2008 },
    // ... add more movies here
  ];
  
  // Define a closure to manage private data or state
  const recommendationLogic = (() => {
    let userPreferences = { genre: "Action", rating: 7, releaseYear: 2000 };
  
    const filterMovies = (movies, preferences) => {
      return movies.filter(movie => 
        movie.genre === preferences.genre && 
        movie.rating >= preferences.rating &&
        movie.releaseYear >= preferences.releaseYear
      );
    };
  
    return {
      getRecommendations: () => filterMovies(movies, userPreferences),
      setUserPreferences: preferences => userPreferences = preferences,
      getUserPreferences: () => userPreferences
    };
  })();
  
  // Use DOM manipulation to display movie recommendations on the user interface
  const movieList = document.getElementById("movie-list");
  const renderMovie = movie => {
    const movieElement = document.createElement("li");
    movieElement.innerText = movie.title;
    movieList.appendChild(movieElement);
  };
  const renderMovies = movies => {
    movieList.innerHTML = "";
    movies.forEach(movie => renderMovie(movie));
  };
  
  // Define a function to handle user input and update the recommendation logic and user interface accordingly
  const handleUserInput = event => {
    event.preventDefault();
    const genre = document.getElementById("genre-input").value;
    const rating = document.getElementById("rating-input").value;
    const releaseYear = document.getElementById("year-input").value;
    recommendationLogic.setUserPreferences({ genre, rating, releaseYear });
    const recommendations = recommendationLogic.getRecommendations();
    renderMovies(recommendations);
  };
  
  // Attach an event listener to the user input form
  const userInputForm = document.getElementById("user-input-form");
  userInputForm.addEventListener("submit", handleUserInput);
  
  // Render initial movie recommendations on page load
  const recommendations = recommendationLogic.getRecommendations();
  renderMovies(recommendations);
  