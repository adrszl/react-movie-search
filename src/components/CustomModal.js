import React from 'react';
import { Modal, Button } from 'antd';

const CustomModal = (props) => {
  const { isModalVisible, handleOk, handleCancel, title, content, closable } = props;

  return (
    <React.Fragment>
      <Modal 
        title={title} 
        visible={isModalVisible} 
        onCancel={handleCancel} 
        closable={closable}
        footer={[
          <Button key="ok" onClick={handleOk} type="primary">
            OK
          </Button>]}>
        { content }
      </Modal>
    </React.Fragment>
  );
};

export default CustomModal;