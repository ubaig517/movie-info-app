const API_KEY = '935b8355';
const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=`;
$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios.get(`${URL}${searchText}`)
    .then((response) => {
      console.log(response);
      let moviesData = response.data.Search;
      let result = '';
      $.each(moviesData, (index, movie) => {
        result += `
          <div class="col-md-3">
            <div class="card-body text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');

  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`)
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let result = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre: </strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Year Released: </strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rating: </strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating: </strong> ${movie.Ratings[0].Value}</li>
              <li class="list-group-item"><strong>Director: </strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer: </strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Cast: </strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="card-body">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary"> View IMDB</a>
            <a href="index.html" class="btn btn-secondary">Back to home</a>
          </div>
        </div>
      `;

      $('#movie').html(result);
    })
    .catch((error) => {
      console.log(error);
    });
}
