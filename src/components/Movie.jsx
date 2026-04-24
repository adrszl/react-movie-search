import React from "react";
import { Card } from 'antd';

const { Meta } = Card;

const DEFAULT_PLACEHOLDER_IMAGE = "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";


const Movie = ({ movie }) => {
  const poster = movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
  <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src={poster} />}
  >
    <Meta title={movie.Title} description={movie.Year} />
  </Card>
  );
};


export default Movie;