import React, {useState} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {addList} from '../../actions/actionCreators';
import Button from '../Button';
import ListTitleTextarea from '../ListTitleTextarea';

const ListAdderTextareaWrapper = styled.div`
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
`;

const ListAdder = ({dispatch, boardId, numLeft}) => {
  const [isListInEdit, setIsListInEdit] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');

  const handleBlur = () => setIsListInEdit(false);

  const handleChange = (event) => setNewListTitle(event.target.value);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    dispatch(addList(newListTitle, boardId));
    setIsListInEdit(false);
    setNewListTitle('');
  };

  if (!isListInEdit) {
    return <Button list="true" onClick={() => setIsListInEdit(true)} text={`Add a new list (${numLeft})`} />;
  }
  return (
    <div className="list">
      <ListAdderTextareaWrapper className="list-title-textarea-wrapper">
        <ListTitleTextarea value={newListTitle} onChange={handleChange} onKeyDown={handleKeyDown} onBlur={handleBlur} />
      </ListAdderTextareaWrapper>
    </div>
  );
};

export default connect()(ListAdder);
