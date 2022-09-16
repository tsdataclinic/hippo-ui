import { MyDiv, MyButton } from '@hippo/theme-provider';
import * as React from 'react';
import { InputText } from '@hippo/input-text';
import { Button } from '@hippo/button';
import { Modal } from '@hippo/modal';
import './App.css';

function App() {
  const [todoItems, setTodoItems] = React.useState<readonly string[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [itemText, setItemText] = React.useState('');
  const onModalToggleClick = () => setIsModalOpen(prev => !prev);

  const onAddItem = (item: string) => {
    setTodoItems(prevItems => prevItems.concat(item));
  };

  const todoItemRows = todoItems.map(item => <div key={item}>{item}</div>);

  return (
    <div className="App">
      {todoItemRows}
      <form
        onSubmit={e => {
          e.preventDefault();
          onAddItem(itemText);
          setItemText('');
        }}
      >
        <InputText value={itemText} onChange={setItemText} />
        <Button type="submit">Add item</Button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        title="This is a test title"
      >
        This is test content
      </Modal>
      <div style={{ position: 'absolute', top: 0 }}>
        <Button onClick={onModalToggleClick}>Toggle modal</Button>
        <MyDiv />
        <div>
          <MyButton />
        </div>
      </div>
    </div>
  );
}

export default App;
