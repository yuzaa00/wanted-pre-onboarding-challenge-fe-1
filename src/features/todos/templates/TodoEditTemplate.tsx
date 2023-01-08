import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '../../../common/components/Button';
import { Input } from '../../../common/components/Input';
import { editTodo, getTodoById } from '../remotes';

export const TodoEditTemplate = ({ params }: { params: { id: string } }) => {
  const setLocation = useLocation()[1];
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['todo', params.id],
    queryFn: () => getTodoById(params.id),
  });

  const mutation = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todo', params.id] });
    },
  });

  const [todo, setTodo] = useState<{ [index: string]: string }>({
    title: data?.title || '',
    content: data?.content || '',
  });

  const handleSaveClick = () => {
    mutation.mutate(
      { id: params.id, title: todo.title, content: todo.content },
      {
        onSuccess: (data) => {
          setLocation(`/todos/${data.id}`);
        },
      },
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    setTodo((prevTodo) => ({ ...prevTodo, [target.name]: target.value }));
  };

  return (
    <div className="mx-auto max-w-2xl p-10">
      <div className="flex flex-col space-y-4">
        <Input label="할 일" name="title" value={todo.title} onChange={handleChange} />
        <Input label="내용" name="content" value={todo.content} onChange={handleChange} />
        <div className="flex justify-end space-x-4">
          <Button text="저장하기" onClick={handleSaveClick} />
          <Button
            text="뒤로가기"
            appearance="ghost"
            onClick={() => setLocation(`/todos/${params.id}`)}
          />
        </div>
      </div>
    </div>
  );
};
