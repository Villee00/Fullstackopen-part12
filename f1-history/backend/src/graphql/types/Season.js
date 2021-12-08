import { gql } from "apollo-server";

const typeDefs = gql`
  type Season {
    id: ID!
    wikipediaLink: String!
    year: Int!
    races: [Race!]
  }
`;

const resolvers = {};

export default { typeDefs, resolvers };
