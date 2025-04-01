interface BallProps {
    letter: string;
  }
  
  export default function Ball({ letter }: BallProps) {
    return (
      <div style={styles.ball}>
        {letter}
      </div>
    );
  }
  
  const styles = {
    ball: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '5px',
      backgroundColor: '#f0f0f0',
      fontSize: '20px',
      fontWeight: 'bold',
      border: '1px solid #ddd',
    }
  };
  