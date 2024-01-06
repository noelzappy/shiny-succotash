import React from "react";
import useInfiniteQuery from "../hooks/useInfiniteQuery";
import { booksApi } from "../services/modules/books";
import { FiBookOpen } from "react-icons/fi";
import { IBook } from "../types/data";

const Books: React.FC = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<IBook[]>(booksApi.endpoints.getBooks);

  return (
    <div>
      {isLoading && (
        <center>
          <div>Loading...</div>
        </center>
      )}

      {data && (
        <div className="grid-container mb-2 ">
          {data.map((book, index) => (
            <div className="grid-item" key={index}>
              <FiBookOpen size={50} />
              <h3>{book.name}</h3>
              <div className="divider" />
              <p className="text-c">
                Author(s):{" "}
                <span className="text">
                  {book.authors?.map((author) => author).join(", ")}
                </span>
              </p>

              <p className="text-c">
                Country: <span className="text">{book.country}</span>
              </p>
            </div>
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
