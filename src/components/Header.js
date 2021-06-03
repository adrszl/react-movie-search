import React from "react";

// ANT DESIGN
import { PageHeader } from "antd";

const headerStyles = {
  backgroundColor: '#98c1ff'
}

const Header = (props) => {
  return (
    <PageHeader
      className="site-page-header"
      title="Adrian Szlegel - React Movie Search"
      subTitle="With the use of Ant Design"
      style={headerStyles}
    />
  );
};

export default Header;
