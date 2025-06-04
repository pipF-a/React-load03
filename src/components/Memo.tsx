import { GoPencil } from "react-icons/go";
import { CiTrash } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
import { useState } from "react";

interface MemoItem {
  id:number;
  text:string;
  createdAt:string;
}

interface ReplyItem {
  id:number;
  text:string;
  createdAt:string;
}

export const Memo = () => {
  //メモの配列を管理
  const [memos,setMemos] = useState<MemoItem[]>([])

  //テキストエリアのテキストを保持
  const [newMemoText,setNewMemoText] = useState('');

  //テキストエリアが変更されたら実行する関数
  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMemoText(e.target.value);
  };

    //新しいメモを追加
  const handleAddMemo = () =>{
    if (newMemoText.trim() === '') {
      return; //空メモ回避
    }
    const newMemo: MemoItem = {
      id: Date.now(), 
      text: newMemoText,
      createdAt: new Date().toLocaleString(), 
    };

    setMemos(prevMemos => [...prevMemos, newMemo]);
    setNewMemoText(''); // テキストエリアをクリア
  }

  //メモの削除機能
  const deleteMemo = (id: number) => {
    setMemos(prevMemos => prevMemos.filter(memo => memo.id !== id));
  };

  //リプライエリアの表示管理
  const [reply,setReply] = useState(false);

  //リプライコメント用の配列管理
  const [replyArray,setReplyArray] = useState<ReplyItem[]>([]);

  //リプライのテキストを管理
  const [newReplyText,setNewReplyText] = useState('');


  //リプライ機能
  const toggleReply = () =>{
    setReply(prev => !prev);
  }

  //リプライのテキストが変更されたら実行
  const handleChangeReplyText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReplyText(e.target.value);
  };

  //新しいリプライを追加
  const handleAddReply = () =>{
    if (newReplyText.trim() === '') {
      return; //空メモ回避
    }
    const newReply:ReplyItem =  {
      id: Date.now(), 
      text: newReplyText,
      createdAt: new Date().toLocaleString(), 
    }
    setReply(prev => !prev);
    setReplyArray(prevReplyArray => [...prevReplyArray, newReply]); 
    setNewReplyText('');
  }

    //リプライメモの削除機能
  const deleteReplyMemo = (id: number) => {
    setReplyArray(prevReplyArray => prevReplyArray.filter(replyArray => replyArray.id !== id));
  };



  return (
    <>
      <div className="max-w-[450px]">
        <textarea 
        placeholder="新しいメモを入力.." 
        className="w-full rounded-lg p-4 shadow-lg bg-white" 
        rows={4}
        onChange={handleChangeText}
        value={newMemoText}
        >
        </textarea>
        <button onClick={handleAddMemo} className="mt-4 px-8 py-3 bg-emerald-600 text-sm text-white rounded-lg hover:bg-emerald-700"><IoIosSend className="w-4 h-4" /></button>
      </div>
      <ul>
        {memos.map((memo,index)=>(
          <li className="relative mt-6 bg-white border border-gray-300 shadow rounded-lg p-4 w-2/4" key={index}>
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">{memo.createdAt}</p>
              <div className="flex">
                <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"><GoPencil className="lucide lucide-pen w-4 h-4" /></button>
                <button onClick={() => deleteMemo(memo.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><CiTrash /></button>
              </div>
            </div>  
            <p className="mt-6 whitespace-pre-wrap text-gray-700">{memo.text}</p>
            <hr className="mt-4 border-gray-200" />
            {reply ? <textarea onChange={handleChangeReplyText} placeholder="リプライを入力" className="block mt-4 ml-auto bg-white border border-gray-300 rounded-lg p-4 w-3/4"></textarea> : ''}
            <ul className="ml-8 space-y-4">
              {replyArray.map((array,index)=>(
                <li className="mt-4 p-6 bg-gray-100 rounded-lg space-y-2 ml-auto" key={index}>
                  <div className="flex justify-between">
                    <p>{array.createdAt}</p>
                    <div>
                      <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"><GoPencil className="lucide lucide-pen w-4 h-4" /></button>
                      <button onClick={() => deleteReplyMemo(array.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><CiTrash /></button>
                    </div>
                  </div>
                  <p className="mt-6 whitespace-pre-wrap text-gray-700">{array.text}</p>
                </li>
              ))}
            </ul>
            {reply ? <button onClick={handleAddReply} className="mt-4 px-8 py-3 bg-emerald-600 text-sm text-white rounded-lg hover:bg-emerald-700"><IoIosSend className="w-4 h-4" /></button> : ''}
            {reply ? '' : <button onClick={toggleReply} className="mt-4 text-emerald-600 hover:text-emerald-700"><FaRegComment className="w-4 h-4" /></button> }
          </li>
        ))}
      </ul>
    </>
  )
}
