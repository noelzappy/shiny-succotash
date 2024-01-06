import React, { useMemo, useState } from "react";
import useInfiniteQuery from "../hooks/useInfiniteQuery";
import { booksApi } from "../services/modules/books";
import { IBook } from "../types/data";
import BookItem from "../components/BookItem";

const Books: React.FC = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<IBook[]>(booksApi.endpoints.getBooks);

  const [inputText, setInputText] = useState<string>("");

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!inputText) return data;
    return data.filter((book) =>
      book.name.toLowerCase().includes(inputText.toLowerCase())
    );
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
          {filteredData.map((book, index) => (
            <BookItem key={index} book={book} />
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

export default Books;
