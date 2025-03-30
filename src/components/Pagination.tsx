import React from "react";

const Pagination = () => {
  return (
    <div className="flex items-center justify-between gap-3 mt-3 text-gray-500">
      <button
        disabled
        className="px-3 py-1 bg-gray-400 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <div className="flex items-center gap-3">
        <button className="px-3 bg-lamaSky rounded">1</button>
        <button className="px-3 bg-lamaSky rounded">2</button>
        <button className="px-3 bg-lamaSky rounded">3</button>
        ...
        <button className="px-3 bg-lamaSky rounded">10</button>
      </div>
      <button className="px-3 py-1 bg-gray-400 rounded disabled:opacity-50 disabled:cursor-not-allowed">
        Next
      </button>
    </div>
  );
};

export default Pagination;
