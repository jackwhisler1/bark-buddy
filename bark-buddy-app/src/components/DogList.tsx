import { Dog } from "../types";

interface DogListProps {
  dogs: Dog[];
  loading: boolean;
  onFavorite: (id: string) => void;
  favorites: string[];
}

const DogList: React.FC<DogListProps> = ({
  dogs,
  loading,
  onFavorite,
  favorites,
}) => {
  return (
    <div className="mt-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dogs.map((dog) => (
            <div
              key={dog.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={dog.img}
                alt={dog.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{dog.name}</h3>
                <p className="text-gray-600">{dog.breed}</p>
                <p className="text-gray-500 text-sm">{dog.age} years old</p>
                <p className="text-gray-500 text-sm">
                  Zip Code: {dog.zip_code}
                </p>
                <button
                  onClick={() => onFavorite(dog.id)}
                  className={`mt-2 px-4 py-2 rounded-md ${
                    favorites?.includes(dog.id)
                      ? "bg-red-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {favorites.includes(dog.id) ? "Unfavorite" : "Favorite"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DogList;
