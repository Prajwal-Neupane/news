import Link from "next/link";
import React from "react";

interface Category {
  id: string;
  catName: string;
}

const getCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);
    if (res.ok) {
      const categories = await res.json();
      // console.log(categories);
      return categories;
    }
  } catch (error) {
    console.log(error);
  }
};

const Categories = async () => {
  const categories = await getCategories();
  // const categoriesList = [
  //   {
  //     id: 1,
  //     name: "technology",
  //   },
  //   {
  //     id: 2,
  //     name: "travel",
  //   },
  //   {
  //     id: 3,
  //     name: "foods",
  //   },
  //   {
  //     id: 4,
  //     name: "entertainment",
  //   },
  // ];
  return (
    // flex gap-7 flex-wrap
    <div className="grid  lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-8">
      {categories.map((category: Category) => {
        return (
          <Link
            className="btn md:text-xl "
            href={`/categories/${category.catName}`}
            key={category.id}
          >
            {category.catName}
          </Link>
        );
      })}
    </div>
  );
};

export default Categories;
