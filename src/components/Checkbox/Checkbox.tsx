import { useState, useEffect } from 'react';
import styled from 'styled-components';

type PropsTypes = {
  name: string,
  isChecked: boolean,
  children: string,
  onChange: (value: boolean) => void,
};

const StyledLabel = styled.label`
position: relative;
display: flex;
line-height: 19px;

input[type='checkbox']:checked {
  & + .indicator::before {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 14px;
    height: 14px;
    border-radius: 2px;
    background-color: #4A67FF;
    content: '';
  }
`;

const StyledInput = styled.input`
opacity: 0;
`;

const StyledIndicator = styled.span`
position: absolute;
width: 20px;
height: 20px;
border: 1px solid black;
border-radius: 4px;
cursor: pointer;
`;

const StyledValue = styled.span`
padding-left: 10px;
cursor: pointer;
`;

function Checkbox(props: PropsTypes) {
  const {
    name,
    isChecked,
    children,
    onChange,
  } = props;

  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    if (onChange) onChange(checked);
  }, [checked]);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <StyledLabel>
        <StyledInput type="checkbox" name={name} checked={checked} onChange={handleCheckboxChange} />
        <StyledIndicator className="indicator" />
        <StyledValue>{children}</StyledValue>
      </StyledLabel>
    </div>
  );
}

export default Checkbox;
