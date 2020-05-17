/* eslint-disable no-console */
import axios from 'axios';
import shortid from 'shortid';

/**
 * Board action creators
 */

export const addBoard = (boardTitle) => (dispatch) => {
  const boardId = shortid.generate();
  dispatch({
    type: 'ADD_BOARD',
    payload: {boardTitle, boardId}
  });

  axios.post('/api/board', {boardTitle, boardId}).then(({data}) => console.log(data));
};

export const deleteBoard = (boardId) => (dispatch) => {
  dispatch({
    type: 'DELETE_BOARD',
    payload: {boardId}
  });
  axios.delete('/api/board', {data: {boardId}}).then(({data}) => console.log(data));
};

export const reorderBoard = (listId, sourceId, sourceIndex, destinationIndex) => (dispatch) => {
  dispatch({
    type: 'REORDER_LISTS',
    payload: {
      sourceId,
      sourceIndex,
      destinationIndex
    }
  });

  axios
    .put('/api/reorder-board', {
      listId,
      sourceId,
      sourceIndex,
      destinationIndex
    })
    .then(({data}) => console.log(data));
};

/**
 * List action creators
 */

export const addList = (listTitle, boardId) => (dispatch) => {
  const listId = shortid.generate();
  dispatch({
    type: 'ADD_LIST',
    payload: {listTitle, listId, boardId}
  });

  axios.post('/api/list', {listTitle, listId, boardId}).then(({data}) => console.log(data));
};

export const editListTitle = (listTitle, listId, boardId) => (dispatch) => {
  dispatch({
    type: 'EDIT_LIST_TITLE',
    payload: {
      listTitle,
      listId
    }
  });

  axios.put('/api/list', {listTitle, listId, boardId}).then(({data}) => console.log(data));
};

export const deleteList = (cards, listId, boardId) => (dispatch) => {
  dispatch({
    type: 'DELETE_LIST',
    payload: {cards, listId, boardId}
  });
  axios.delete('/api/list', {data: {listId, boardId}}).then(({data}) => console.log(data));
};

export const reorderList = (cardId, sourceId, destinationId, sourceIndex, destinationIndex, boardId) => (dispatch) => {
  dispatch({
    type: 'REORDER_LIST',
    payload: {
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex
    }
  });

  axios
    .put('/api/reorder-list', {
      cardId,
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex,
      boardId
    })
    .then(({data}) => console.log(data));
};

/**
 * Card action creators
 */

export const addCard = ({cardTitle, listId, boardId}) => (dispatch) => {
  return axios.post('/api/card', {cardTitle, listId, boardId}).then(({data}) => {
    dispatch({
      type: 'ADD_CARD',
      payload: {cardTitle, listId, cardId: data.cardId}
    });
  });
};

export const editCardTitle = ({cardTitle, cardId, cardIndex, listId, boardId}) => (dispatch) => {
  return axios.put('/api/card', {cardTitle, cardIndex, listId, boardId}).then(() => {
    dispatch({
      type: 'EDIT_CARD_TITLE',
      payload: {
        cardTitle,
        cardId,
        listId
      }
    });
  });
};

export const deleteCard = ({cardId, listId, boardId}) => (dispatch) => {
  return axios.delete('/api/card', {data: {cardId, listId, boardId}}).then(() => {
    dispatch({type: 'DELETE_CARD', payload: {cardId, listId}});
  });
};
