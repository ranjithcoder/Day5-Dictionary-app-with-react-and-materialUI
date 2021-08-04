import { createTheme, MenuItem, TextField, ThemeProvider } from '@material-ui/core';
import React from 'react';
import "./Header.css";
import categories from '../../data/categories';


export const Header = ({ setCategory, category, setWord, word, Lightmode }) => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: Lightmode ? "#000":"#fff",
      },
      type: Lightmode?"light":"dark",
    },
  });

  const handleChange = (language) => {
    setCategory(language);
    setWord("");
  };
  return (
    <div className="header">
      <span className="title">{word ? word : "Word Hunt"}</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            label="search a word"
            className="search"
            value={word}
            onChange={(e) => {
              setWord(e.target.value);
            }}
          />
          <TextField
            select
            className="select"
            value={category}
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            label="Language"
          >
            {categories.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
