import { gql } from '@apollo/client';


export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};






export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;



export const SAVE_BOOK= gql`
  mutation saveBook($book: BookInput!) {
    saveBook(book:$book ) {
      username
      email
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
        }
    }
  }
`;

export const REMOVE_BOOK= gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {c
        bookId
        authors
        description
        image
        link
        title
        }
    }
  }
`;

