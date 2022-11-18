import React, { useEffect } from "react";

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className="flex justify-center space-x-1 text-xs font-medium py-4">
      {range.map((el, index) => (
        <button
          key={index}
          className="block w-8 h-8 leading-8 text-center border border-green-400 rounded hover:bg-yellow-800"
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;