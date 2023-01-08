import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route } from 'wouter';
import { LoginTemplate } from './features/auth/templates/LoginTemplate';
import SignUpTemplate from './features/auth/templates/SignUpTemplate';
import TodoTemplate from './features/todos/templates/TodoTemplate';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto max-w-sm">
        <Route path="/" component={TodoTemplate} />
        <Route path="/login" component={LoginTemplate} />
        <Route path="/signup" component={SignUpTemplate} />
      </div>
    </QueryClientProvider>
  );
};
