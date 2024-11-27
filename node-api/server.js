const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const port = 3001;

const credentials = {
  password: "password123",
  username: "admin",
};

const url = `mongodb://${credentials.username}:${credentials.password}@mongodb:27017/admin`;
const dbName = "vehicles_db";

app.use(express.json());

let db = null;

async function connectToMongo() {
  try {
    const client = await MongoClient.connect(url);
    db = client.db(dbName);
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

connectToMongo();

app.get("/data/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  delete require.cache[require.resolve(`./data/${fileName}`)];
  const data = require(`./data/${fileName}`);
  res.json(data);
});

app.post("/query", async (req, res) => {
  try {
    const { collection, query, projection, sort, limit, aggregate } = req.body;

    if (!collection) {
      return res.status(400).json({ error: "Collection name is required" });
    }

    let result;

    if (aggregate) {
      result = await db.collection(collection).aggregate(aggregate).toArray();
    } else {
      result = await db
        .collection(collection)
        .find(query || {})
        .project(projection || {})
        .sort(sort || {})
        .limit(limit || 100)
        .toArray();
    }

    res.json(result);
  } catch (error) {
    console.error("Query execution error:", error);
    res
      .status(500)
      .json({ error: "Failed to execute query", mongo: error, post: req.body });
  }
});

app.listen(port, () => {
  console.log(`Node.js API listening at http://localhost:${port}`);
});
