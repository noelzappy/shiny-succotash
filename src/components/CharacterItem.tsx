import React, { memo } from "react";
import { FiUser } from "react-icons/fi";
import { ICharacter } from "../types/data";

type Props = {
  character: ICharacter;
};

const BookItem: React.FC<Props> = ({ character }) => {
  return (
    <div className="grid-item">
      <FiUser size={50} />
      <h3>{character.name || "-"}</h3>
      <p>{character.aliases?.map((alias) => alias).join(", ")}</p>
      <div className="divider" />
      <p className="text-c">
        Gender: <span className="text">{character.gender}</span>
      </p>

      <p className="text-c">
        Books: <span className="text">{character.books?.length}</span>
      </p>
    </div>
  );
};

export default memo(
  BookItem,
  (prevProps, nextProps) =>
    prevProps.character.name === nextProps.character.name
);
