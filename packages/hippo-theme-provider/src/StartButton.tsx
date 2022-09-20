import React from 'react';

function StartButton({ onClick }: { onClick: () => void }) {
  return (
    <div style={{ bottom: 0, position: 'absolute', right: 0 }}>
      <button onClick={onClick}>Start</button>
    </div>
  );
}

export default StartButton;
