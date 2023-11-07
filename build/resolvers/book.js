const books = [
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
            const response = {
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
        author: (parent) => {
            return books.find((author) => author.name === parent.name);
        }
    },
    Author: {
        books: (parent) => {
            return books.filter((book) => book.name === parent.name);
        }
    }
};
