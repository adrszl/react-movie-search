import React, { useState } from "react";

// ANT DESIGN
import { Form, Input, Button, Row, Col } from "antd";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  };

  return (
    <Form.Item
      label="Search for movies"
      required
      tooltip="Please enter search phrase"
    >
      <Row justify="center">
        <Col span={12}>
          <Input
            placeholder="eg. Iron Man"
            value={searchValue}
            onChange={handleSearchInputChanges}
            type="text"
          />
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            loading={props.loading}
            onClick={callSearchFunction}
          >
            Search
          </Button>
        </Col>
      </Row>
      <Col className="gutter-row" flex="row"></Col>
    </Form.Item>
  );
};

export default Search;
