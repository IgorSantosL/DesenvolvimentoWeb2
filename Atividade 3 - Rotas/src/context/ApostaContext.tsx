import React, { createContext, useState, ReactNode, useContext } from "react";

type Aposta = number[];

interface ApostaContextType {
  apostas: Aposta[];
  adicionarAposta: (novaAposta: Aposta) => void;
}

const ApostaContext = createContext<ApostaContextType | undefined>(undefined);

export const ApostaProvider = ({ children }: { children: ReactNode }) => {
  const [apostas, setApostas] = useState<Aposta[]>([]);

  const adicionarAposta = (novaAposta: Aposta) => {
    setApostas((prevApostas) => [...prevApostas, novaAposta]);
  };

  return (
    <ApostaContext.Provider value={{ apostas, adicionarAposta }}>
      {children}
    </ApostaContext.Provider>
  );
};

export const useAposta = (): ApostaContextType => {
  const context = useContext(ApostaContext);
  if (!context) {
    throw new Error("useAposta deve ser usado dentro de um ApostaProvider");
  }
  return context;
};