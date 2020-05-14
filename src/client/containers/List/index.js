import * as React from 'react';
import {connect} from 'react-redux';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import ClickOutside from '../../components/ClickOutside';
import Button from '../../components/Button';
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

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      newCardFormIsOpen: false,
      newCardTitle: '',
      cardInEdit: null,
      editableCardTitle: '',
      isListTitleInEdit: false,
      newListTitle: ''
    };
  }

  toggleCardComposer = () => this.setState({newCardFormIsOpen: !this.state.newCardFormIsOpen});

  handleCardComposerChange = (event) => {
    this.setState({newCardTitle: event.target.value});
  };

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.handleSubmitCard(event);
    }
  };

  handleSubmitCard = (event) => {
    event.preventDefault();
    const {newCardTitle} = this.state;
    const {list, boardId, dispatch} = this.props;
    if (newCardTitle === '') return;
    dispatch(addCard(newCardTitle, list._id, boardId));
    this.setState({newCardTitle: '', newCardFormIsOpen: false});
  };

  openCardEditor = (card) => {
    this.setState({cardInEdit: card._id, editableCardTitle: card.title});
  };

  handleCardEditorChange = (event) => {
    this.setState({editableCardTitle: event.target.value});
  };

  handleEditKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.handleSubmitCardEdit();
    }
  };

  handleSubmitCardEdit = () => {
    const {editableCardTitle, cardInEdit} = this.state;
    const {list, boardId, dispatch} = this.props;
    if (editableCardTitle === '') {
      this.deleteCard(cardInEdit);
    } else {
      dispatch(editCardTitle(editableCardTitle, cardInEdit, list, boardId));
    }
    this.setState({editableCardTitle: '', cardInEdit: null});
  };

  deleteCard = (cardId) => {
    const {dispatch, list, boardId} = this.props;
    dispatch(deleteCard(cardId, list._id, boardId));
  };

  openTitleEditor = () => {
    this.setState({
      isListTitleInEdit: true,
      newListTitle: this.props.list.title
    });
  };

  handleListTitleEditorChange = (event) => {
    this.setState({newListTitle: event.target.value});
  };

  handleListTitleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.handleSubmitListTitle();
    }
  };

  handleSubmitListTitle = () => {
    const {newListTitle} = this.state;
    const {list, boardId, dispatch} = this.props;
    if (newListTitle === '') return;
    dispatch(editListTitle(newListTitle, list._id, boardId));
    this.setState({
      isListTitleInEdit: false,
      newListTitle: ''
    });
  };

  deleteList = () => {
    const {list, boardId, dispatch} = this.props;
    dispatch(deleteList(list.cards, list._id, boardId));
  };

  render = () => {
    const {cards, list} = this.props;
    const {
      newCardFormIsOpen,
      newCardTitle,
      cardInEdit,
      editableCardTitle,
      isListTitleInEdit,
      newListTitle
    } = this.state;
    return (
      <div className="list">
        {isListTitleInEdit ? (
          <ListTitleTextareaWrapper>
            <ListTitleTextarea
              value={newListTitle}
              onChange={this.handleListTitleEditorChange}
              onKeyDown={this.handleListTitleKeyDown}
              onBlur={this.handleSubmitListTitle}
            />
          </ListTitleTextareaWrapper>
        ) : (
          <ListTitle>
            <ListTitleButton onFocus={this.openTitleEditor} onClick={this.openTitleEditor} text={list.title} />
            <DeleteListButton onClick={this.deleteList} />
          </ListTitle>
        )}
        <Droppable droppableId={list._id}>
          {(provided) => (
            <div className="cards" ref={provided.innerRef}>
              {cards.map((card, index) => (
                <Draggable key={card._id} draggableId={card._id} index={index}>
                  {({innerRef, draggableProps, dragHandleProps, placeholder}) => (
                    <div>
                      {cardInEdit !== card._id ? (
                        <CardTitle
                          className="card-title"
                          ref={innerRef}
                          {...draggableProps}
                          {...dragHandleProps}
                          data-react-beautiful-dnd-draggable="0"
                          data-react-beautiful-dnd-drag-handle="0">
                          <span>{card.title}</span>
                          <ButtonWrapper>
                            <DeleteCardButton onClick={() => this.deleteCard(card._id)} />
                            <EditCardButton onClick={() => this.openCardEditor(card)} />
                          </ButtonWrapper>
                        </CardTitle>
                      ) : (
                        <TextareaWrapper>
                          <CardTextarea
                            autoFocus
                            useCacheForDOMMeasurements
                            value={editableCardTitle}
                            onChange={this.handleCardEditorChange}
                            onKeyDown={this.handleEditKeyDown}
                            onBlur={this.handleSubmitCardEdit}
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
                <ClickOutside handleClickOutside={this.toggleCardComposer}>
                  <CardTextareaForm onSubmit={this.handleSubmitCard}>
                    <CardTextarea
                      autoFocus
                      useCacheForDOMMeasurements
                      onChange={this.handleCardComposerChange}
                      onKeyDown={this.handleKeyDown}
                      value={newCardTitle}
                    />
                    <Button variant="add" type="submit" text="Add" disabled={newCardTitle === ''} />
                  </CardTextareaForm>
                </ClickOutside>
              )}
              {newCardFormIsOpen || (
                <ComposerWrapper>
                  <Button variant="card" text="Add new card" onClick={this.toggleCardComposer}>
                    Add new card
                  </Button>
                </ComposerWrapper>
              )}
            </div>
          )}
        </Droppable>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  cards: ownProps.list.cards.map((cardId) => state.cardsById[cardId])
});

export default connect(mapStateToProps)(List);
