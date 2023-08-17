"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ColorItem, Notebook } from "@/types";

import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

import {
  BsPencil,
  BsTrash,
  BsThreeDotsVertical,
  BsGripHorizontal,
} from "react-icons/bs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/notebooksStore";
import { updateNotebook, deleteNotebook } from "@/redux/notebooksSlice";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import CustomDialog from "../CustomDialog";
import Input from "../Input";
import ColorDropdown from "../ColorDropdown";
import CustomAlert from "../CustomAlert";
import CustomDropdown from "../CustomDropdown";

interface NotebookCardProps {
  notebook: Notebook;
}

type NotebookInputs = {
  title: string;
  color: ColorItem;
};

const NotebookCard: React.FC<NotebookCardProps> = ({ notebook }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: notebook.id });

  // Edit Notebook dialog state controls
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [editLoading, setEditLoading] = useState<boolean>(false);

  // Alert Notebook dialog state controls
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, setValue, watch } = useForm<NotebookInputs>({
    defaultValues: {
      title: notebook.title,
      color: {
        name: "Current color", // Find the name by hex code
        hex: notebook.color,
      },
    },
  });

  const openNotebook = () => {
    router.push(`/workspace/notebook/${notebook.id}`);
  };

  const onUpdateNotebook: SubmitHandler<NotebookInputs> = (formData) => {
    // Disable the form while updating the notebook
    setEditLoading(true);

    const update = dispatch(
      updateNotebook({
        id: notebook?.id,
        title: formData.title,
        color: formData.color.hex,
      })
    );

    update
      .then(() => setEditOpen(false))
      .catch((error) => console.log("error: ", error))
      .finally(() => setEditLoading(false));

    toast.promise(update, {
      loading: "Updating notebook...",
      success: "Notebook successfully updated!",
      error: "Failed to update notebook.",
    });
  };

  const onDeleteNotebook = () => {
    // Disable the form while deleting the notebook
    setDeleteLoading(true);

    const deletion = dispatch(
      deleteNotebook({
        id: notebook?.id,
      })
    );

    deletion
      .then(() => setDeleteOpen(false))
      .catch((error) => console.log("error: ", error))
      .finally(() => setDeleteLoading(false));

    toast.promise(deletion, {
      loading: "Deleting notebook...",
      success: "Notebook successfully deleted!",
      error: "Failed to delete notebook.",
    });
  };

  return (
    <>
      <CustomDialog
        title="Edit Notebook"
        description="Give your notebook a personality!"
        onOpenChange={(open) => setEditOpen(open)}
        open={editOpen}
      >
        <form onSubmit={handleSubmit(onUpdateNotebook)}>
          <div className="my-6 flex flex-col gap-2">
            <label className="text-sm">Notebook Title</label>
            <Input
              placeholder="Title"
              disabled={editLoading}
              {...register("title")}
            />
            <label className="text-sm">Notebook Color</label>
            <ColorDropdown
              disabled={editLoading}
              selectedColor={watch("color")}
              onSelectColor={(color: ColorItem) =>
                setValue("color", {
                  name: color.name,
                  hex: color.hex,
                })
              }
            />
          </div>
          <Input type="submit" disabled={editLoading} />
        </form>
      </CustomDialog>

      <CustomAlert
        title="Delete Notebook"
        description="Are you sure you want to delete this notebook?"
        onOpenChange={(open) => setDeleteOpen(open)}
        open={deleteOpen}
        actionLabel="Delete"
        onAction={onDeleteNotebook}
        disabled={deleteLoading}
      />

      <li
        onClick={openNotebook}
        className="          
          theme-border border
          w-full md:w-48 md:h-64
          active:opacity-90
          rounded-lg
          overflow-hidden
          cursor-pointer
          flex flex-row-reverse justify-end flex-shrink-0 md:block          
          group
        "
        ref={setNodeRef}
        style={{
          backgroundColor: notebook.color,
          transform: CSS.Transform.toString(transform),
          transition,
        }}
        {...attributes}
      >
        <div
          className="
            h-full md:h-1/3
            flex-1 md:w-full
            py-4 px-4 pr-2         
            flex justify-start items-start
            bg-white/90 dark:bg-neutral-900
            md:group-hover:bg-slate-200 dark:md:group-hover:bg-neutral-800
            transition
         "
        >
          <div className="theme-text-colors flex-1 text-base line-clamp-2">
            {notebook?.title}
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <CustomDropdown
              dropdownActions={[
                {
                  name: "Edit Notebook",
                  icon: <BsPencil size={20} />,
                  onClick: () => setEditOpen(true),
                },
                {
                  name: "Delete Notebook",
                  icon: <BsTrash size={20} />,
                  onClick: () => setDeleteOpen(true),
                },
              ]}
            >
              <div className="bg-transparent rounded-full hover:bg-white dark:hover:bg-white/10 transition p-1">
                <BsThreeDotsVertical size={20} className="theme-text-colors" />
              </div>
            </CustomDropdown>
          </div>
        </div>
        <div
          className="
            md:h-2/3 
            w-6 md:w-full
            flex justify-center items-end
          dark:bg-neutral-900/10
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            {...listeners}
            className="
              hidden md:block
              bg-transparent 
              rounded-full 
             hover:bg-white/50
              transition 
              p-2
              my-2
              hover:cursor-grab
              active:cursor-grabbing
              active:bg-white/50 
            "
          >
            <BsGripHorizontal size={26} className="text-black" />
          </div>
        </div>
      </li>
    </>
  );
};

export default NotebookCard;
