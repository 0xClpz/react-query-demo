import React, { useState } from "react";
import { useMutation, useQuery, useQueryCache } from "react-query";
import { TodosAPI } from "./Api";

const useTodos = () => {
  const cache = useQueryCache();
  const todos = useQuery("todos", TodosAPI.getTodos);
  const [createTodo] = useMutation(TodosAPI.createTodo, {
    onSettled: () => {
      return cache.invalidateQueries("todos");
    },
  });
  const [toggleTodo] = useMutation(TodosAPI.toggleTodo, {
    onSettled: () => {
      return cache.invalidateQueries("todos");
    },
  });

  return { todos, createTodo, toggleTodo };
};

export const TodoList = () => {
  const { todos, createTodo, toggleTodo } = useTodos();
  const [newTodo, setNewTodo] = useState("");

  return (
    <div>
      <h1>Todo list</h1>
      {!todos.data || todos.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.data.map((todo) => (
            <li
              onClick={() => toggleTodo(todo.uid)}
              key={todo.uid}
              style={
                todo.done
                  ? {
                      textDecoration: "line-through",
                    }
                  : {}
              }
            >
              {todo.title}
            </li>
          ))}
        </ul>
      )}
      <input
        type="text"
        placeholder="add todo"
        value={newTodo}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            setNewTodo("");
            return createTodo(newTodo);
          }
        }}
        onChange={(event) => {
          setNewTodo(event.target.value);
        }}
      />
    </div>
  );
};
