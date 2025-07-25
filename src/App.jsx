import Search from "./components/search";
import React, { useState, useEffect } from 'react';
import { useDebounce } from "react-use";
import Spinner from "./components/spinner";
import MovieCard from "./components/MovieCard";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method:"GET",
  headers:{
    "accept": "application/json",
    "Authorization": `Bearer ${API_KEY}`,
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebounceSearchTerm(searchTerm) , 500 ,[searchTerm])

  const fetchMovies = async (query = '') => {
    try{
      setIsLoading(true);
      setErrorMessage('');
      const endpoint = query ?  `${API_BASE_URL}/search/movie?query=${encodeURI(query)}`
      :`${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
      const response = await fetch(endpoint,API_OPTIONS);
      const data = await response.json();
      if(data.Response == 'False'){
        setErrorMessage(data.error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }
      setMovieList(data.results);
      if ( query && data.results.length > 0){
        await updateSearchCount(query , data.results[0])
      }
      setIsLoading(false);
    }
    catch(error){
      console.error(`Error fetching movies : ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');

    }
    finally{
      setIsLoading(false);
    }
  }
  const loadTrendingMovies = async () =>{
    try{
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    }catch(error){
      console.error(`Error fetching trending movies : ${error}`);
      
    }
  }
  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);
  useEffect(() => {
    loadTrendingMovies();
  }, []);
  return (  
    <main>
      <div className="pattern">

      </div>

      <div className="wrapper">
        <header>
        <img src="/public/hero-img.png" alt="" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm = {setSearchTerm} />
        </header>
        
        {trendingMovies.length > 0  && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>
                    {index + 1}
                  </p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
                ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2 className="">All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ?( <p className="text-red-500">{errorMessage} </p>) :
          <ul>
            {movieList.map((movie) =>(
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>  }
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section>
      </div>
    </main>
  );
}

export default App;