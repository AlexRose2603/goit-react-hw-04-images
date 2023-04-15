import React from 'react';
import { useState } from 'react';
import { Container, Form, SearchInput, SearchBtn } from './Searchbar.styled';
export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(value);
    setValue(value);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
        <SearchBtn type="submit">Search</SearchBtn>
      </Form>
    </Container>
  );
};
