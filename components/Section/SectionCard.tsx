"use client";

import React, { useState, useEffect } from "react";
import { Section } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import {
  BsCheckLg,
  BsGripVertical,
  BsPencil,
  BsTrash,
  BsXLg,
} from "react-icons/bs";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/notebooksStore";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { deleteSection, updateSection } from "@/redux/sectionsSlice";
import CustomAlert from "../CustomAlert";

interface SectionCardProps {
  section: Section;
}

type SectionInputs = {
  title: string;
};

const SectionCard: React.FC<SectionCardProps> = ({ section }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.id });

  // Edit Section dynamic interface state controls
  const [editOpen, setEditOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  // Alert Section dialog state controls
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, setFocus, getFieldState } =
    useForm<SectionInputs>({
      defaultValues: {
        title: section.title,
      },
    });

  useEffect(() => {
    if (editOpen) setFocus("title");
  }, [editOpen, setFocus]);

  // TODO: Implement access section notes functionality
  const openSection = () => {};

  const onUpdateSection: SubmitHandler<SectionInputs> = (formData) => {
    // Disable the section card while updating
    setEditLoading(true);

    const update = dispatch(
      updateSection({
        id: section.id,
        title: formData.title,
      })
    );

    update
      .then(() => setEditOpen(false))
      .catch((error) => console.log(error))
      .finally(() => setEditLoading(false));

    toast.promise(update, {
      loading: "Updating section...",
      success: "Section updated!",
      error: "Failed to update section.",
    });
  };

  const onDeleteSection = () => {
    // Disable the form while deleting the notebook
    setDeleteLoading(true);

    const deletion = dispatch(
      deleteSection({
        id: section.id,
      })
    );

    deletion
      .then(() => setDeleteOpen(false))
      .catch((error) => console.log("error: ", error))
      .finally(() => setDeleteLoading(false));

    toast.promise(deletion, {
      loading: "Deleting section...",
      success: "Section successfully deleted!",
      error: "Failed to delete notebook.",
    });
  };

  return (
    <>
      <CustomAlert
        title="Delete Section"
        description="Are you sure you want to delete this section?"
        onOpenChange={(open) => setDeleteOpen(open)}
        open={deleteOpen}
        actionLabel="Delete"
        onAction={onDeleteSection}
        disabled={deleteLoading}
      />

      <li
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
        }}
        {...attributes}
        className={`
          theme-selectable-background
          theme-border border-b
          flex items-center gap-1 px-2 py-3
          theme-text-colors text-sm
          group cursor-pointer
          ${editLoading ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <div
          {...(editLoading ? {} : listeners)}
          className={`
            invisible group-hover:visible 
            theme-hover-control            
            ${
              editLoading
                ? "cursor-not-allowed"
                : "hover:cursor-grab active:cursor-grabbing"
            }
          `}
        >
          <BsGripVertical size={18} />
        </div>

        {editOpen ? (
          <form
            onSubmit={handleSubmit(onUpdateSection)}
            className="flex-1 flex items-center gap-1"
          >
            <input
              className="
                bg-transparent 
                flex-1 w-full
                text-sm theme-text-colors line-clamp-2 
                outline-none border-white border
              "
              type="text"
              defaultValue={section.title}
              {...register("title")}
              disabled={editLoading}
              onKeyDown={(e) => {
                if (e.key === "Escape") setEditOpen(false);
                if (e.key === "Enter") handleSubmit(onUpdateSection)();
              }}
            />
            <button
              disabled={editLoading}
              type="submit"
              className={`
                theme-hover-control
                ${editLoading ? "cursor-wait" : ""}
              `}
            >
              <BsCheckLg size={18} />
            </button>
            <button
              disabled={editLoading}
              onClick={() => {
                setEditOpen(false);
              }}
              className={`
                theme-hover-control
                ${editLoading ? "cursor-wait" : ""}
              `}
            >
              <BsXLg size={18} />
            </button>
          </form>
        ) : (
          <>
            <div className="flex-1 line-clamp-2 select-none">
              {section.title}
            </div>
            <div
              onClick={() => setEditOpen(true)}
              className="invisible group-hover:visible theme-hover-control"
            >
              <BsPencil size={18} />
            </div>
            <div
              onClick={() => setDeleteOpen(true)}
              className="invisible group-hover:visible theme-hover-control"
            >
              <BsTrash size={18} />
            </div>
          </>
        )}
      </li>
    </>
  );
};

export default SectionCard;
