// 🔹 Componente Ball - Exibe cada número dentro de um círculo azul ou vermelho
interface BallProps {
    number: number;
    onContextMenu?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; // Permite clique direito
  }
  
  const Ball: React.FC<BallProps> = ({ number, onContextMenu }) => {
    const ballStyle: React.CSSProperties = {
      display: "inline-block",
      margin: "5px",
      padding: "10px",
      borderRadius: "50%", // Formato de bola
      backgroundColor: "#3498db", // Azul
      color: "#fff", // Texto branco
      fontSize: "18px",
      width: "40px",
      height: "40px",
      lineHeight: "40px",
      textAlign: "center",
      cursor: onContextMenu ? "pointer" : "default", // Indica interatividade se tiver clique direito
    };
  
    return (
      <div style={ballStyle} onContextMenu={onContextMenu}>
        {number}
      </div>
    );
  };
  
  export default Ball;
  