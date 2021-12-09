import { gql } from "apollo-server";
import Driver from "../../models/driver.js";

export const typeDefs = gql`
  extend type Query {
    getDrivers(limit: Int, offset: Int, name: String, season: Int): [Driver!]!
    getDriver(driverID: String!): Driver!
    getDriverCount: Int!
  }
`;

export const resolvers = {
  Query: {
    getDrivers: async (obj, args, context, info) => {
      return await Driver.find({})
        .sort({ dateOfBirth: -1 })
        .limit(args.limit)
        .skip(args.offset)
        .exec();
    },
    getDriver: async (obj, args, context, info) => {
      return await Driver.findById(args.driverID).populate({
        path: "races.race",
        model: "Race",
      });
    },
    getDriverCount: async (obj, args, context, info) => {
      return await Driver.find({}).countDocuments();
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
