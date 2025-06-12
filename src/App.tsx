
// import { useState } from 'react';
import './App.css'
import { Header } from './components/Header/Header'
// import { InputArea } from './components/InputArea'
import { Memo } from './components/Memo/Memo'

function App() {
  // const [items, setItems] = useState<number[]>([]);
  // const [newItemCount, setNewItemCount] = useState(1);



  // /* テキストエリアのテキストを保持する関数*/
  // const [textContent,setTextContent] = useState('');

  // /* テキストが変更されたら実行する関数 */
  // const handleChangeText = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setTextContent(e.target.value)
  // }

  return (
    <>
      <Header/>
      <main className='p-14'>
        <Memo/>
      </main>
    </>
  )
}

export default App
