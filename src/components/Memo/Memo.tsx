import { GoPencil } from "react-icons/go";
import { CiTrash } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
import { useMemoOperations } from '../../hooks/useMemoOperations';
import { useReplyOperations } from '../../hooks/useReplyOperations';
import { useEditOperations } from '../../hooks/useEditOperations';

export const Memo = () => {
  const {
    memos,
    newMemoText,
    handleChangeText,
    handleAddMemo,
    deleteMemo,
    setMemos
  } = useMemoOperations();

  const {
    reply,
    newReplyText,
    toggleReply,
    handleChangeReplyText,
    handleAddReply,
    deleteReplyMemo
  } = useReplyOperations(memos, setMemos);

  const {
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
  } = useEditOperations(memos, setMemos);

  return (
    <>
      <div className="max-w-[450px]">
        <textarea 
          placeholder="新しいメモを入力.." 
          className="w-full rounded-lg p-4 shadow-lg bg-white" 
          rows={4}
          onChange={handleChangeText}
          value={newMemoText}
        />
        <button onClick={handleAddMemo} className="mt-4 px-8 py-3 bg-emerald-600 text-sm text-white rounded-lg hover:bg-emerald-700">
          <IoIosSend className="w-4 h-4" />
        </button>
      </div>
      <ul>
        {memos.map((memo, index) => (
          <li className="relative mt-6 bg-white border border-gray-300 shadow rounded-lg p-4 w-2/4" key={index}>
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">{memo.createdAt}</p>
              <div className="flex">
                <button onClick={() => toggleTextArea(memo.id, memo.text)} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                  <GoPencil className="lucide lucide-pen w-4 h-4" />
                </button>
                <button onClick={() => deleteMemo(memo.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <CiTrash />
                </button>
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
                <button onClick={() => handleSaveEdit(memo.id)} className="mt-4 px-8 py-3 bg-emerald-600 text-sm text-white rounded-lg hover:bg-emerald-700">
                  <IoIosSend className="w-4 h-4" />
                </button>
              </div>
            : 
              <p className="mt-6 whitespace-pre-wrap text-gray-700">{memo.text}</p>
            }
            <hr className="mt-4 border-gray-200" />
            {reply === memo.id ? 
              <textarea 
                onChange={handleChangeReplyText} 
                placeholder="リプライを入力" 
                className="block mt-4 ml-auto bg-white border border-gray-300 rounded-lg p-4 w-3/4"
                value={newReplyText}
              /> 
            : ''}
            <ul className="ml-8 space-y-4">
              {memo.replies.map((reply, index) => (
                <li className="mt-4 p-6 bg-gray-100 rounded-lg space-y-2 ml-auto" key={index}>
                  <div className="flex justify-between">
                    <p>{reply.createdAt}</p>
                    <div>
                      <button onClick={() => toggleReplyTextArea(reply.id, reply.text)} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <GoPencil className="lucide lucide-pen w-4 h-4" />
                      </button>
                      <button onClick={() => deleteReplyMemo(memo.id, reply.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <CiTrash />
                      </button>
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
                      <button onClick={() => handleSaveReplyEdit(memo.id, reply.id)} className="mt-4 px-8 py-3 bg-emerald-600 text-sm text-white rounded-lg hover:bg-emerald-700">
                        <IoIosSend className="w-4 h-4" />
                      </button>
                    </div>
                  : 
                    <p className="mt-6 whitespace-pre-wrap text-gray-700">{reply.text}</p>
                  }
                </li>
              ))}
            </ul>
            {reply === memo.id ? 
              <button onClick={() => handleAddReply(memo.id)} className="mt-4 px-8 py-3 bg-emerald-600 text-sm text-white rounded-lg hover:bg-emerald-700">
                <IoIosSend className="w-4 h-4" />
              </button> 
            : ''}
            {reply === memo.id ? '' : 
              <button onClick={() => toggleReply(memo.id)} className="mt-4 text-emerald-600 hover:text-emerald-700">
                <FaRegComment className="w-4 h-4" />
              </button> 
            }
          </li>
        ))}
      </ul>
    </>
  );
};