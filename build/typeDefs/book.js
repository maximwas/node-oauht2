export const book = `#graphql
  # Interface
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  # Type
  type Book {
    title: String
    author: Author
  }
  type addBookMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    book: Book
  }
  type Author {
    name: String
    books: [Book]
  }

  # Query
  type Query {
    books: [Book]
    authors: [Author]
  }

  # Mutation
  type Mutation {
    addBook(title: String, author: String): addBookMutationResponse
  }
`;
