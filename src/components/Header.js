import React, { useState } from "react";

// ANT DESIGN
import { PageHeader, Button } from "antd";

// COMPONENTS
import CustomModal from './CustomModal';
import { additionalInfo } from '../assets/additionalInfo';

const headerStyles = {
  backgroundColor: '#98c1ff'
}

const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <React.Fragment>
      <PageHeader
        className="site-page-header"
        title="Adrian Szlegel - React Movie Search"
        subTitle="With the use of Ant Design"
        style={headerStyles}
        extra={[
          <Button key="1" type="primary" onClick={showModal}>
            Open Changelog
          </Button>
        ]}
      />
      <CustomModal 
        isModalVisible={isModalVisible} 
        handleOk={handleOk}
        title="Changelog"
        content={additionalInfo.CHANGE_LOG}
        closable={false}/>
    </React.Fragment>
  );
};

export default Header;
