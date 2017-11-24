$(document).ready(()=> {
    $('#searchForm').on('submit', (e) => {
        //before we submit, we want to grab the file to make sure the search bar is working
        let searchText = $('#searchText').val(); 
        getMovies(searchText); 
        e.preventDefault(); //stop form from actually submitting to a file
    })
});

//function is successfully being called
function getMovies(searchText) { 
    axios.get('http://www.omdbapi.com/?apikey=3430a78&s='+searchText)

    //returns a promise so use .then
     .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html'; 
    return false; 
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    //search by ID with i
    axios.get('http://www.omdbapi.com/?apikey=3430a78&i='+movieId)
    
        //returns a promise so use .then
         .then((response) => {
          console.log(response);
         let movie = response.data;

         let output =`
         <div class="row">
           <div class="col-md-4">
             <img src="${movie.Poster}" class="thumbnail">
           </div>
            <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                </ul>
            </div>
         </div>
         <div class="row">
         <div class="well">
           <h3>Plot</h3>
           ${movie.Plot}
           <hr>
           <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
           <a href="index.html" class="btn btn-default">Go Back To Search</a>
         </div>
       </div>

       `;
            $('#movie').html(output); 
        })
        .catch((err) => {
          console.log(err);
        });

}