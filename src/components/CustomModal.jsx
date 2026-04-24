import React from 'react';
import { Modal, Button } from 'antd';

const CustomModal = (props) => {
  const { isModalVisible, handleOk, handleCancel, title, content, closable } = props;

  return (
    <Modal
      title={title}
      open={isModalVisible}
      onCancel={handleCancel}
      closable={closable}
      footer={[
        <Button key="ok" type="primary" onClick={handleOk}>
          OK
        </Button>
      ]}
    >
      {content}
    </Modal>
  );
};

export default CustomModal;