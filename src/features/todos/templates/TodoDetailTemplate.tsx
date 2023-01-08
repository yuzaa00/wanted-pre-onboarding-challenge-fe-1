import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { api } from '../../../common/api';
import { Button } from '../../../common/components/Button';
import { getTodoById } from '../remotes';

export interface TodoDetailTemplate {
  todoId: string;
}

export const TodoDetailTemplate = ({ todoId }: TodoDetailTemplate) => {
  const setLocation = useLocation()[1];
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['todo', todoId],
    queryFn: () => getTodoById(todoId),
  });

  const mutation = useMutation({
    mutationFn: () => api('DELETE', `/todos/${todoId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setLocation('/');
    },
  });

  const handleEditClick = () => setLocation(`/edit/${todoId}`);

  const handleRemoveClick = () => {
    mutation.mutate();
  };

  if (!data) return null;

  return (
    <div className="space-y-4">
      <h1 className="text-bold text-2xl">{data.title}</h1>
      <p className="text-lg">{data.content}</p>
      <div className="space-x-4">
        <Button text="수정하기" onClick={handleEditClick} />
        <Button text="삭제하기" appearance="ghost" onClick={handleRemoveClick} />
      </div>
    </div>
  );
};
