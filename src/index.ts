import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

interface Book {
  title: string;
  name: string;
}

interface MutationResponse {
  code: string;
  success: boolean;
  message: string;
}

interface BookMutationResponse extends MutationResponse {
  book: Book;
}

const books: Book[] = [
  {
    title: 'The Awakening',
    name: 'Kate Chopin'
  },
  {
    title: 'City of Glass',
    name: 'Paul Auster'
  }
];

const resolvers = {
  Query: {
    books: () => books,
    authors: () => books
  },
  Mutation: {
    addBook: (parent, args) => {
      const response: BookMutationResponse = {
        code: '200',
        success: true,
        message: 'Success',
        book: {
          title: args.title,
          name: args.author
        }
      };

      books.push(response.book);

      return response;
    }
  },
  Book: {
    author: (parent: Book) => {
      return books.find((author) => author.name === parent.name);
    }
  },
  Author: {
    books: (parent: Book) => {
      return books.filter((book) => book.name === parent.name);
    }
  }
};

const typeDefs = `#graphql
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }
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
  type Query {
    books: [Book]
    authors: [Author]
  },
  type Mutation {
    addBook(title: String, author: String): addBookMutationResponse
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});

console.log(`🚀  Server ready at: ${url}`);
