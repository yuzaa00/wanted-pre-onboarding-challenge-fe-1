import { Route } from "wouter";
import "./App.css";
import LoginTemplate from "./features/auth/templates/LoginTemplate";
import SignUpTemplate from "./features/auth/templates/SignUpTemplate";
import TodoTemplate from "./features/todos/templates/TodoTemplate";

function App() {
  return (
    <div className="App">
      <Route path="/" component={TodoTemplate} />
      <Route path="/login" component={LoginTemplate} />
      <Route path="/signup" component={SignUpTemplate} />
    </div>
  );
}

export default App;
