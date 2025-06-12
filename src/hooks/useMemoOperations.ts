//メモ機能のカスタムフック

import { useState } from "react"
import type { Memo, TextAreaChangeEvent } from "../types/memo"

export const useMemoOperations = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [newMemoText, setNewMemoText ] = useState('');

  const handleChangeText = (e:TextAreaChangeEvent) => {
    setNewMemoText(e.target.value);
  }

  const handleAddMemo = () => {
    if (newMemoText.trim() === '') {
      return;
    }

    const newMemo : Memo = {
      id: Date.now(),
      text: newMemoText,
      createdAt: new Date().toLocaleString(),
      replies: []
    };

    setMemos(prevMemos => [...prevMemos,newMemo]);
    setNewMemoText('');
  }

  const deleteMemo = (id:number) => {
    setMemos(prevMemos => prevMemos.filter(memo => memo.id !== id));
  }

  return {
    memos,
    newMemoText,
    handleChangeText,
    handleAddMemo,
    deleteMemo,
    setMemos,
  }

}