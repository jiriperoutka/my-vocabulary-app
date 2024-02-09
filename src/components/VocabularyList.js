import React from 'react';
import VocabularyItem from './VocabularyItem';

const VocabularyList = ({ vocabularies }) => {
  return (
    <div>
      {vocabularies.map((vocabulary, index) => (
        <VocabularyItem key={index} vocabulary={vocabulary} />
      ))}
    </div>
  );
};

export default VocabularyList;