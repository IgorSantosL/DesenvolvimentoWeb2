import { useContext } from "react";
import { LetterCtx } from "../contexts/LetterCtx";

export default function Input() {
    const { input, setInput } = useContext(LetterCtx);
    return <input value ={input} onChange={(e) => setInput(e.target.value)}/>
}