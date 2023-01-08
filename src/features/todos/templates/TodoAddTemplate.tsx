import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '../../../common/components/Button';
import { Input } from '../../../common/components/Input';
import { addTodo } from '../remotes';

export const TodoAddTemplate = () => {
  const setLocation = useLocation()[1];
  const [todo, setTodo] = useState<{ [index: string]: string }>({ title: '', content: '' });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    setTodo((prevTodo) => ({ ...prevTodo, [target.name]: target.value }));
  };

  const handleSaveClick = () => {
    mutation.mutate(
      { title: todo.title, content: todo.content },
      {
        onSuccess: (data) => {
          setLocation(`/todos/${data.id}`);
        },
      },
    );
  };

  return (
    <div className="mx-auto max-w-2xl p-10">
      <div className="flex flex-col space-y-4">
        <Input label="할 일" name="title" value={todo.title} onChange={handleChange} />
        <Input label="디테일" name="content" value={todo.content} onChange={handleChange} />
        <div className="flex justify-end space-x-4">
          <Button text="저장하기" onClick={handleSaveClick} />
          <Button text="취소하기" appearance="ghost" onClick={() => setLocation('/')} />
        </div>
      </div>
    </div>
  );
};
