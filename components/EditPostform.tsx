"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RiLinksFill } from "react-icons/ri";

interface PostProps {
  postId: string;
}
interface CategoriesType {
  id: string;
  catName: string;
}

const EditPostform = ({ postId }: PostProps) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState("");

  useEffect(() => {
    const fetchEditData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}`,
        { cache: "no-store" }
      );
      const res = await response.json();
      setTitle(res?.title);
      setContent(res?.content);
      setSelectedCategory(res?.catName);
      setLinks(res?.links);
      setImageUrl(res?.imageUrl);
      setId(res?.id);
    };
    fetchEditData();
  }, [postId]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await fetch("http://localhost:3000/api/categories");
      const catName = await res.json();
      setCategories(catName);
    };
    fetchAllCategories();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handlePublicIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublicId(e.target.value);
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

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "PUT",
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
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="w-full flex flex-col gap-6 mt-8" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          id=""
          required
          className="w-full outline-none px-3 py-4 rounded-md text-xl border border-slate-400"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />{" "}
        <textarea
          className="w-full px-3 outline-none py-4 rounded-md text-xl border border-slate-400"
          name="content"
          id=""
          cols={30}
          rows={10}
          placeholder="Content"
          onChange={handleContentChange}
          required
          value={content}
        />
        <div className="flex flex-col gap-0">
          {links && links.length > 0
            ? links.map((link, index) => (
                <div
                  className="flex items-center gap-1 mt-3 md:text-xl "
                  key={index}
                >
                  <RiLinksFill className="text-dark font-semibold hover:underline hover:cursor-pointer hover:scale-y-105 transition-all " />{" "}
                  <Link
                    href={link}
                    className="text-dark font-semibold hover:underline hover:cursor-pointer hover:scale-y-105 transition-all max-w-full overflow-hidden text-ellipsis "
                  >
                    {link}
                  </Link>
                  <MdDelete
                    onClick={() => handleLinkDelete(index)}
                    color="red "
                    size={25}
                    className="text-dark text-right font-semibold hover:underline hover:cursor-pointer hover:scale-y-105 transition-all  ml-6"
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
          Edit Post
        </button>
      </form>
    </div>
  );
};

export default EditPostform;