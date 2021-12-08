import wiki from "wikijs";
import Circuit from "../models/circuit.js";
import Race from "../models/race.js";
import Season from "../models/season";
import { getRaceResults } from "./ergestApiHelper.js";
import ParseRaceData, { parseCircuitToDB } from "./ParseRaceData.js";

const headers = {
  "User-Agent":
    "F1history/0.0 (https://example.org/; cool-tool@example.org) wikijs/6.3",
};

export const addCircuit = async (name) => {
  try {
    const page = await wiki({
      headers,
    }).find(name);

    const length = await page.info("lengthKm");
    const capacity = await page.info("capacity");
    const location = await page.info("location");

    return await parseCircuitToDB({
      name,
      length: length ? Number.parseFloat(length) : undefined,
      capacity: capacity ? Number.parseFloat(capacity) : undefined,
      location: location || "unkown",
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
};

export const addSeason = async (year) => {
  const seasonPage = await wiki({
    headers,
  }).find(`${year} Formula One Season`);
  const seasonInfo = await seasonPage.info();
  const tables = await seasonPage.tables();

  const racesSeason = tables.filter(
    (table) =>
      (table[0].round && (table[0].tooltip || table[0].report)) ||
      (table[0].rnd && (table[0].tooltip || table[0].report))
  )[0];

  const seasonObj = new Season({
    wikipediaLink: seasonPage.fullurl,
    year,
  });
  if (racesSeason) {
    for (let i = 0; i < racesSeason.length; i++) {
      try {
        const race = racesSeason[i];

        const round = race.round
          ? parseInt(race.round.replace(/[^0-9.]/g, ""))
          : parseInt(race.rnd.replace(/[^0-9.]/g, ""));

        const tooltip = race.tooltip ? race.tooltip : race.report;
        console.log(tooltip);

        let raceDB = await Race.findOne({ grandPrix: tooltip });

        if (!raceDB) {
          const report = await wiki({
            headers,
          }).page(tooltip);
          const raceData = await report.info();
          const picture = await report.mainImage();

          raceDB = await addRace(
            await ParseRaceData(
              raceData,
              tooltip,
              picture,
              race,
              seasonObj.year
            ),
            raceData.location[0]
          );
        }
        seasonObj.races.push(raceDB);

        await getRaceResults(raceDB, seasonInfo.year, round);

        await raceDB.save();
      } catch (error) {
        console.log(error);
      }
    }
  }

  return await seasonObj.save();
};

export const addRace = async (race, circuitName) => {
  let circuit = await Circuit.findOne({ name: circuitName });

  if (!circuit) {
    circuit = await addCircuit(circuitName);
  }

  const newRace = new Race({ ...race, circuit: circuit });
  return newRace;
};

export const getPictureLink = async (keyword) => {
  try {
    const page = await wiki({
      headers,
    }).find(keyword + " driver");
    const picture = await page.mainImage();
    return (
      picture || "https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg"
    );
  } catch (error) {
    console.log("Could not get picture " + error.message);
  }
};
