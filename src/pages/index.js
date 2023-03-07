import Head from "next/head";
import React, { useState } from "react";
import MOVIE_LISTS from "./api/movie";

// console.log(Movies);

const Home = () => {
  const data = MOVIE_LISTS;

  const [sortType, setSortType] = useState("desc");

  const sort = (e) => {
    setSortType(e.target.value);
  };

  const showMenu = () => {
    const menu = document.querySelector(".menu");
    const button = document.querySelector(".accordion");

    if (menu.style.display === "block") {
      menu.style.display = "none";
      button.style.boxShadow = "0 0 10px #ccc";
    } else {
      button.style.boxShadow = "none";
      menu.style.display = "block";
    }
  };

  if (sortType === "desc") {
    data.sort((a, b) => b.popularity - a.popularity);
  } else {
    data.sort((a, b) => a.popularity - b.popularity);
  }

  return (
    <>
      <Head>
        <title>Popular Movies</title>
      </Head>
      <div className="wrapper">
        <div className="sidebar">
          <h1>Popular Movies</h1>
          <button className="accordion" onClick={showMenu}>
            <span>Sort</span>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 512 512"
            >
              <path d="M256 298.3l174.2-167.2c4.3-4.2 11.4-4.1 15.8.2l30.6 29.9c4.4 4.3 4.5 11.3.2 15.5L264.1 380.9c-2.2 2.2-5.2 3.2-8.1 3-3 .1-5.9-.9-8.1-3L35.2 176.7c-4.3-4.2-4.2-11.2.2-15.5L66 131.3c4.4-4.3 11.5-4.4 15.8-.2L256 298.3z" />
            </svg>
          </button>
          <div className="menu">
            <p>Sort Results By</p>
            <select className="sort-dropdown" onChange={sort}>
              <option value="desc">Highest Popularity</option>
              <option value="asc">Lowest Popularity</option>
            </select>
          </div>
        </div>
        <div className="main">
          <div className="movie-list">
            {data.map((movie) => (
              <div className="movie-item" key={movie.id}>
                <div className="img-thumbnail">
                  <img src={movie.img} alt={movie.title} />
                </div>
                <div className="rating">
                  <div className={ (movie.rating > 7 ? 'circle high' : 'circle medium') }>
                    <span>{movie.rating}</span>
                  </div>
                </div>
                <div className="movie-desc">
                  <h3 className="movie-title">{movie.title}</h3>
                  <div className="movie-year">{movie.year}</div>
                  <hr />
                  <div className="movie-popularity">
                    Popularity Score : {movie.popularity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
