import React, { useState } from "react";

// ANT DESIGN
import { Form, Input, Button, Row, Col, Checkbox, Divider, Menu, Dropdown } from "antd";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [showAdvanced, setShowAdvancedValue] = useState(false);
  const [typeValue, setTypeValue] = useState("Type");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCheckboxChange = () => {
    setShowAdvancedValue(!showAdvanced);
  }

  // const handleTypesClick = () => {
    
  // }

  const handleDropdownClick = () => {

  }

  // const resetInputField = () => {
  //   setSearchValue("");
  // };

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
  };

  const types = (
    <Menu>
      <Menu.Item key="1" onClick={() => setTypeValue("Movie")}>
        Movie
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setTypeValue("Series")}>
        Series
      </Menu.Item>
      <Menu.Item key="3" onClick={() => setTypeValue("Episode")}>
        Episode
      </Menu.Item>
    </Menu>
  );

  return (
    <>
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
            onPressEnter={callSearchFunction}
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
      <Col span={12} className="mt-4">
          <Checkbox onChange={handleCheckboxChange}>Show Advanced Search Parameters</Checkbox>
      </Col>
      <Col className="gutter-row" flex="row"></Col>
    </Form.Item>
    {showAdvanced ?
      <>
        <Divider orientation="center">Advanced Search Parameters</Divider>
          <p>Functionality not yet finished. To be continued</p>
          <Row justify="center">
          <Col span={6}>
            <Input
              placeholder="Year"
              type="number"
            />
          </Col>
          <Col span={6}>
          <Dropdown.Button onClick={handleDropdownClick} overlay={types} trigger={['click']}>
            {typeValue}
          </Dropdown.Button>
          </Col>
          </Row>
      </>
    : null }
    </>
  );
};

export default Search;
