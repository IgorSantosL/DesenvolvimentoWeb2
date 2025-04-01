import { useContext } from "react";
import { LetterCtx } from "../contexts/LetterCtx";
import Ball from "./Ball";

export default function Display() {
  const { input } = useContext(LetterCtx);

  // Se o input estiver vazio, exibe "Sem entrada"
  if (input === "") {
    return <div>Sem entrada</div>;
  }

  // Senão, cria um array de bolas (Ball) para cada letra
  return (
    <div>
      {input.split("").map((letter, index) => (
        <Ball key={index} letter={letter} />
      ))}
    </div>
  );
}
