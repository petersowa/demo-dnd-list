import styled from 'styled-components';

export default styled.div`
  width: 2rem;
  padding-bottom: auto;
  text-align: center;
  align-self: center;
  background-color: orange;
  border-radius: 0.4rem;
  margin-right: 0.5rem;
  transition: background-color 0.2s ease;
  &::after {
    content: '';
  }
  &:hover,
  &:active {
    background-color: yellow;
  }
`;
