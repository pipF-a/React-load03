import { GoPencil } from "react-icons/go";
import { CiTrash } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
import { useState } from "react";

// 共通の型定義
type BaseItem = {
  id: number;
  text: string;
  createdAt: string;
};

// リプライの型定義
type Reply = BaseItem;

// メモの型定義
type Memo = BaseItem & {
  replies: Reply[];
};

// イベントハンドラの型定義
type TextAreaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;

export const Memo = () => {
  //メモの配列を管理
  const [memos, setMemos] = useState<Memo[]>([]);

  //テキストエリアのテキストを保持
  const [newMemoText, setNewMemoText] = useState('');

  //テキストエリアが変更されたら実行する関数
  const handleChangeText = (e: TextAreaChangeEvent) => {
    setNewMemoText(e.target.value);
  };

  //新しいメモを追加
  const handleAddMemo = () => {
    if (newMemoText.trim() === '') {
      return; //空メモ回避
    }
    const newMemo: Memo = {
      id: Date.now(),
      text: newMemoText,
      createdAt: new Date().toLocaleString(),
      replies: []
    };

    setMemos(prevMemos => [...prevMemos, newMemo]);
    setNewMemoText(''); // テキストエリアをクリア
  }

  //メモの削除機能
  const deleteMemo = (id: number) => {
    setMemos(prevMemos => prevMemos.filter(memo => memo.id !== id));
  };

  //リプライエリアの表示管理
  const [reply, setReply] = useState<number | null>(null);

  //リプライのテキストを管理
  const [newReplyText, setNewReplyText] = useState('');

  //リプライ機能
  const toggleReply = (memoId: number) => {
    setReply(prev => prev === memoId ? null : memoId);
  }

  //リプライのテキストが変更されたら実行
  const handleChangeReplyText = (e: TextAreaChangeEvent) => {
    setNewReplyText(e.target.value);
  };

  //新しいリプライを追加
  const handleAddReply = (memoId: number) => {
    if (newReplyText.trim() === '') {
      return; //空メモ回避
    }
    const newReply: Reply = {
      id: Date.now(),
      text: newReplyText,
      createdAt: new Date().toLocaleString(),
    }
    setMemos(prevMemos => 
      prevMemos.map(memo => 
        memo.id === memoId 
          ? { ...memo, replies: [...memo.replies, newReply] }
          : memo
      )
    );
    setReply(null);
    setNewReplyText('');
  }

  //リプライメモの削除機能
  const deleteReplyMemo = (memoId: number, replyId: number) => {
    setMemos(prevMemos =>
      prevMemos.map(memo =>
        memo.id === memoId
          ? { ...memo, replies: memo.replies.filter(reply => reply.id !== replyId) }
          : memo
      )
    );
  };

  //メモのテキストエリアのステート
  const [activeTextArea, setActiveTextArea] = useState(false); 
  const [editingMemoId, setEditingMemoId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  const toggleTextArea = (memoId: number, memoText: string) => {
    if (editingMemoId === memoId) {
      setActiveTextArea(false);
      setEditingMemoId(null);
      setEditingText('');
    } else {
      setActiveTextArea(true);
      setEditingMemoId(memoId);
      setEditingText(memoText);
    }
  }

  const handleEditText = (e: TextAreaChangeEvent) => {
    setEditingText(e.target.value);
  };

  const handleSaveEdit = (memoId: number) => {
    setMemos(prevMemos => 
      prevMemos.map(memo => 
        memo.id === memoId ? { ...memo, text: editingText } : memo
      )
    );
    setActiveTextArea(false);
    setEditingMemoId(null);
    setEditingText('');
  };

  //リプライのテキストエリアのステート
  const [activeReplyTextArea, setActiveReplyTextArea] = useState(false);
  const [editingReplyId, setEditingReplyId] = useState<number | null>(null);
  const [editingReplyText, setEditingReplyText] = useState('');

  const toggleReplyTextArea = (replyId: number, replyText: string) => {
    if (editingReplyId === replyId) {
      setActiveReplyTextArea(false);
      setEditingReplyId(null);
      setEditingReplyText('');
    } else {
      setActiveReplyTextArea(true);
      setEditingReplyId(replyId);
      setEditingReplyText(replyText);
    }
  }

  const handleEditReplyText = (e: TextAreaChangeEvent) => {
    setEditingReplyText(e.target.value);
  };

  const handleSaveReplyEdit = (memoId: number, replyId: number) => {
    setMemos(prevMemos => 
      prevMemos.map(memo => 
        memo.id === memoId 
          ? { ...memo, replies: memo.replies.map(reply => 
              reply.id === replyId ? { ...reply, text: editingReplyText } : reply
            ) }
          : memo
      )
    );
    setActiveReplyTextArea(false);
    setEditingReplyId(null);
    setEditingReplyText('');
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
                <button onClick={() => toggleTextArea(memo.id, memo.text)} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"><GoPencil className="lucide lucide-pen w-4 h-4" /></button>
                <button onClick={() => deleteMemo(memo.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><CiTrash /></button>
              </div>
            </div>  
            {activeTextArea && editingMemoId === memo.id ?         
            <div>
              <textarea 
                placeholder="メモを編集.." 
                className="w-full rounded-lg p-4 shadow-lg bg-white" 
                rows={4}
                onChange={handleEditText}
                value={editingText}
              />
              <button onClick={() => handleSaveEdit(memo.id)} className="mt-4 px-8 py-3 bg-emerald-600 text-sm text-white rounded-lg hover:bg-emerald-700"><IoIosSend className="w-4 h-4" /></button>
            </div>
            : 
            <p className="mt-6 whitespace-pre-wrap text-gray-700">{memo.text}</p>}
            <hr className="mt-4 border-gray-200" />
            {reply === memo.id ? <textarea onChange={handleChangeReplyText} placeholder="リプライを入力" className="block mt-4 ml-auto bg-white border border-gray-300 rounded-lg p-4 w-3/4"></textarea> : ''}
            <ul className="ml-8 space-y-4">
              {memo.replies.map((reply, index) => (
                <li className="mt-4 p-6 bg-gray-100 rounded-lg space-y-2 ml-auto" key={index}>
                  <div className="flex justify-between">
                    <p>{reply.createdAt}</p>
                    <div>
                      <button onClick={() => toggleReplyTextArea(reply.id, reply.text)} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"><GoPencil className="lucide lucide-pen w-4 h-4" /></button>
                      <button onClick={() => deleteReplyMemo(memo.id, reply.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><CiTrash /></button>
                    </div>
                  </div>
                  {activeReplyTextArea && editingReplyId === reply.id ?         
                  <div>
                    <textarea 
                      placeholder="リプライを編集.." 
                      className="w-full rounded-lg p-4 shadow-lg bg-white" 
                      rows={4}
                      onChange={handleEditReplyText}
                      value={editingReplyText}
                    />
                    <button onClick={() => handleSaveReplyEdit(memo.id, reply.id)} className="mt-4 px-8 py-3 bg-emerald-600 text-sm text-white rounded-lg hover:bg-emerald-700"><IoIosSend className="w-4 h-4" /></button>
                  </div>
                  : 
                  <p className="mt-6 whitespace-pre-wrap text-gray-700">{reply.text}</p>}
                </li>
              ))}
            </ul>
            {reply === memo.id ? <button onClick={() => handleAddReply(memo.id)} className="mt-4 px-8 py-3 bg-emerald-600 text-sm text-white rounded-lg hover:bg-emerald-700"><IoIosSend className="w-4 h-4" /></button> : ''}
            {reply === memo.id ? '' : <button onClick={() => toggleReply(memo.id)} className="mt-4 text-emerald-600 hover:text-emerald-700"><FaRegComment className="w-4 h-4" /></button> }
          </li>
        ))}
      </ul>
    </>
  )
}
