import * as React from 'react';

export default function StartButton({
  onClick,
}: {
  onClick: () => void;
}): JSX.Element {
  // TODO: make this visible again once we have a better styling for it
  return (
    <div style={{ display: 'none', position: 'absolute', bottom: 0, right: 0 }}>
      <button onClick={onClick}>Start</button>
    </div>
  );
}
