import Link from "next/link";
import React from "react";

const Categories = () => {
  const categoriesList = [
    {
      id: 1,
      name: "technology",
    },
    {
      id: 2,
      name: "travel",
    },
    {
      id: 3,
      name: "foods",
    },
    {
      id: 4,
      name: "entertainment",
    },
  ];
  return (
    // flex gap-7 flex-wrap
    <div className="grid  lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-8">
      {categoriesList.map((category) => {
        return (
          <Link
            className="btn md:text-xl"
            href={`/categories/${category.name}`}
            key={category.id}
          >
            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
          </Link>
        );
      })}
    </div>
  );
};

export default Categories;
