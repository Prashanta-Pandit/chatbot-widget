import React from "react";
export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-md p-10 text-center max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4">This is a sample npm</h1>

        <p className="text-gray-600 mb-6">
          A minimal example page styled with Tailwind CSS.
        </p>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Click Me
        </button>
      </div>
    </div>
  );
}