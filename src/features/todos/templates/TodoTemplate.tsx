import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { TodoDetailTemplate } from './TodoDetailTemplate';
import { Button } from '../../../common/components/Button';
import useAuth from '../../auth/hooks/useAuth';
import { TodoListItem } from '../components/TodoListItem';
import { getTodos } from '../remotes';

export const TodoTemplate = ({ params }: { params: { id: string } }) => {
  const setLocation = useLocation()[1];
  const { logout } = useAuth();

  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  const handleLogoutClick = () => {
    logout();
    setLocation('/login');
  };

  return (
    <div className="mx-auto max-w-2xl p-10">
      <div className="mb-10 flex justify-between">
        <div className="space-x-4">
          <Button text="홈으로 가기" onClick={() => setLocation('/')}></Button>
          <Button
            text="할 일 추가하기"
            onClick={() => {
              setLocation('/add');
            }}
          />
        </div>
        <Button text="logout" appearance="ghost" onClick={handleLogoutClick} />
      </div>
      <div className="flex divide-x-2">
        <div className="mr-2 w-[140px]">
          <ul className="w-[140px] space-y-2">
            {data?.map((todo) => (
              <TodoListItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                currentId={params.id}
                onClick={() => setLocation(`/todos/${todo.id}`)}
              />
            ))}
          </ul>
        </div>
        <div className="flex-auto pl-10">
          <div className="w-full">
            {params.id ? (
              <TodoDetailTemplate todoId={params.id} />
            ) : (
              <div className="text-6xl font-bold">❤️‍🔥</div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end"></div>
    </div>
  );
};
