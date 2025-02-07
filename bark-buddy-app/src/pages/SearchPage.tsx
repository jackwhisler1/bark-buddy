import React from "react";
import Search from "../components/Search";

const SearchPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-4">
        Search for Dogs
      </h1>
      <Search />
    </div>
  );
};

export default SearchPage;
