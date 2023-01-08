import { useLocation } from "wouter";
import useAuth from "../../auth/hooks/useAuth";

export default function TodoTemplate() {
  const { logout, isAuth } = useAuth();
  const [_, setLocation] = useLocation();

  function handleClick() {
    logout();
    setLocation("/login");
  }

  return (
    <div>
      <button onClick={handleClick}>logout</button>
      <ul>
        <li>todo1</li>
        <li>todo2</li>
        <li>todo3</li>
      </ul>
    </div>
  );
}
