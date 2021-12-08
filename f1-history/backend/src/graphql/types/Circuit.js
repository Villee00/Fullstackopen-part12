import { gql } from "apollo-server";

const typeDefs = gql`
  type Circuit {
    id: ID!
    name: String
    location: String
    length: Float
    capacity: Float
  }
`;

const resolvers = {};

export default { typeDefs, resolvers };
