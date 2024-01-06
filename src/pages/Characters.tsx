import React, { useMemo, useState } from "react";
import { FiUser } from "react-icons/fi";
import useInfiniteQuery from "../hooks/useInfiniteQuery";
import { ICharacter } from "../types/data";
import { charactersApi } from "../services/modules/characters";
import CharacterItem from "../components/CharacterItem";
import VirtualizedList from "../components/VirtualizedList";

const Characters: React.FC = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<ICharacter[]>(charactersApi.endpoints.getCharacters);

  console.log(data);

  const [inputText, setInputText] = useState<string>("");

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!inputText) return data;
    return data.filter((d) => {
      const text = `${d.name.toLowerCase()} ${d.aliases
        ?.map((alias) => alias)
        .join(", ")}`;

      return text.indexOf(inputText.toLowerCase()) > -1;
    });
  }, [data, inputText]);

  return (
    <div>
      <center>
        <div className="alert">
          <div className="input-group mb-3 ">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setInputText(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
      </center>

      {isLoading && (
        <center>
          <div>Loading...</div>
        </center>
      )}

      {data && (
        <div className="grid-container mb-2 ">
          {filteredData.map((character, index) => (
            <CharacterItem key={index} character={character} />
          ))}
        </div>
      )}

      <center>
        {isFetchingNextPage && <div>Loading...</div>}
        {hasNextPage && !isLoading && !isFetchingNextPage && (
          <div className="center">
            <button onClick={() => fetchNextPage()} className="btn btn-primary">
              Load More
            </button>
          </div>
        )}
        <div className="spacer" />
      </center>
    </div>
  );
};

export default Characters;
