import Link from "next/link";
import React from "react";

const _error = () => {
  return (
    <div className="errorPage">
      <h2>Page not found!</h2>
      <button>
        <Link href={"/"}>EXPLORE PRODUCTS</Link>
      </button>
    </div>
  );
};

export default _error;
