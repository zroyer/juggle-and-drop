// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import shortid from 'shortid';
import Textarea from 'react-textarea-autosize';
import ClickOutside from '../components/ClickOutside';
import Button from '../components/Button';
import ListTitleButton from '../components/ListTitleButton';
import DeleteListButton from '../components/DeleteListButton';
import DeleteCardButton from '../components/DeleteCardButton';
import EditCardButton from '../components/EditCardButton';
import CardTextarea from '../components/CardTextarea';
import ListTitleTextarea from '../components/ListTitleTextarea';

type Props = {
  boardId: string,
  list: {
    title: string,
    id: string,
    cards: Array<string>
  },
  cards: Array<{ title: string, id: string }>,
  dispatch: ({ type: string }) => void
};

type State = {
  cardComposerIsOpen: boolean,
  newCardTitle: string,
  cardInEdit: ?string,
  editableCardTitle: string,
  isListTitleInEdit: boolean,
  newListTitle: string
};

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
  background: #F8F8F8;
  padding: 0 0 10px 0;
  border: none;
  cursor: pointer;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const ListTitle = styled.div`
  display: flex;
  flex-shrink: 0;
  height: 48px;
  align-items: center;
  color: rgb(46,68,78);
`;

class List extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      cardComposerIsOpen: false,
      newCardTitle: "",
      cardInEdit: null,
      editableCardTitle: "",
      isListTitleInEdit: false,
      newListTitle: ""
    };
  }

  toggleCardComposer = () =>
    this.setState({ cardComposerIsOpen: !this.state.cardComposerIsOpen });

  handleCardComposerChange = (event: { target: { value: string } }) => {
    this.setState({ newCardTitle: event.target.value });
  };

  handleKeyDown = (event: SyntheticEvent<>) => {
    if (event.keyCode === 13) {
      this.handleSubmitCard(event);
    }
  };

  handleSubmitCard = event => {
    event.preventDefault();
    const { newCardTitle } = this.state;
    const { list, dispatch } = this.props;
    if (newCardTitle === "") return;
    dispatch({
      type: "ADD_CARD",
      payload: {
        cardId: shortid.generate(),
        cardTitle: newCardTitle,
        listId: list.id
      }
    });
    this.setState({ newCardTitle: "", cardComposerIsOpen: false });
  };

  openCardEditor = card => {
    this.setState({ cardInEdit: card.id, editableCardTitle: card.title });
  };

  handleCardEditorChange = (event: { target: { value: string } }) => {
    this.setState({ editableCardTitle: event.target.value });
  };

  handleEditKeyDown = (event: SyntheticEvent<>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.handleSubmitCardEdit();
    }
  };

  handleSubmitCardEdit = () => {
    const { editableCardTitle, cardInEdit } = this.state;
    const { list, dispatch } = this.props;
    if (editableCardTitle === "") return;
    dispatch({
      type: "EDIT_CARD_TITLE",
      payload: {
        cardId: cardInEdit,
        cardTitle: editableCardTitle,
        listId: list.id
      }
    });
    this.setState({ editableCardTitle: "", cardInEdit: null });
  };

  deleteCard = cardId => {
    const { dispatch, list } = this.props;
    dispatch({ type: "DELETE_CARD", payload: { cardId, listId: list.id } });
  };

  openTitleEditor = () => {
    this.setState({
      isListTitleInEdit: true,
      newListTitle: this.props.list.title
    });
  };

  handleListTitleEditorChange = (event: { target: { value: string } }) => {
    this.setState({ newListTitle: event.target.value });
  };

  handleListTitleKeyDown = (event: SyntheticEvent<>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.handleSubmitListTitle();
    }
  };

  handleSubmitListTitle = () => {
    const { newListTitle } = this.state;
    const { list, dispatch } = this.props;
    if (newListTitle === "") return;
    dispatch({
      type: "EDIT_LIST_TITLE",
      payload: {
        listTitle: newListTitle,
        listId: list.id
      }
    });
    this.setState({
      isListTitleInEdit: false,
      newListTitle: ""
    });
  };

  deleteList = () => {
    const { list, boardId, dispatch } = this.props;
    dispatch({
      type: "DELETE_LIST",
      payload: {
        listId: list.id,
        boardId,
        cards: list.cards
      }
    });
  };

  render = () => {
    const { cards, list } = this.props;
    const {
      cardComposerIsOpen,
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
              autoFocus
              useCacheForDOMMeasurements
              value={newListTitle}
              onChange={this.handleListTitleEditorChange}
              onKeyDown={this.handleListTitleKeyDown}
              onBlur={this.handleSubmitListTitle}
            />
          </ListTitleTextareaWrapper>
        ) : (
          <ListTitle>
            <ListTitleButton
              onFocus={this.openTitleEditor}
              onClick={this.openTitleEditor}
              text={list.title}
            />
            <DeleteListButton onClick={this.deleteList} />
          </ListTitle>
        )}
        <Droppable droppableId={list.id}>
          {provided => (
            <div ref={provided.innerRef}>
              {cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {({
                    innerRef,
                    draggableProps,
                    dragHandleProps,
                    placeholder
                  }) => (
                    <div>
                      {cardInEdit !== card.id ? (
                        <div
                          className="card-title"
                          ref={innerRef}
                          {...draggableProps}
                          {...dragHandleProps}
                          data-react-beautiful-dnd-draggable="0"
                          data-react-beautiful-dnd-drag-handle="0"
                        >
                          <span>{card.title}</span>
                          <DeleteCardButton onClick={() => this.deleteCard(card.id)} />
                          <EditCardButton onClick={() => this.openCardEditor(card)} />
                        </div>
                      ) : (
                        <TextareaWrapper>
                          <CardTextarea
                            autoFocus
                            useCacheForDOMMeasurements
                            minRows={3}
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
              {cardComposerIsOpen && (
                <ClickOutside handleClickOutside={this.toggleCardComposer}>
                  <CardTextareaForm
                    onSubmit={this.handleSubmitCard}
                  >
                    <CardTextarea
                      autoFocus
                      useCacheForDOMMeasurements
                      minRows={3}
                      onChange={this.handleCardComposerChange}
                      onKeyDown={this.handleKeyDown}
                      value={newCardTitle}
                    />
                    <Button
                      add
                      type="submit"
                      text="Add"
                      disabled={newCardTitle === ""}
                    />
                  </CardTextareaForm>
                </ClickOutside>
              )}
              {cardComposerIsOpen || (
                <ComposerWrapper>
                  <Button
                    card
                    text="Add new card"
                    onClick={this.toggleCardComposer}
                    >
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
  cards: ownProps.list.cards.map(cardId => state.cards[cardId])
});

export default connect(mapStateToProps)(List);
