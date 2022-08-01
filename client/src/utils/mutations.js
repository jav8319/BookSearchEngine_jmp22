export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};


import { gql } from '@apollo/client';



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
  mutation saveBook($description: String!, $bookId: ID, $image: String, $link: String, $title: String! ) {
    saveBook(description: $description, bookId: $bookId, image: $image, link: $link, title: $title ) {
      _id
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
  mutation removeBook($bookId: ID) {
    removeBook(bookId: $bookId) {
      _id
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

