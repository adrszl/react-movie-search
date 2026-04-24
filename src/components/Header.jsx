import React, { useState } from "react";

// ANT DESIGN
import { Typography, Button, Card } from "antd";

// COMPONENTS
import CustomModal from './CustomModal';
import { additionalInfo } from '../assets/additionalInfo';

const headerStyles = {
  backgroundColor: '#98c1ff',
  display: 'flex',
  padding: '1rem',
  alignItems: 'baseline',
  justifyContent: 'space-between'
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
      <div style={headerStyles} className="header">
        <span>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Adrian Szlegel - React Movie Search
          </Typography.Title>

          <Typography.Text type="secondary">
            With the use of Ant Design
          </Typography.Text>
        </span>

        <Button type="primary" onClick={showModal} style={{ marginTop: 12 }}>
          Open Changelog
        </Button>
      </div>
      <CustomModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        title="Changelog"
        content={additionalInfo.CHANGE_LOG}
        closable={false} />
    </React.Fragment>
  );
};

export default Header;
