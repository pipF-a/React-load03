import { GoPencil } from "react-icons/go";
import { CiTrash } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";
import { useState } from "react";



export const Memo = () => {

  const [items, setItems] = useState<number[]>([1]);

  const handleAddItem = (itemToAdd: number) => {
    setItems(prevItems => [...prevItems, itemToAdd]);
  };


    /* テキストエリアのテキストを保持する関数*/
  const [textContent,setTextContent] = useState('');

  /* テキストが変更されたら実行する関数 */
  const handleChangeText = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(e.target.value)
  }
  return (
    <>
      <div className="max-w-[450px]">
        <textarea 
        placeholder="新しいメモを入力.." 
        className="w-full rounded-lg p-4 shadow-lg bg-white" 
        rows={4}
        onChange={handleChangeText}
        >
        </textarea>
        <button  className="mt-4 px-8 py-3 bg-emerald-600 text-sm text-white rounded-lg hover:bg-emerald-700"><IoIosSend className="w-4 h-4" /></button>
      </div>
      <ul>
        {items.map((item: number) => (
          <li className="mt-6 bg-white border border-gray-300 shadow rounded-lg p-4 w-3/4" key={item} >
            <div className="flex">
              <p>時間</p>
              <div className="flex">
                <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"><GoPencil className="lucide lucide-pen w-4 h-4" /></button>
                <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><CiTrash /></button>
              </div>
            </div>

            <p className="mt-6 whitespace-pre-wrap text-gray-700">{textContent}
              
            </p>
            <hr className="mt-4 border-gray-200" />
            <button onClick={handleAddItem} className="mt-4 px-8 py-3 bg-emerald-600 text-sm text-white rounded-lg hover:bg-emerald-700"><IoIosSend className="w-4 h-4" /></button>
          </li>
        ))}
      </ul>
    </>
  
  )
}


// ① メモ用の配列を作成(inputしたテキストも含む)
// ②回す