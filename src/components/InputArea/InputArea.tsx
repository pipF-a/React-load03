import { IoIosSend } from "react-icons/io";

interface InputAreaProps {
  value: string;
  onClick: () => void;
}

export const InputArea:React.FC<InputAreaProps> = ({onClick,value}) => {
  return (
    <div className="max-w-[450px]">
      <textarea 
      placeholder="新しいメモを入力.." 
      className="w-full rounded-lg p-4 shadow-lg bg-white" 
      rows={4}
      value={value}
      >
      </textarea>
      <button onClick={onClick} className="mt-4 px-8 py-3 bg-emerald-600 text-sm text-white rounded-lg hover:bg-emerald-700"><IoIosSend className="w-4 h-4" /></button>
    </div>

  )
}
