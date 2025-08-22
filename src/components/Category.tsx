import "./Category.css";

const Category: React.FC = () => {
  const categories = [
    "Science Fiction",
    "Fantasy",
    "Romance",
    "Mystery",
    "Biography",
    "History",
    "Technology",
    "Arts",
    "Literature",
    "Philosophy",
    "Health",
    "Religion",
    "Law",
    "Cooking",
  ];
  return (
    <div>
      <div>
        {categories.map((cat, index) => (
          <div key={index}>
            <button>
              <div>
                <div>{cat}</div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
