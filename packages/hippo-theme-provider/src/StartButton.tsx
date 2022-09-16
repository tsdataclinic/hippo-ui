import React from 'react';

const StartButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
      <button onClick={onClick}>Start</button>
    </div>
  );
};

export default StartButton;
