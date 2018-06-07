const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || "1738";

const api = db => {
  console.log(db)
  const router = express.Router();
  const boards = db.collection("boards");

  router.put("/board", (req, res) => {
    const board = req.body;
    boards
      .replaceOne({ _id: board._id, users: req.user._id }, board, {
        upsert: true
      })
      .then(result => {
        res.send(result);
      });
  });

  return router;
};

const normalizeBoards = boards => {
  const card = new schema.Entity("cardsById", {}, { idAttribute: "_id" });
  const list = new schema.Entity(
    "listsById",
    { cards: [card] },
    { idAttribute: "_id" }
  );
  const board = new schema.Entity(
    "boardsById",
    { lists: [list] },
    { idAttribute: "_id" }
  );
  const { entities } = normalize(boards, [board]);
  return entities;
};

const fetchBoardData = db => (req, res, next) => {
  if (req.user) {
    const collection = db.collection("boards");
    collection
      .find({ $or: [{ users: req.user._id }, { isPublic: true }] })
      .toArray()
      .then(boards => {
        req.initialState = { ...normalizeBoards(boards), user: req.user };
        next();
      });
  } else {
    req.initialState = {};
    next();
  }
};

mongoose.connect('mongodb://user:password123@ds151970.mlab.com:51970/doing-things-example');
const db = mongoose.connection;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", api(db));
app.use(fetchBoardData(db));

app.listen(port, () => console.log(`Server running on port ${port}`));
