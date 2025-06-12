import { useState } from 'react';
import type { Memo, TextAreaChangeEvent } from '../types/memo';

export const useEditOperations = (memos: Memo[], setMemos: React.Dispatch<React.SetStateAction<Memo[]>>) => {
  const [activeTextArea, setActiveTextArea] = useState(false);
  const [editingMemoId, setEditingMemoId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const [activeReplyTextArea, setActiveReplyTextArea] = useState(false);
  const [editingReplyId, setEditingReplyId] = useState<number | null>(null);
  const [editingReplyText, setEditingReplyText] = useState('');

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
  };

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
  };

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

  return {
    activeTextArea,
    editingMemoId,
    editingText,
    activeReplyTextArea,
    editingReplyId,
    editingReplyText,
    toggleTextArea,
    handleEditText,
    handleSaveEdit,
    toggleReplyTextArea,
    handleEditReplyText,
    handleSaveReplyEdit
  };
};