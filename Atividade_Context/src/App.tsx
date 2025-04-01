import Input from './components/Input'
import Display from './components/Display'
import { LetterProvider } from './contexts/LetterCtx'

function App() {
  return (
    <LetterProvider>
      <Input />
      <Display />
    </LetterProvider>
  );
}

export default App;
