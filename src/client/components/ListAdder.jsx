import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addList } from '../actions/actionCreators';
import Button from './Button';
import ListTitleTextarea from './ListTitleTextarea';

const ListAdderTextareaWrapper = styled.div`
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
`;

class ListAdder extends Component<Props, State> {
  constructor() {
    super();
    this.state = {
      isListInEdit: false,
      newListTitle: ""
    };
  }
  handleBlur = () => {
    this.setState({ isListInEdit: false });
  };
  handleChange = event => {
    this.setState({ newListTitle: event.target.value });
  };
  handleKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.handleSubmit();
    }
  };
  handleSubmit = () => {
    const { dispatch, boardId } = this.props;
    const { newListTitle } = this.state;
    dispatch(addList(newListTitle, boardId));
    this.setState({ isListInEdit: false, newListTitle: "" });
  };
  render = () => {
    const { isListInEdit, newListTitle } = this.state;
    if (!isListInEdit) {
      return (
        <Button
          list='true'
          onClick={() => this.setState({ isListInEdit: true })}
          text={`Add a new list (${this.props.numLeft})`}
        />
      );
    }
    return (
      <div className="list">
        <ListAdderTextareaWrapper className="list-title-textarea-wrapper">
          <ListTitleTextarea
            autoFocus
            useCacheForDOMMeasurements
            value={newListTitle}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleBlur}
          />
        </ListAdderTextareaWrapper>
      </div>
    );
  };
}

export default connect()(ListAdder);
