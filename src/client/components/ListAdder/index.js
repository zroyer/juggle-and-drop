import React, {useState} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
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

const ListAdder = ({numLeft, onAddList, showListAdder, setShowListAdder, newListTitle, setNewListTitle}) => {
  const handleChange = (event) => setNewListTitle(event.target.value);

  const handleKeyDown = (event, callback) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      callback();
    }
  };

  const handleAddList = () => {
    if (newListTitle.length > 0 && numLeft > 0) {
      onAddList();
    } else {
      setShowListAdder(false);
    }
  };

  if (!showListAdder) {
    return <Button variant="list" onClick={() => setShowListAdder(true)} text={`Add a new list (${numLeft})`} />;
  }
  return (
    <ListCard>
      <ListAdderTextareaWrapper>
        <ListTitleTextarea
          value={newListTitle}
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e, handleAddList)}
          onBlur={handleAddList}
        />
      </ListAdderTextareaWrapper>
    </ListCard>
  );
};

export default connect()(ListAdder);
