import { useState } from 'react';
import type { Memo, Reply, TextAreaChangeEvent } from '../types/memo';

export const useReplyOperations = (memos: Memo[], setMemos: React.Dispatch<React.SetStateAction<Memo[]>>) => {
  const [reply, setReply] = useState<number | null>(null);
  const [newReplyText, setNewReplyText] = useState('');

  const toggleReply = (memoId: number) => {
    setReply(prev => prev === memoId ? null : memoId);
  };

  const handleChangeReplyText = (e: TextAreaChangeEvent) => {
    setNewReplyText(e.target.value);
  };

  const handleAddReply = (memoId: number) => {
    if (newReplyText.trim() === '') {
      return;
    }
    const newReply: Reply = {
      id: Date.now(),
      text: newReplyText,
      createdAt: new Date().toLocaleString(),
    };
    setMemos(prevMemos => 
      prevMemos.map(memo => 
        memo.id === memoId 
          ? { ...memo, replies: [...memo.replies, newReply] }
          : memo
      )
    );
    setReply(null);
    setNewReplyText('');
  };

  const deleteReplyMemo = (memoId: number, replyId: number) => {
    setMemos(prevMemos =>
      prevMemos.map(memo =>
        memo.id === memoId
          ? { ...memo, replies: memo.replies.filter(reply => reply.id !== replyId) }
          : memo
      )
    );
  };

  return {
    reply,
    newReplyText,
    toggleReply,
    handleChangeReplyText,
    handleAddReply,
    deleteReplyMemo
  };
};