import fetch from "cross-fetch";
import Driver from "../models/driver.js";
import { getPictureLink } from "./wikipediaApiHelper.js";

export const getRaceResults = async (race, year, round) => {
  const fetched = await fetch(
    `http://ergast.com/api/f1/${year}/${round}/results.json`
  );

  const json = await fetched.text();
  const data = JSON.parse(json);
  const result = data.MRData.RaceTable.Races;

  for (let index = 0; index < result[0].Results.length; index++) {
    const finisher = result[0].Results[index];

    const driverInfo = finisher.Driver;

    const firstName = driverInfo.givenName;
    const lastName = driverInfo.familyName;

    let driverInDB = await Driver.findOne({ firstName, lastName });

    if (!driverInDB) {
      const nationality = driverInfo.nationality;
      const dateOfBirth = driverInfo.dateOfBirth;
      const wikipediaLink = driverInfo.url;
      const pictureLink = await getPictureLink(firstName + " " + lastName);

      driverInDB = new Driver({
        firstName,
        lastName,
        nationality,
        dateOfBirth,
        wikipediaLink,
        seasonsDriven: [year],
        driverNumber: [finisher.number],
        teams: [finisher.Constructor.name],
        pictureLink,
      });
    } else if (!driverInDB.seasonsDriven.includes(year)) {
      driverInDB.seasonsDriven.push(year);
      if (!driverInDB.driverNumber.includes(finisher.number)) {
        driverInDB.driverNumber.push(finisher.number);
      }

      if (!driverInDB.teams.includes(finisher.Constructor.name)) {
        driverInDB.teams.push(finisher.Constructor.name);
      }
    }

    driverInDB.races.push({
      race,
      position: finisher.position,
      grid: finisher.grid,
    });

    const driver = await driverInDB.save();
    race.results.push({
      driver,
      position: finisher.position,
      grid: finisher.grid,
    });
  }
};
