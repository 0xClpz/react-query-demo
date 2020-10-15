import React from "react";
import "./App.css";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { TodoList } from "./TodoList";
import { ReactQueryDevtools } from "react-query-devtools";
import { FetchingIndicator } from "./FetchingIndicator";
import { ErrorBoundary } from "react-error-boundary";

const cache = new QueryCache();

function App() {
  return (
    <ErrorBoundary fallbackRender={() => <span>Something went wrong</span>}>
      <ReactQueryCacheProvider queryCache={cache}>
        <FetchingIndicator />
        <TodoList />
        <ReactQueryDevtools initialIsOpen={true} />
      </ReactQueryCacheProvider>
    </ErrorBoundary>
  );
}

export default App;
