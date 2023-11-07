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

export const book = {
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
