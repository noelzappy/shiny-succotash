export interface IBook {
  url: string;
  name: string;
  isbn: string;
  authors: string[];
  numberOfPages: number;
  publisher: string;
  country: string;
  mediaType: string;
  released: string;
  characters: string[];
  povCharacters: string[];
}

export interface ICharacter {
  name: string;
  url: string;
  books?: string[];
  aliases?: string[];
  gender?: string;
}
