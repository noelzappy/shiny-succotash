import React, { memo } from "react";
import { FiBookOpen } from "react-icons/fi";
import { IBook } from "../types/data";

type Props = {
  book: IBook;
};

const BookItem: React.FC<Props> = ({ book }) => {
  return (
    <div className="grid-item">
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
  );
};

export default memo(
  BookItem,
  (prevProps, nextProps) => prevProps.book.name === nextProps.book.name
);
