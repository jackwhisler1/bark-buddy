import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("user");

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-xl w-96 text-center">
        <h2 className="text-2xl font-bold">Welcome, {username || "Guest"}!</h2>
        <p className="text-gray-600 mt-2">
          Start searching for your content here.
        </p>
      </div>
    </div>
  );
};

export default Search;
