import * as React from 'react';
import { useTheme } from '@hippo/theme-provider';
import { InputText } from '@hippo/input-text';
import { Button } from '@hippo/button';

export default function App() {
  const { computedTheme } = useTheme();
  const [todoItems, setTodoItems] = React.useState<readonly string[]>([]);
  const [itemText, setItemText] = React.useState('');

  const onAddItem = (item: string) => {
    setTodoItems(prevItems => prevItems.concat(item));
  };

  const todoItemRows = todoItems.map((item, idx) => (
    <div
      key={item}
      style={{
        fontSize: computedTheme.fontSizes.paragraph.fontSize,
        lineHeight: computedTheme.fontSizes.paragraph.lineHeight,
        paddingBottom: computedTheme.paddings.large,
      }}
    >
      {idx + 1}. {item}
    </div>
  ));

  return (
    <div
      className="App"
      style={{
        backgroundColor: computedTheme.colors.background,
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          marginTop: computedTheme.paddings.huge,
          paddingBottom: computedTheme.paddings.large,
        }}
      >
        {todoItemRows}
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          onAddItem(itemText);
          setItemText('');
        }}
      >
        <InputText value={itemText} onChange={setItemText} />
        <span style={{ paddingLeft: computedTheme.paddings.large }}>
          <Button type="submit">Add item</Button>
        </span>
      </form>
    </div>
  );
}
