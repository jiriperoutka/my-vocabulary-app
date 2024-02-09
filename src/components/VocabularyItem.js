import React from 'react';

const VocabularyItem = ({ word, definition }) => {
  return (
    <div>
      <h2>{word}</h2>
      <p>{definition}</p>
    </div>
  );
};

export default VocabularyItem;