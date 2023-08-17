"use client";

import { useEffect, useState } from "react";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import SectionCard from "./Section/SectionCard";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  sectionsSelectors,
} from "@/redux/notebooksStore";
import { Oval } from "react-loader-spinner";
import {
  fetchSections,
  optimisticallyReorderSections,
  reorderSections,
} from "@/redux/sectionsSlice";
import SectionCardCreate from "./Section/SectionCardCreate";
import { BsLayoutSidebar } from "react-icons/bs";

const SectionsBrowser = ({ notebook_id }: { notebook_id: number }) => {
  const [closed, setClosed] = useState<boolean>(false);
  const loading = useSelector((state: RootState) => state.sections.loading);
  const sections = useSelector(sectionsSelectors.selectAll);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSections({ notebook_id }));
  }, [dispatch, notebook_id]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 15,
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = sections.findIndex(
        (section) => section.id === active.id
      );
      const newIndex = sections.findIndex((section) => section.id === over.id);
      const orderedSections = arrayMove(sections, oldIndex, newIndex);

      console.log("orderedSections: ", orderedSections);
      // dispatch(backupSections()) // Save the current order to the backup
      dispatch(optimisticallyReorderSections(orderedSections));
      dispatch(reorderSections(orderedSections));
    }
  };

  return (
    <>
      <div
        onClick={() => setClosed(false)}
        className="
        theme-background
        theme-border border
        p-2 rounded-md
        theme-text-colors
        fixed top-20 left-4 z-10
        hover:theme-background-hover
        cursor-pointer
        "
      >
        <BsLayoutSidebar size={18} />
      </div>
      <div
        className={`
        theme-border 
        ${closed ? "border-none" : "border-r"}
        ${closed ? "w-0" : "w-64"}
        fixed border-box
        top-16 bottom-0 left-0 z-10
        overflow-x-hidden
        flex flex-col
        transition-width
        duration-200
        `}
      >
        <div
          onClick={() => setClosed(true)}
          className="
          p-4 text-base 
          theme-background 
          theme-border border-b
          cursor-pointer
          flex items-center justify-between
          "
        >
          Sections
          <div
            onClick={() => setClosed(false)}
            className="
            theme-background
            theme-border border
            p-2 rounded-md
            theme-text-colors
            hover:theme-background-hover
            cursor-pointer
            "
          >
            <BsLayoutSidebar size={18} />
          </div>
        </div>
        {!loading ? (
          <div
            className="
            flex-1 h-full w-full
            overflow-y-auto
            "
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sections}
                strategy={verticalListSortingStrategy}
              >
                {sections.map((section) => (
                  <SectionCard key={section.id} section={section} />
                ))}
                <SectionCardCreate notebook_id={notebook_id} />
              </SortableContext>
            </DndContext>
          </div>
        ) : (
          <div
            className="
              theme-secondary-card
              flex-1 h-full w-full 
              flex justify-center items-center
              animate-pulse transition
              cursor-progress
            "
          >
            <Oval
              height={40}
              width={40}
              color="rgb(203 213 225)"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="rgb(241 245 249)"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SectionsBrowser;
