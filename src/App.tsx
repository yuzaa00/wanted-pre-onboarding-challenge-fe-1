import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route } from 'wouter';
import { LoginTemplate } from './features/auth/templates/LoginTemplate';
import SignUpTemplate from './features/auth/templates/SignUpTemplate';
import { TodoAddTemplate } from './features/todos/templates/TodoAddTemplate';
import { TodoEditTemplate } from './features/todos/templates/TodoEditTemplate';
import { TodoTemplate } from './features/todos/templates/TodoTemplate';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto">
        <Route path="/" component={TodoTemplate} />
        <Route path="/add" component={TodoAddTemplate} />
        <Route path="/todos/:id" component={TodoTemplate} />
        <Route path="/edit/:id" component={TodoEditTemplate} />
        <Route path="/login" component={LoginTemplate} />
        <Route path="/signup" component={SignUpTemplate} />
      </div>
    </QueryClientProvider>
  );
};
