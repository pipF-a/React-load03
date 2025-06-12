//共通の型
export type BaseItem = {
  id: number;
  text: string;
  createdAt: string;
};

// リプライの型
export type Reply = BaseItem;

//メモの型
// メモの型定義
export type Memo = BaseItem & {
  replies: Reply[];
};

//イベント用の型
export type TextAreaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;