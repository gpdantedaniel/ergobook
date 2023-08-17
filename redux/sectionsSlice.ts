import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Section } from '@/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as sectionsAPI from '@/supabase/sectionsAPI'

export const fetchSections = createAsyncThunk('sections/fetchSections',
async({ notebook_id } : { notebook_id: number}, { rejectWithValue}) => {
  try {
    const data = await sectionsAPI.fetchSections({ notebook_id })
    return data
  } catch(error) {
    console.log('Failed to fetch sections: ', error);
    rejectWithValue('Failed to fetch sections. Please try again.')
    throw error
  }
})

export const createSection = createAsyncThunk('sections/createSection', 
async({ notebook_id, title  } : { notebook_id: number, title: string }, { getState, rejectWithValue }) => {
  try {
    const { sections: { entities } } = getState() as { sections: SectionsState }
    const highestOrderIndex = Math.max(
      ...Object.values(entities)
      .filter((section): section is Section => section !== undefined)
      .map((section: Section) => section.orderIndex)
    , 0)

    const orderIndex = highestOrderIndex + 1 // The new section will be the last one
    const data = await sectionsAPI.createSection({ notebook_id, title, orderIndex })
    return data
  } catch(error) {
    console.log('Failed to create section: ', error);
    rejectWithValue('Failed to create section. Please try again.')
    throw error
  }
})

export const updateSection = createAsyncThunk('sections/updateSection', 
async({ id, title } : { id: number, title: string }, { rejectWithValue }) => {
  try {
    const data = await sectionsAPI.updateSection({ id, title })
    return data
  } catch(error) {
    console.log('Failed to update section: ', error);
    rejectWithValue('Failed to update section. Please try again.')
    throw error
  }
})

export const deleteSection = createAsyncThunk('sections/deleteSection', 
async({ id } : { id: number }, { rejectWithValue }) => {
  try {
    const data = await sectionsAPI.deleteSection({ id }) // Returns ID of the deleted section
    return data
  } catch(error) {
    console.log('Failed to delete section: ', error)
    rejectWithValue('Failed to delete section. Please try again.')
    throw error
  }
})

export const reorderSections = createAsyncThunk('sections/reorderSections', 
async(orderedSections : Section[], { rejectWithValue }) => {
  try {
    const data = await sectionsAPI.reorderSections(orderedSections)
    return data
  } catch(error) {
    console.log('Failed to reorder sections: ', error);
    rejectWithValue('Failed to reorder sections. Please try again.')
    throw error
  }
})

export const sectionsAdapter = createEntityAdapter<Section>({
  selectId: (section) => section.id,
  sortComparer: (a, b) => a.orderIndex - b.orderIndex
})

type SectionsEntitiesState = ReturnType<typeof sectionsAdapter.getInitialState>
interface SectionsState extends SectionsEntitiesState {
  // backup: NotebooksEntitiesState | null;
  loading: boolean;
}

const initialState: SectionsState = {
  ...sectionsAdapter.getInitialState(),
  // backup: null,
  loading: true, // A fetch operation happens immediately on SectionsBrowser mount
}

export const sectionsSlice = createSlice({
  name: 'sections',
  initialState: initialState,
  reducers: {

    optimisticallyReorderSections: (state, action: PayloadAction<Section[]>) => {
      const updatedSections = action.payload.map((section, index) => ({
        ...section,
        orderIndex: index
      }))

      sectionsAdapter.setAll(state, updatedSections)
    },
    
    // backupSections: (state) => { /* Awaiting robust implementation */ }
    
  },
  extraReducers: (builder) => {builder

    .addCase(fetchSections.pending, (state) => {
      state.loading = true
    })

    .addCase(fetchSections.fulfilled, (state, action) => {
      sectionsAdapter.setAll(state, action.payload)
      state.loading = false
    })

    // TODO: Handle errors and notifications
    .addCase(fetchSections.rejected, (state) => {
      state.loading = false
    })

    .addCase(createSection.fulfilled, (state, action) => {
      sectionsAdapter.addOne(state, action.payload[0])
    })

    .addCase(updateSection.fulfilled, (state, action) => {
        sectionsAdapter.updateOne(state, {
          id: action.payload[0].id,
          changes: {
            title: action.payload[0].title
          }
        })
    })
    
    .addCase(deleteSection.fulfilled, (state, action) => {
      sectionsAdapter.removeOne(state, action.payload)
    })

    .addCase(reorderSections.fulfilled, (state, action) => {
      sectionsAdapter.setAll(state, action.payload)
    })

    .addCase(reorderSections.rejected, (state, action) => {
      // waiting more robust implementation
    })

  }
})

export default sectionsSlice.reducer

export const {
  optimisticallyReorderSections,
  // backupSections
} = sectionsSlice.actions
