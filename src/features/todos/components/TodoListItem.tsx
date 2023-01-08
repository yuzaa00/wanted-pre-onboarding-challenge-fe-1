export interface TodoListItemProps {
  id: string;
  title: string;
  currentId: string;
  onClick: () => void;
}

export const TodoListItem = ({ id, title, currentId, onClick }: TodoListItemProps) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`${
          id === currentId && 'font-bold'
        }  w-[140px] overflow-hidden text-ellipsis whitespace-nowrap text-left`}
      >
        {title}
      </button>
    </li>
  );
};
