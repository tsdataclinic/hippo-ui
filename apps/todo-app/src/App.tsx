import * as React from 'react';
import { InputText } from '@hippo/input-text';
import { Button } from '@hippo/button';
import './App.css';

function App() {
  const [todoItems, setTodoItems] = React.useState<readonly string[]>([]);
  const [itemText, setItemText] = React.useState('');

  const onAddItem = (item: string) => {
    setTodoItems(prevItems => prevItems.concat(item));
  };

  const todoItemRows = todoItems.map(item => <div key={item}>{item}</div>);

  return (
    <div className="App">
      {todoItemRows}
      <form
        style={{ position: 'absolute', top: 0 }}
        onSubmit={e => {
          e.preventDefault();
          onAddItem(itemText);
          setItemText('');
        }}
      >
        <InputText value={itemText} onChange={setItemText} />
        <Button type="submit">Add item</Button>
      </form>
    </div>
  );
}

export default App;
