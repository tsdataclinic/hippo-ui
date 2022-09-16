import * as React from 'react';
import { InputText } from '@hippo/input-text';
import { Button } from '@hippo/button';
import { Modal } from '@hippo/modal';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const onModalToggleClick = () => setIsModalOpen(prev => !prev);

  return (
    <div className="App">
      <InputText />
      <Button onClick={onModalToggleClick}>Toggle modal</Button>
      <Modal
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        title="This is a test title"
      >
        This is test content
      </Modal>
    </div>
  );
}

export default App;
