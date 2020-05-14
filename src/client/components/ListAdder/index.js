import React, {useState} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {addList} from '../../actions/actionCreators';
import Button from '../Button';
import ListTitleTextarea from '../ListTitleTextarea';
import ListCard from '../ListCard';

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
    return <Button variant="list" onClick={() => setIsListInEdit(true)} text={`Add a new list (${numLeft})`} />;
  }
  return (
    <ListCard>
      <ListAdderTextareaWrapper>
        <ListTitleTextarea value={newListTitle} onChange={handleChange} onKeyDown={handleKeyDown} onBlur={handleBlur} />
      </ListAdderTextareaWrapper>
    </ListCard>
  );
};

export default connect()(ListAdder);
