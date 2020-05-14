import React from 'react';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';

const StyledCardTextarea = styled(Textarea)`
  border-radius: 4px;
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.1);
  border: none;
  padding: 8px;
  margin-bottom: 10px;
  overflow: ;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  outline: none;
  resize: none;
`;

const handleOnFocus = (e) => {
  const val = e.target.value;
  e.target.value = '';
  e.target.value = val;
};

const CardTextarea = ({...props}) => {
  return <StyledCardTextarea autoFocus useCacheForDOMMeasurements onFocus={handleOnFocus} {...props} />;
};

export default CardTextarea;
