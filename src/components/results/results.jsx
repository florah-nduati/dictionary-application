import React from "react";
import { useQuery } from "react-query";
import useWordParamStore from "../stores/WordParam";
import "./results.css";

function Results() {
  const word = useWordParamStore((state) => state.word);

  const { data, isLoading, isError, error } = useQuery(
    ["word", word],
    async () => {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );
      const results = await response.json();
      return results;
    },
    {
      enabled: !!word,
    },
  );

  return (
    <div>
      {isLoading && <div className="loading-message">Loading...</div>}
      {isError && <div className="error-message">{error.message}</div>}

      {data && data.length > 0 ? (
        <div className="meaning-section">
          <h2>{data[0].word}</h2>
          {data[0].meanings.map((meaning, index) => (
            <div key={index}>
              <div className="part-of-speech">{meaning.partOfSpeech}</div>
              <ul className="definition-list">
                {meaning.definitions.map((definition, defIndex) => (
                  <li className="definition-item" key={defIndex}>
                    {definition.definition}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div>{word}</div>
      )}
    </div>
  );
}

export default Results;
