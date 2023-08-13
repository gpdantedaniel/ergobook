'use client'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch, store } from '@/redux/notebooksStore'
import { fetchNotebooks, reorderNotebooks, optimisticallyReorderNotebooks, backupNotebooks } from '@/redux/notebooksSlice'

import { notebooksSelectors } from '@/redux/notebooksStore'

import NotebookCard from './Notebook/NotebookCard'
import NotebookCreateCard from './Notebook/NotebookCreateCard'

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import NotebookCardLoading from './Notebook/NotebookCardLoading'

const NotebookBrowser = () => {
  const loading = useSelector((state: RootState) => state.notebooks.loading)
  const notebooks = useSelector(notebooksSelectors.selectAll)
  const dispatch = useDispatch<AppDispatch>()

  console.log('notebooks: ', store.getState().notebooks)

  useEffect(() => {
    dispatch(fetchNotebooks())
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 15
      }
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = notebooks.findIndex((notebook) => notebook.id === active.id);
      const newIndex = notebooks.findIndex((notebook) => notebook.id === over.id);
      const orderedNotebooks = arrayMove(notebooks, oldIndex, newIndex)
      
      dispatch(backupNotebooks()) // Save the current order to the backup
      dispatch(optimisticallyReorderNotebooks(orderedNotebooks))
      dispatch(reorderNotebooks(orderedNotebooks));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <ul className='
        w-full 
        md:w-auto
        grid 
        gap-2 md:gap-7 
        grid-cols-1
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        flex-shrink-0'
      >
        <SortableContext items={notebooks} >
          { !loading ? (
            <>
              {notebooks.map((notebook) => (
                <NotebookCard 
                  key={notebook.id} 
                  notebook={notebook}
                />
              ))}

              <NotebookCreateCard/>
            </>
          ) : (
            Array(8).fill(0).map((_, index) => (
              <NotebookCardLoading key={index}/>
            )
          ))}
          {/* <div className=' bg-yellow-500 rounded-md  row-start-1 row-end-3 col-start-6 col-end-6 col-span-2'></div> */}
        </SortableContext>
      </ul>
    </DndContext>
  )
}

export default NotebookBrowser

/*
Array(8).fill(0).map((_, index) => (
  <NotebookCardLoading key={index}/>
))
*/