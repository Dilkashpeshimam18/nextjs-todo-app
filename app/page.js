import styles from './page.module.css';
import Todos from '@/components/Todos';
import { getAllTodos } from '@/utils/todos';
export default async function Home() {
  const alltodos = await getAllTodos();

  return (
    <div className={styles.page}>
      <h1>Todo App</h1>
      <Todos initialTodos={alltodos} />
    </div>
  );
}
