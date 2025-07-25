import React from 'react';

function Search({searchTerm , setSearchTerm}) {
    return ( <div className='search'>
        <div>
            <img src="/public/search.svg" alt="search" />
            <input 
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search through thousands of movies" />
        </div>
    </div> );
}

export default Search;