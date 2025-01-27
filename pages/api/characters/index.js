import dbConnect from "../../../server/lib/dbConnect";
import CharacterModel from "../../../server/models/Character";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const character = req.body;

        const dbCharacter = await CharacterModel.create(character);

        return res.send(dbCharacter);
      } catch (error) {
        return res.status(400).json({ errorMessage: error.message });
      }

    case "GET":
      try {
        const allCharacters = await CharacterModel.find();
        return res.json(allCharacters);
      } catch (error) {
        return res.status(400).json({ errorMessage: error.message });
      }

    default:
      res.status(405).json({
        errorMessage: `No such method for this url: ${req.url}.`,
      });
      break;
  }
}
