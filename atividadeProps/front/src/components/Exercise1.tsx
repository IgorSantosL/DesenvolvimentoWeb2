import React, { useState } from 'react';
 
const containerStyle: React.CSSProperties = {
  backgroundColor: '#222',
  padding: '20px',
  borderRadius: '10px',
  width: '320px',
  textAlign: 'center',
  marginBottom: '20px',
};
 
const inputStyle: React.CSSProperties = {
  padding: '10px',
  borderRadius: '5px',
  border: 'none',
  textAlign: 'center',
  fontSize: '16px',
  width: '90%',
  outline: 'none',
};
 
const buttonStyle: React.CSSProperties = {
  marginTop: '10px',
  padding: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
  backgroundColor: '#3498db',
  color: '#fff',
  border: 'none',
  fontSize: '16px',
};
 
const Ball: React.FC<{ number: number }> = ({ number }) => {
  const ballStyle: React.CSSProperties = {
    display: 'inline-block',
    margin: '5px',
    padding: '10px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    color: '#fff',
    fontSize: '18px',
    width: '40px',
    height: '40px',
    lineHeight: '40px',
    textAlign: 'center',
  };
 
  return <span style={ballStyle}>{number}</span>;
};
 
const Container: React.FC<{ onGenerate: (numbers: number[]) => void }> = ({ onGenerate }) => {
  const [count, setCount] = useState<string>('');
 
  const generateNumbers = () => {
    const amount = Math.min(Number(count), 12);
    const numbers = Array.from({ length: amount }, () => Math.floor(Math.random() * 100));
    onGenerate(numbers.sort((a, b) => a - b));
  };
 
  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#3498db' }}>Exercício 1</h2>
      <input
        type="number"
        placeholder="Quantidade de Números"
        value={count}
        onChange={(e) => setCount(String(e.target.value))}
        style={inputStyle}
      />
      <button onClick={generateNumbers} style={buttonStyle}>
        Gerar
      </button>
    </div>
  );
};
 
const Exibir1: React.FC<{ numbers: number[] }> = ({ numbers }) => {
  return (
    <div style={containerStyle}>
      <div>
        {numbers.map((num, index) => (
          <Ball key={index} number={num} />
        ))}
      </div>
    </div>
  );
};
 
const Exercise1: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
 
  return (
    <div>
      <Container onGenerate={setNumbers} />
      <Exibir1 numbers={numbers} />
    </div>
  );
};
 
export default Exercise1;