"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiLinksFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

const CreatePostForm = () => {
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState("");
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

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        />{" "}
        <textarea
          className="w-full px-3 outline-none py-4 rounded-md text-xl border border-slate-400"
          name="content"
          id=""
          cols={30}
          rows={10}
          placeholder="Content"
          required
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
        <select className="w-[50%] px-3 py-3 bg-[#DCF2F1] ">
          <option value="">Select a category</option>
          {categoriesList.map((category) => (
            <option value={category.name} key={category.id}>
              {category.name}
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
