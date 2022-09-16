import * as React from 'react';

export default function StartButton({
  onClick,
}: {
  onClick: () => void;
}): JSX.Element {
  return (
    <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
      <button onClick={onClick}>Start</button>
    </div>
  );
}
