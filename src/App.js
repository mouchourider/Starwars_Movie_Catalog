import logo from "./logo.svg";
import "./App.css";
import React from "react";
import MovieGrid from "./components/MovieGrid";

function App() {
  return (
    <div className="App">
      <div className="bg-gray-900 min-h-screen text-white">
        <header className="text-center py-6">
          <h1 className="text-4xl font-bold">Star Wars Movies Catalog</h1>
        </header>
        <main className="container mx-auto p-4">
          <MovieGrid />
        </main>
      </div>
    </div>
  );
}

export default App;
