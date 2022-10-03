import React, { useState } from "react";
import calcTower from "./calcTower";
import "./App.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
   
  function Block({ value, ...props }) {
    return (
      <div
        {...props}
        className="h-block"
        style={{ width: `${value * 3}vw` }}
      ></div>
    );
  } 

  function createTower(n) {
    return [...Array(n)].map((_, i) => n - i);
  }
  
  function createTowers(h) {
    return [createTower(h), [], []];
  }
  function move(blocks, from, to) {
    blocks[to].push(blocks[from].pop());
    return [...blocks];
  } 

  function CalcSection({ index, ...props }) {
    return (
      <>
        <div className="h-bottom"></div>       
          { index === 1 ?  'A': '' }        
          { index === 2 ?  'B': '' }        
          { index === 3 ?  'C': '' } 
      </>
    );
  }
  
  function ManageBlocks({ blocks, ...props }) {
    const height = blocks.reduce((acc, l) => acc + l.length, 0);
    const xs = [...Array(blocks.length)].map((_, x) => {
      const h = blocks[x].length;
      return (
        <div key={x} className="h-block-container">
          {[...Array(height)].map((_, y) => {
            const idx = height - y - 1;
            return <Block key={idx} value={idx < h ? blocks[x][idx] : 0} />;
          })}
          <CalcSection index={x + 1} />
        </div>
      );
    });
    return <div className="h-container">{xs}</div>;
  }
  
  function Results({ value, cursor, ...props }) {
    return (
      <div {...props}>
        {value.map(({ num, from, to }, i) => (
          <div
            key={i}
            className={i === cursor ? "h-highlight" : "h-normal"}
          >          
           {`${num} : `}           
           { from === 1 ?  'A': ''}  { from === 2 ?  'B': '' }  { from === 3 ?  'C': '' } 
           {` --> `} 
            { to === 1 ?  'A': '' }  { to === 2 ?  'B': '' }   { to === 3 ?  'C': '' } 
          </div>
        ))}
      </div>
    );
  }
  
  function App() {
    const initialBlockNum = 3;
    const [blocks, setBlocks] = useState(createTowers(initialBlockNum));
    const [cursor, setCursor] = useState(0);
    const [solution] = useState(calcTower(initialBlockNum));
      
    const btnLeft = e => {
      if (cursor > 0) {
        const { from, to } = solution[cursor - 1];
        setBlocks(move(blocks, to - 1, from - 1));
        setCursor(cursor - 1);
      }
    };
    const btnRight = e => {
      if (cursor < solution.length) {
        const { from, to } = solution[cursor];
        setBlocks(move(blocks, from - 1, to - 1));
        setCursor(cursor + 1);
      }
    };

    const btnReset = e => {
      document.location.reload();
    };

  return (
    <div className="App">
      <header className="App-header">  
        <Button onClick={btnReset}>Tower of Hanoi</Button>
      </header> 
     <Container>
      <Row>     
        <Col> 
        <ManageBlocks blocks={blocks} />
        </Col>
      </Row>     
      <Row className="">  
        <Col className="align-items-center h-padding">            
          <Button className="h-padding" 
             onClick={btnLeft}>{" Previous "} 
          </Button>        
          <Button className="h-padding" 
             onClick={btnRight}>{" Next "} 
          </Button>
        </Col>       
      </Row>
      <Row>
        <Col> <Results value={solution} cursor={cursor} /></Col>
      </Row>
     </Container> 
    </div>
  );
}

export default App;
