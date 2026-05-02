import React, { useState, useReducer } from "react";
import { Card, Modal } from 'antd';
import { initialSingleMovieState, reducer } from "../store/reducer";
import axios from "axios";

const Movie = ({ movie }) => {
  const [state, dispatch] = useReducer(reducer, initialSingleMovieState);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { movieDetails, errorMessage } = state;

  const API_KEY = import.meta.env.VITE_API_KEY;
  const { Meta } = Card;
  const DEFAULT_PLACEHOLDER_IMAGE = "https://dummyimage.com/300x450/cccccc/000000&text=No+Poster";
  const poster = movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

  const handleClick = (id) => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST",
    });

    axios(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`).then(
      (jsonResponse) => {
        if (jsonResponse.data.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIE_SUCCESS",
            payload: jsonResponse.data,
          });
          console.log('jsonResponse: ', jsonResponse)
          setIsModalOpen(true);
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.data.Error,
          });
          setIsModalOpen(true);
        }
      }
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <Card
        hoverable
        style={{ width: 240, margin: '1rem auto' }}
        cover={
          <img
            alt="example"
            src={poster}
            onError={(e) => {
              e.currentTarget.src = DEFAULT_PLACEHOLDER_IMAGE;
            }}
          />
        }
        onClick={() => handleClick(movie.imdbID)}
      >
        <Meta title={movie.Title} description={movie.Year} />
      </Card>
      <Modal
        title={errorMessage ? "Error" : movieDetails?.Title}
        closable={{ 'aria-label': 'Custom Close Button' }}
        footer={''}
        onCancel={handleCancel}
        open={isModalOpen}
      >
        <hr />
        {movieDetails.Poster &&
          <img
            src={movieDetails.Poster}
            alt={`${movieDetails.Title}-poster`}
            style={{ margin: ' 0 auto', display: 'block', borderRadius: '5px' }}
            onError={(e) => {
              e.currentTarget.src = DEFAULT_PLACEHOLDER_IMAGE;
            }} />}
        {Object.keys(movieDetails).length !== 0 && !errorMessage ?
          Object.entries(movieDetails).filter(([key]) => key !== 'Poster' && key !== 'Title' && key !== 'Ratings').map(([key, value]) => (
            <p key={`${movieDetails.Title}-${key}`}>
              <strong>{key}:</strong> {value}
            </p>
          ))
          : null}
        {movieDetails.Ratings && <><h4 style={{ textAlign: 'center' }}>Ratings:</h4><hr />
          {movieDetails.Ratings.map(rating => (
            <p key={`${rating.Source}-rating`}><strong>{rating.Source}: </strong>{rating.Value}</p>
          ))}
        </>}
        {errorMessage?.length > 0 && <p>{errorMessage}</p>}
      </Modal>
    </>
  );
};


export default Movie;