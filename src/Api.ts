import cuid from "cuid";

type Todo = {
  uid: string;
  title: string;
  done: boolean;
};

const todos: Array<Todo> = [
  {
    uid: cuid(),
    title: "Demo react query",
    done: false,
  },
];

const sleep = () => {
  return new Promise((res) => {
    setTimeout(res, 1500);
  });
};

export const TodosAPI = {
  getTodos: async (): Promise<Array<Todo>> => {
    await sleep();
    return [...todos];
  },
  createTodo: async (title: string): Promise<Todo> => {
    const todo = {
      title,
      uid: cuid(),
      done: false,
    };

    todos.push(todo);

    return todo;
  },
  toggleTodo: async (uid: string) => {
    const index = todos.findIndex((todo) => todo.uid === uid);
    const todo = todos[index];
    if (todo) {
      todos[index].done = !todos[index].done;
      return todos[index];
    }
  },
};
