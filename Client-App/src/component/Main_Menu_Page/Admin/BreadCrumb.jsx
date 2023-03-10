import React from "react";

const BreadCrumb = () => {
  {
    /* Testing BreadCrumb */
  }
  return (
    <nav className="bg-gray-100 py-2 px-4 rounded-md">
      <ol className="list-none p-0 flex items-center">
        <li>
          <a href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </a>
        </li>
        <strong className="m-3 text-gray-600"> {'>'} </strong>
        <li>
          <a
            href={`/category/test`}
            className="text-gray-500 hover:text-gray-700"
          >
            Test One
          </a>
        </li>
      </ol>
    </nav>
  );
};

export default BreadCrumb;
