import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: ["./src/schema/typeDefs/users.graphql"],
  generates: {
    "./src/__generated__/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        contextType: "../index#MyContext"
      }
    },
  }
};

export default config;
