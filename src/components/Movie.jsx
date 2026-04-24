import React from "react";
import { Card } from 'antd';

const { Meta } = Card;

const DEFAULT_PLACEHOLDER_IMAGE = "https://dummyimage.com/300x450/cccccc/000000&text=No+Poster";


const Movie = ({ movie }) => {
  const poster = movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <img
          alt="example"
          src={poster}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_PLACEHOLDER_IMAGE;
          }}
        />
      }
    >
      <Meta title={movie.Title} description={movie.Year} />
    </Card>
  );
};


export default Movie;