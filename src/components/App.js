import React, { useReducer, useEffect } from "react";

// ANT DESIGN
import { Layout, Row, Col, Divider } from "antd";

import Header from "./Header";
import Movie from "./Movie";
import spinner from "../assets/ajax-loader.gif";
import Search from "./Search";
import { initialState, reducer } from "../store/reducer";
import axios from "axios";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=a9aed1bd";

// DESIGN SYSTEM: https://ant.design/

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then((jsonResponse) => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: jsonResponse.data.Search,
      });
    });
  }, []);

  // you can add this to the onClick listener of the Header component
  const refreshPage = () => {
    window.location.reload();
  };

  const search = (searchValue) => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST",
    });

    axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=a9aed1bd`).then(
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
        <Col key={`${index}-${movie.Title}`} span={5} style={{marginBottom: ".5rem"}}>
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
            <Row justify="center">
              {retrievedMovies}
            </Row>
            {/* movie results end */}
            <Footer style={{ textAlign: 'center' }}>
              <a href="https://adrszl.github.io/" target="_blank" rel="noopener noreferrer">>Adrian Szlegel</a> ©2021
            </Footer>
          </Content>
        </div>
      </div>
    </Layout>
  );
};

export default App;
