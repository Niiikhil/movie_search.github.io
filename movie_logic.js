const searchInput = document.querySelector('input[type="search"]'); // Get the search input field
const movieList = document.getElementById('movielist'); // Get the movie list table body
const searchForm = document.querySelector('form'); // Get the form (you can also select by class or ID)

// API URL
const apiKey = 'd6d9a39b';
const apiUrl = 'https://www.omdbapi.com/?apikey=' + apiKey + '&s=';

console.log(apiUrl);


async function fetchMovies(search_query) {
    if (!search_query) return; // Check if the search query is empty

    const search_url = `${apiUrl}${search_query}`; // Construct the search URL
    console.log(search_url); // Log the URL for debugging

    try {
        const responses = await fetch(search_url); // Fetch data from OMDb API

        const data = await responses.json(); // Parse the JSON data
        console.log("data", data); // Log the data for debugging

        if (data.Response === `True`){
            const search_data = data.Search;
            console.log(search_data)
            displayMovies(search_data);

        }


    } 
    catch (error) {
        console.error("Error fetching data:", error); // Log the error for debugging
        movieList.innerHTML = `<tr><td colspan="2" class="text-center">Error fetching data!</td></tr>`;
    }
}


function displayMovies(movies){
    movies.innerHTML = '';

    movies.forEach(movie => {

        const movieRow = document.createElement('tr');
        movieRow.innerHTML = `
            <td>${movie.Title}</td>
            <td>${movie.Year}</td>
            <td><img src="${movie.Poster}" alt="${movie.Title}" style="width: 100px; height: auto;"></td>
        `;
        movieList.appendChild(movieRow); // Append the movie row to the list
    });



}



searchForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const search_query = searchInput.value.trim();
    fetchMovies(search_query);
    // const data = response.json(); // Parse the JSON data
    // console.log("data",data)
    
});

// // Function to fetch movies from OMDb API
// async function fetchMovies(query) {
//     if (!query) return; // If no query is provided, do nothing

//     const url = `${apiUrl}${query}`;

//     try {
//         const response = await fetch(url); // Fetch data from OMDb API
//         const data = await response.json(); // Parse the JSON data
//         console.log("data",data)
        
//         if (data.Response === 'True') {
//             displayMovies(data.Search); // Display movie results
//             console.log("search",data.Search)
//         } else {
//             movieList.innerHTML = `<tr><td colspan="2" class="text-center">No movies found!</td></tr>`;
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         movieList.innerHTML = `<tr><td colspan="2" class="text-center">Error fetching data!</td></tr>`;
//     }
// }

// // Function to display the fetched movies
// function displayMovies(movies) {
//     movieList.innerHTML = ''; // Clear existing movies

//     movies.forEach(movie => {
//         const movieRow = document.createElement('tr');
//         movieRow.innerHTML = `
//             <td>${movie.Title}</td>
//             <td>${movie.Year}</td>
//             <td><img src="${movie.Poster}" alt="${movie.Title}" style="width: 100px; height: auto;"></td>
//         `;
//         movieList.appendChild(movieRow); // Append the movie row to the list
//     });
// }

// // Event listener for the form submission
// searchForm.addEventListener('submit', (event) => {
//     event.preventDefault(); // Prevent form from reloading the page
//     const query = searchInput.value.trim(); // Get the search input value
//     console.log("query",query)
//     fetchMovies(query); // Fetch movies based on the query
// });


