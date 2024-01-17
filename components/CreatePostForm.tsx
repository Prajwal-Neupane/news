// Importing necessary modules and components
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiLinksFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import { FaRegImage } from "react-icons/fa6";
import Image from "next/image";
import toast from "react-hot-toast";

// Defining the type for categories
interface CategoriesType {
  id: string;
  catName: string;
}

// CreatePostForm component
const CreatePostForm = () => {
  // Initializing state variables
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState("");

  // Fetching categories when the component mounts
  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await fetch("api/categories");
      const catName = await res.json();
      setCategories(catName);
    };
    fetchAllCategories();
  }, []);

  // Event handlers for form input changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (linkInput.trim() !== "") {
      setLinks([...links, linkInput]);
      setLinkInput("");
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkInput(e.target.value);
  };

  const handleLinkDelete = (id: number) => {
    const updatedLinks = [...links];
    updatedLinks.splice(id, 1);
    setLinks(updatedLinks);
  };

  // Handling image upload
  const handleImageUpload = (result: CldUploadWidgetResults) => {
    const info = result.info as object;
    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url as string;
      const public_id = info.public_id as string;
      setImageUrl(url);
      setPublicId(public_id);
      console.log("url", url);
      console.log("public_id", public_id);
    }
  };

  // Handling removal of uploaded image
  const handleRemoveImage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("api/removeImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });
      if (res.ok) {
        setImageUrl("");
        setPublicId("");
      }
    } catch (error) {
      console.log("Image Upload Error", error);
    }
  };

  // Handling form submission
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !content) {
      const errorMessage = "Title and content are required";
      toast.error(errorMessage);
      return;
    }

    try {
      const res = await fetch("api/posts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          links,
          categories: selectedCategory,
          imageUrl,
          publicId,
        }),
      });
      if (res.ok) {
        const successMessage = "Post created successfully";
        toast.success(successMessage);
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      {/* Form for creating a new post */}
      <form className="w-full flex flex-col gap-6 mt-8" onSubmit={handleSubmit}>
        {/* Input field for title */}
        <input
          type="text"
          name="title"
          className="w-full outline-none px-3 py-4 rounded-md text-xl border border-slate-400"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        {/* Textarea for content */}
        <textarea
          className="w-full px-3 outline-none py-4 rounded-md text-xl border border-slate-400"
          name="content"
          cols={30}
          rows={7}
          placeholder="Content"
          onChange={handleContentChange}
          value={content}
        />
        {/* Cloudinary upload button for image */}
        <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          className={`relative ${imageUrl && "pointer-events-none"}`}
          onUpload={handleImageUpload}
        >
          <div className="bg-red-400 flex items-center justify-center h-44 rounded-md">
            <FaRegImage size={30} />
          </div>
          {imageUrl && (
            <Image
              src={imageUrl}
              fill
              alt="thumbnail"
              className="absolute object-cover inset-0"
            />
          )}
        </CldUploadButton>
        {/* Button to remove uploaded image */}
        {publicId && (
          <button
            onClick={handleRemoveImage}
            className="w-[20%] px-3 py-2 rounded-md text-white font-bold mt-0 bg-red-800"
          >
            Remove Image
          </button>
        )}
        {/* Displaying links */}
        <div className="flex flex-col gap-0">
          {links && links.length > 0
            ? links.map((link, index) => (
                <div
                  className="flex items-center gap-1 mt-3 md:text-xl"
                  key={index}
                >
                  <RiLinksFill className="text-dark font-semibold hover:underline hover:cursor-pointer hover:scale-y-105 transition-all" />
                  <Link
                    href={link}
                    className="text-dark font-semibold hover:underline hover:cursor-pointer hover:scale-y-105 max-w-full overflow-hidden text-ellipsis"
                  >
                    {link}
                  </Link>
                  <MdDelete
                    onClick={() => handleLinkDelete(index)}
                    color="red"
                    size={25}
                    className="text-dark text-right font-semibold hover:underline hover:cursor-pointer hover:scale-y-105 ml-6"
                  />
                </div>
              ))
            : ""}
        </div>
        <div className="w-full flex gap-6 ">
          <input
            onChange={handleLinkChange}
            name="links"
            value={linkInput}
            type="text"
            placeholder="Links"
            className="w-full px-3 py-4 outline-none rounded-md text-xl border border-slate-400"
          />
          <button
            onClick={handleLink}
            className="font-semibold rounded-md bg-[#365486] justify-center text-white text-xl flex gap-3 items-center px-2 py-2 w-[20%]"
          >
            <IoMdAdd size={30} /> Add
          </button>
        </div>
        <select
          // onChange={handleChange}
          className="w-[50%] px-3 py-3 bg-[#DCF2F1] "
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          <option value="">Select a category</option>
          {categories &&
            categories.map((category) => (
              <option value={category.catName} key={category.id}>
                {category.catName}
              </option>
            ))}
        </select>
        <button className="bg-[#11235A] rounded-md text-white px-3 py-3 text-xl mt-4">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
