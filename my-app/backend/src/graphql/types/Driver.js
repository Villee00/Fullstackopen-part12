import { gql } from "apollo-server";
import Driver from "../../models/driver.js";

const typeDefs = gql`
  type Races {
    race: Race
    position: Int
    grid: Int
    positionsGained: Int
  }
  type Driver {
    id: ID!
    driverNumber: [Int]
    seasonsDriven: [Int]
    teams: [String]
    firstName: String!
    lastName: String!
    nationality: String
    dateOfBirth: String
    races: [Races!]
    wikipediaLink: String!
    pictureLink: String
    racesDriven: Int
    positionsGainedCareer: Int
    fullName: String!
  }
`;

const resolvers = {
  Driver: {
    async racesDriven(obj, args, context, info) {
      const driver = await Driver.findById(obj.id);
      return driver.races.length;
    },
    async positionsGainedCareer(obj, args, context, info) {
      const driver = await Driver.findById(obj.id);
      let positions = 0;
      driver.races.forEach((race) => {
        if (parseInt(race.grid) !== 0) {
          positions += race.grid - race.position;
        }
      });
      return positions;
    },
    async fullName(obj, args, context, info) {
      return obj.firstName + " " + obj.lastName;
    },
  },
  Races: {
    async positionsGained(obj, args, context, info) {
      if (parseInt(obj.grid) === 0) {
        return 0;
      }
      return obj.grid - obj.position;
    },
  },
};

export default { typeDefs, resolvers };
