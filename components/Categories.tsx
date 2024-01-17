import Link from "next/link";
import React from "react";

interface Category {
  id: string;
  catName: string;
}

// Function to fetch categories from the API
const getCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);
    if (res.ok) {
      const categories = await res.json();
      return categories;
    }
  } catch (error) {
    console.log(error);
  }
};

// Component to display categories
const Categories = async () => {
  // Fetching categories using the getCategories function
  const categories = await getCategories();

  return (
    // Grid layout for displaying categories
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-8">
      {/* Mapping through categories and creating links */}
      {categories.map((category: Category) => (
        <Link
          className="btn md:text-xl"
          href={`/categories/${category.catName}`}
          key={category.id}
        >
          {category.catName}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
