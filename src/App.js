
import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import { Container, withStyles } from '@material-ui/core';
import Header from './components/header/Header';
import Definitions from './components/Definitions/Definitions';
import { grey } from '@material-ui/core/colors';
import Switch from "@material-ui/core/Switch";

function App() {
  const [word,setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");
  const [Lightmode, setLightmode] = useState(false);

  const DarkMode = withStyles({
    switchBase: {
      color: grey[300],
      "&$checked": {
        color: grey[500],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const dictionaryApi = async() => {
    try {
       const data = await axios.get(
         `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
       );
      
       setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
   
  }
  // console.log(meanings);
  useEffect(() => {
    dictionaryApi();
  },[word,category])
  return (
    <div
      className="App"
      style={{
        height: "100vh",
        backgroundColor: Lightmode ? "#fff" : "#282c34",
        color: Lightmode ? "black" : "white",
        transition: "all 0.5 linear",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{ position: "absolute", top: 0, right: 13, paddingTop: 10 }}
        >
          <span>{Lightmode ? "Dark" : "Light"} Mode</span>
          <DarkMode
            checked={Lightmode}
            onChange={() => setLightmode(!Lightmode)}
          />
        </div>
        <Header
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}
          Lightmode={Lightmode}
        />
        {meanings && (
          <Definitions
            category={category}
            word={word}
            meanings={meanings}
            Lightmode={Lightmode}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
