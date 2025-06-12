
import './App.css'
import { Header } from './components/Header/Header'
import { Memo } from './components/Memo/Memo'

function App() {
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
