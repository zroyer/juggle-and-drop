import {Router} from 'express';
import shortid from 'shortid';

const api = (db) => {
  const router = Router();
  const boards = db.collection('boards');

  /**
   * Board
   */
  router.post('/board', (req, res) => {
    const {boardTitle, boardId} = req.body;
    boards.insert({_id: boardId, title: boardTitle, lists: []}).then((result) => res.send(result));
  });

  router.delete('/board', (req, res) => {
    const {boardId} = req.body;
    boards.findOneAndDelete({_id: boardId}).then((result) => res.send(result));
  });

  router.put('/reorder-board', (req, res) => {
    const {listId, sourceId, sourceIndex, destinationIndex} = req.body;

    boards.findOneAndUpdate({_id: sourceId}, {$pull: {lists: {_id: listId}}}).then(({value}) => {
      const list = value.lists[sourceIndex];
      db.collection('boards').updateOne(
        {_id: sourceId},
        {
          $push: {
            lists: {$each: [list], $position: destinationIndex}
          }
        }
      );
      res.send({value, list});
    });
  });

  /**
   * List
   */

  router.post('/list', (req, res) => {
    const {listId, listTitle, boardId} = req.body;

    boards
      .updateOne({_id: boardId}, {$push: {lists: {_id: listId, title: listTitle, cards: []}}})
      .then((result) => res.send(result));
  });

  router.put('/list', (req, res) => {
    const {listTitle, listId, boardId} = req.body;

    boards
      .updateOne({_id: boardId, 'lists._id': listId}, {$set: {'lists.$.title': listTitle}})
      .then((result) => res.send(result));
  });

  router.delete('/list', (req, res) => {
    const {listId, boardId} = req.body;

    boards.updateOne({_id: boardId}, {$pull: {lists: {_id: listId}}}).then((result) => res.send(result));
  });

  router.put('/reorder-list', (req, res) => {
    const {cardId, sourceId, destinationId, sourceIndex, destinationIndex, boardId} = req.body;

    boards
      .findOneAndUpdate(
        {_id: boardId, 'lists._id': sourceId},
        {$pull: {'lists.$.cards': {_id: cardId}}},
        {projection: {'lists.$.cards': true}}
      )
      .then(({value}) => {
        const card = value.lists[0].cards[sourceIndex];
        db.collection('boards').updateOne(
          {_id: boardId, 'lists._id': destinationId},
          {
            $push: {
              'lists.$.cards': {$each: [card], $position: destinationIndex}
            }
          }
        );
        res.send({value, card});
      });
  });

  /**
   * Card
   */

  router.post('/card', (req, res) => {
    const cardId = shortid.generate();
    const {cardTitle, listId, boardId} = req.body;
    boards
      .updateOne({_id: boardId, 'lists._id': listId}, {$push: {'lists.$.cards': {_id: cardId, title: cardTitle}}})
      .then((result) => res.send({result, cardId}))
      .catch((error) => {
        console.error(error);
      });
  });

  router.put('/card', (req, res) => {
    const {cardTitle, cardIndex, listId, boardId} = req.body;
    const title = `lists.$.cards.${cardIndex}.title`;
    boards
      .updateOne({_id: boardId, 'lists._id': listId}, {$set: {[title]: cardTitle}})
      .then((result) => res.send(result))
      .catch((error) => {
        console.error(error);
      });
  });

  router.delete('/card', (req, res) => {
    const {cardId, listId, boardId} = req.body;
    boards
      .updateOne({_id: boardId, 'lists._id': listId}, {$pull: {'lists.$.cards': {_id: cardId}}})
      .then((result) => res.send(result))
      .catch((error) => {
        console.error(error);
      });
  });

  return router;
};

export default api;
