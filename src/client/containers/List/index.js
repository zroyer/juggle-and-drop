import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import ClickOutside from '../../components/ClickOutside';
import Button from '../../components/Button';
import ListCard from '../../components/ListCard';
import ListTitleButton from '../../components/ListTitleButton';
import DeleteListButton from '../../components/DeleteListButton';
import DeleteCardButton from '../../components/DeleteCardButton';
import EditCardButton from '../../components/EditCardButton';
import CardTextarea from '../../components/CardTextarea';
import ListTitleTextarea from '../../components/ListTitleTextarea';
import {addCard, editCardTitle, deleteCard, editListTitle, deleteList} from '../../actions/actionCreators';

const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0 10px;
`;

const ListTitleTextareaWrapper = styled.div`
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
`;

const CardTextareaForm = styled(TextareaWrapper.withComponent('form'))`
  margin: 0 10px 10px 10px;
`;

const ComposerWrapper = styled.div`
  display: flex;
  justify-content: center;
  background: #f8f8f8;
  padding: 0 0 10px 0;
  border: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const ListTitle = styled.div`
  display: flex;
  flex-shrink: 0;
  height: 48px;
  align-items: center;
  color: rgb(46, 68, 78);
`;

const CardTitle = styled.div`
  background: white;
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.1);
  margin: 0 10px 10px 10px;
  padding: 8px;
  border-radius: 5px;
  position: relative;
  overflow-wrap: break-word;
  overflow: visible;
  word-wrap: break-word;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover,
  &:active,
  &:focus {
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.3);
  }
`;

const ButtonWrapper = styled.div`
  height: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const List = ({dispatch, boardId, cards, list}) => {
  const [newCardFormIsOpen, setNewCardFormIsOpen] = useState(false);
  const [isListTitleInEdit, setIsListTitleInEdit] = useState(false);
  const [cardInEdit, setCardInEdit] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newListTitle, setNewListTitle] = useState('');
  const [tempCardTitle, setTempCardTitle] = useState('');

  const toggleCardComposer = () => setNewCardFormIsOpen(!newCardFormIsOpen);

  const handleCardComposerChange = (event) => {
    setNewCardTitle(event.target.value.trim());
  };

  const handleKeyDown = (event, callback) => {
    if (event.keyCode === 13) {
      callback(event);
    }
  };

  const handleSubmitCard = (event) => {
    event.preventDefault();
    if (newCardTitle.length < 1) return;
    dispatch(addCard(newCardTitle, list._id, boardId));
    setNewCardTitle('');
    setNewCardFormIsOpen(false);
  };

  const openCardEditor = (card) => {
    setCardInEdit(card._id);
    setTempCardTitle(card.title);
  };

  const handleCardEditorChange = (event) => {
    setTempCardTitle(event.target.value.trim());
  };

  const handleListTitleEditorChange = (event) => {
    setNewListTitle(event.target.value.trim());
  };

  const handleCardEdit = () => {
    if (tempCardTitle.length < 1) {
      handleDeleteCard(cardInEdit);
    } else {
      dispatch(editCardTitle(tempCardTitle, cardInEdit, list, boardId));
    }
    setTempCardTitle('');
    setCardInEdit(null);
  };

  const handleDeleteCard = (cardId) => {
    dispatch(deleteCard(cardId, list._id, boardId));
  };

  const openTitleEditor = () => {
    setIsListTitleInEdit(true);
    setNewListTitle(list.title);
  };

  const handleSubmitListTitle = () => {
    if (newListTitle.length < 1) return;
    dispatch(editListTitle(newListTitle, list._id, boardId));
    setNewListTitle('');
    setIsListTitleInEdit(false);
  };

  const handleDeleteListButtonClick = (event) => {
    event.preventDefault();
    dispatch(deleteList(list.cards, list._id, boardId));
  };

  return (
    <ListCard>
      {isListTitleInEdit ? (
        <ListTitleTextareaWrapper>
          <ListTitleTextarea
            value={newListTitle}
            onChange={handleListTitleEditorChange}
            onKeyDown={(e) => handleKeyDown(e, handleSubmitListTitle)}
          />
        </ListTitleTextareaWrapper>
      ) : (
        <ListTitle>
          <ListTitleButton onFocus={openTitleEditor} onClick={openTitleEditor} text={list.title} />
          <DeleteListButton onClick={(e) => handleDeleteListButtonClick(e)} />
        </ListTitle>
      )}
      <Droppable droppableId={list._id}>
        {(provided) => (
          <div ref={provided.innerRef}>
            {cards.map((card, index) => (
              <Draggable key={card._id} draggableId={card._id} index={index}>
                {({innerRef, draggableProps, dragHandleProps, placeholder}) => (
                  <div>
                    {cardInEdit !== card._id ? (
                      <CardTitle
                        ref={innerRef}
                        {...draggableProps}
                        {...dragHandleProps}
                        data-react-beautiful-dnd-draggable="0"
                        data-react-beautiful-dnd-drag-handle="0">
                        {card.title}
                        <ButtonWrapper>
                          <DeleteCardButton onClick={() => handleDeleteCard(card._id)} />
                          <EditCardButton onClick={() => openCardEditor(card)} />
                        </ButtonWrapper>
                      </CardTitle>
                    ) : (
                      <TextareaWrapper>
                        <CardTextarea
                          value={tempCardTitle}
                          onChange={handleCardEditorChange}
                          onKeyDown={(e) => handleKeyDown(e, handleCardEdit)}
                          onBlur={handleCardEdit}
                        />
                      </TextareaWrapper>
                    )}
                    {placeholder}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {newCardFormIsOpen && (
              <ClickOutside handleClickOutside={toggleCardComposer}>
                <CardTextareaForm onSubmit={handleSubmitCard}>
                  <CardTextarea
                    value={newCardTitle}
                    onChange={handleCardComposerChange}
                    onKeyDown={(e) => handleKeyDown(e, handleSubmitCard)}
                  />
                  <Button variant="add" type="submit" text="Add" disabled={newCardTitle === ''} />
                </CardTextareaForm>
              </ClickOutside>
            )}
            {newCardFormIsOpen || (
              <ComposerWrapper>
                <Button variant="card" text="Add new card" onClick={toggleCardComposer}>
                  Add new card
                </Button>
              </ComposerWrapper>
            )}
          </div>
        )}
      </Droppable>
    </ListCard>
  );
};

const mapStateToProps = (state, props) => ({
  cards: props.list.cards.map((cardId) => state.cardsById[cardId])
});

export default connect(mapStateToProps)(List);
