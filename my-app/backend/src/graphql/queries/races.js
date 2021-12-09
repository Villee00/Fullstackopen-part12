import { gql } from "apollo-server";
import Race from "../../models/race.js";
import Season from "../../models/season.js";
import { addSeason } from "../../utils/wikipediaApiHelper.js";

export const typeDefs = gql`
  extend type Query {
    allRaces(seasonYear: Int!): Season
    raceInfo(grandPrix: String!): Race
    filterRaces(weather: String): [Race]!
  }
`;

export const resolvers = {
  Query: {
    allRaces: async (root, args) => {
      let season = await Season.findOne({
        year: args.seasonYear,
      }).populate("races");

      if (!season) {
        season = await addSeason(args.seasonYear);
      }
      season.races.forEach((race) => {
        race.populate("circuit");
      });

      return season;
    },
    raceInfo: async (root, args) => {
      const race = await Race.findOne({
        grandPrix: args.grandPrix,
      })
        .populate({
          path: "circuit",
          model: "Circuit",
        })
        .populate({
          path: "results.driver",
          model: "Driver",
        });
      return race;
    },
    filterRaces: async (root, args) => {
      const regexFilter = new RegExp(`${args.weather}*`, "i");
      const races = await Race.find({
        weather: { $regex: regexFilter },
      });
      return races;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
