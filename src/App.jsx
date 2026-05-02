import React, { useReducer, useEffect } from "react";

// ANT DESIGN
import { Layout, Row, Col, Divider } from "antd";

// CUSTOM CSS TWEAKS
import "./App.css"

import Header from "./components/Header";
import Movie from "./components/Movie";
import spinner from "./assets/ajax-loader.gif";
import Search from "./components/Search";
import { initialState, reducer } from "./store/reducer";
import axios from "axios";

// DESIGN SYSTEM: https://ant.design/

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const MOVIE_API_URL = `https://www.omdbapi.com/?s=man&apikey=${API_KEY}`;
  
  useEffect(() => {
    axios.get(MOVIE_API_URL).then((jsonResponse) => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: jsonResponse.data.Search,
      });
    });
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  const search = (searchValue, year = undefined, type = undefined) => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST",
    });

    axios(`https://www.omdbapi.com/?s=${searchValue}${year ? "&y=" + year : ""}${type !== "Type" ? "&type=" + type.toLowerCase() : ""}&apikey=${API_KEY}`).then(
      (jsonResponse) => {
        if (jsonResponse.data.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.data.Search,
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.data.Error,
          });
        }
      }
    );
  };

  const { movies, errorMessage, loading } = state;
  const { Content, Footer } = Layout;

  const retrievedMovies =
    loading && !errorMessage ? (
      <img className="spinner" src={spinner} alt="Loading spinner" />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      movies.map((movie, index) => (
        <Col key={`${index}-${movie.Title}`} span={4} style={{marginBottom: ".5rem"}}>
          <Movie movie={movie} />
        </Col>
      ))
    );

  return (
    <Layout>
      <div className="App">
        <div className="m-container">
          <Header onClick={() => refreshPage()} />

          <Content>
            {/* search section start */}
            <Divider orientation="center">Movie Search</Divider>
            <Row justify="center">
              <Col className="gutter-row" span={12}>
                <Search search={search} loading={loading} />
              </Col>
            </Row>
            {/* search section end */}

            {/* movie results start */}
            <Divider orientation="center">Results</Divider>
            <Row justify="start">
              {retrievedMovies}
            </Row>
            {/* movie results end */}
            <Footer style={{ textAlign: 'center' }}>
              <a href="https://adrszl.github.io/" target="_blank" rel="noopener noreferrer">Adrian Szlegel</a> ©2022 - {new Date().getFullYear()}
            </Footer>
          </Content>
        </div>
      </div>
    </Layout>
  );
};

export default App;
