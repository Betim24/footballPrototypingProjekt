import { MongoClient, ObjectId } from "mongodb"; // MongoDB Treiber importieren
import { DB_URI } from "$env/static/private"; // Umgebungsvariable für MongoDB URI

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("groundhopping"); // Wähle die groundhopping-Datenbank

//////////////////////////////////////////
// Stadiums
//////////////////////////////////////////

// Alle Stadiums abrufen
async function getStadiums() {
  let stadiums = [];
  try {
    const collection = db.collection("stadiums");
    const query = {};
    stadiums = await collection.find(query).toArray();
    stadiums.forEach((stadium) => {
      stadium._id = stadium._id.toString(); // ObjectId in String umwandeln
    });
  } catch (error) {
    console.error(error);
  }
  return stadiums;
}

// Stadium nach ID abrufen
async function getStadium(id) {
  let stadium = null;
  try {
    const collection = db.collection("stadiums");
    stadium = await collection.findOne({ _id: new ObjectId(id) });

    if (stadium) {
      stadium._id = stadium._id.toString();
    } else {
      console.error("Kein Stadium mit ID: " + id);
    }
  } catch (error) {
    console.error(error);
  }
  return stadium;
}

// Neues Stadium hinzufügen
async function createStadium(stadium) {
  try {
    const collection = db.collection("stadiums");
    const result = await collection.insertOne(stadium);
    return result.insertedId.toString();
  } catch (error) {
    console.error(error);
  }
  return null;
}

// Stadium aktualisieren
async function updateStadium(stadium) {
  try {
    let id = stadium._id;
    delete stadium._id; // _id darf nicht aktualisiert werden
    const collection = db.collection("stadiums");
    const query = { _id: new ObjectId(id) };
    const result = await collection.updateOne(query, { $set: stadium });

    if (result.matchedCount > 0) {
      return id;
    } else {
      console.error("Kein Stadium mit ID: " + id);
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

// Stadium löschen
async function deleteStadium(id) {
  try {
    const collection = db.collection("stadiums");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      return id;
    } else {
      console.error("Kein Stadium mit ID: " + id);
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

// Stadium als besucht markieren
async function markStadiumVisited(stadiumName) {
  try {
    const collection = db.collection("stadiums");
    const result = await collection.updateOne(
      { name: stadiumName }, // Stadium finden anhand des Namens
      { $set: { visited: true } } // "visited" auf true setzen
    );
    if (result.matchedCount === 0) {
      console.error(`Kein Stadium mit dem Namen "${stadiumName}" gefunden.`);
    }
  } catch (error) {
    console.error(error);
  }
}

//////////////////////////////////////////
// Matches
//////////////////////////////////////////

// Alle Matches abrufen
async function getMatches() {
  let matches = [];
  try {
    const collection = db.collection("matches");
    matches = await collection.find({}).toArray();
    matches.forEach((match) => {
      match._id = match._id.toString();
    });
  } catch (error) {
    console.error(error);
  }
  return matches;
}

// Match nach ID abrufen
async function getMatch(id) {
  let match = null;
  try {
    const collection = db.collection("matches");
    match = await collection.findOne({ _id: new ObjectId(id) });

    if (match) {
      match._id = match._id.toString();
    } else {
      console.error("Kein Match mit ID: " + id);
    }
  } catch (error) {
    console.error(error);
  }
  return match;
}

// Neues Match hinzufügen
async function createMatch(match) {
  try {
    const collection = db.collection("matches");
    const result = await collection.insertOne(match);
    return result.insertedId.toString();
  } catch (error) {
    console.error(error);
  }
  return null;
}

// Match aktualisieren
async function updateMatch(match) {
  try {
    let id = match._id;
    delete match._id;
    const collection = db.collection("matches");
    const query = { _id: new ObjectId(id) };
    const result = await collection.updateOne(query, { $set: match });

    if (result.matchedCount > 0) {
      return id;
    } else {
      console.error("Kein Match mit ID: " + id);
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

// Match löschen
async function deleteMatch(id) {
  try {
    const collection = db.collection("matches");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      return id;
    } else {
      console.error("Kein Match mit ID: " + id);
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

// Funktionen exportieren
export default {
  getStadiums,
  getStadium,
  createStadium,
  updateStadium,
  deleteStadium,
  markStadiumVisited, // Neue Funktion exportieren
  getMatches,
  getMatch,
  createMatch,
  updateMatch,
  deleteMatch,
};
