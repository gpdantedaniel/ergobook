import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Notebook } from '@/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as notebooksAPI from '@/supabase/notebooksAPI'

export const fetchNotebooks = createAsyncThunk('notebooks/fetchNotebooks', 
async(_, { rejectWithValue }) => {
  try {
    const data = await notebooksAPI.fetchNotebooks()
    return data
  } catch(error) {
    console.log('Failed to fetch notebooks: ', error);
    rejectWithValue('Failed to fetch notebooks. Please try again.')
    throw error
  }
})

export const createNotebook = createAsyncThunk('notebooks/createNotebook',
async({ title, color } : { title: string, color: string}, { getState, rejectWithValue }) => {
  try {
    const { notebooks: { entities } } = getState() as { notebooks: NotebooksState }
    const highestOrderIndex = Math.max(
      ...Object.values(entities)
      .filter((notebook): notebook is Notebook => notebook !== undefined)
      .map((notebook: Notebook) => notebook.orderIndex)
    , 0)

    const orderIndex = highestOrderIndex + 1 // The new notebook will be the last one
    const data = await notebooksAPI.createNotebook({ title, color, orderIndex })
    return data
  } catch(error) {
    console.log('Failed to create notebook: ', error);
    rejectWithValue('Failed to create notebook. Please try again.')
    throw error
  }
})

export const updateNotebook = createAsyncThunk('notebooks/updateNotebook', 
async({ id, title, color } : { id: number, title: string, color: string}, { rejectWithValue }) => {
  try {
    const data = await notebooksAPI.updateNotebook({ id, title, color })
    return data
  } catch(error) {
    console.log('Failed to update notebook: ', error);
    rejectWithValue('Failed to update notebook. Please try again.')
    throw error
  }
})

export const deleteNotebook = createAsyncThunk('notebooks/deleteNotebook',
async({ id } : { id: number }, { rejectWithValue }) => {
  try {
    const data = await notebooksAPI.deleteNotebook({ id })
    return data
  } catch(error) {
    console.log('Failed to delete notebook: ', error);
    rejectWithValue('Failed to delete notebook. Please try again.')
    throw error
  }
})

export const reorderNotebooks = createAsyncThunk('notebooks/reorderNotebooks',
async(orderedNotebooks : Notebook[], { rejectWithValue }) => {
  try {
    const updatedNotebooks = await notebooksAPI.reorderNotebooks(orderedNotebooks) // Returns
    return updatedNotebooks
  } catch(error) {
    console.log('Failed to reorder notebooks: ', error);
    rejectWithValue('Failed to reorder notebooks. Please try again.')
    throw error
  }
})

export const notebooksAdapter = createEntityAdapter<Notebook>({
  selectId: (notebook) => notebook.id,
  sortComparer: (a, b) => a.orderIndex - b.orderIndex
})

type NotebooksEntitiesState = ReturnType<typeof notebooksAdapter.getInitialState>
interface NotebooksState extends NotebooksEntitiesState {
  backup: NotebooksEntitiesState | null;
  loading: boolean;
}

const initialState: NotebooksState = {
  ...notebooksAdapter.getInitialState(),
  backup: null,
  loading: true // A fetch operation happens immediately on NotebooksBrowser mount
}

// Make sure to define CRUD actions for each slice
export const notebooksSlice = createSlice({
  name: 'notebooks',
  initialState: initialState,
  reducers: {
    
    optimisticallyReorderNotebooks: (state, action: PayloadAction<Notebook[]>) => {
      // Update the orderIndex of each notebook
      const notebooks = action.payload.map((notebook, index) => ({
        ...notebook,
        orderIndex: index
      }));

      notebooksAdapter.setAll(state, notebooks)
    },

    backupNotebooks: (state) => {
      state.backup = {
        ids: [...state.ids],
        entities: { ...state.entities }
      }
    }

  },

  extraReducers: (builder) => {builder

    .addCase(fetchNotebooks.pending, (state) => {
      state.loading = true
    })

    .addCase(fetchNotebooks.fulfilled, (state, action) => {
      notebooksAdapter.setAll(state, action.payload)
      state.loading = false
    })

    // TODO: Handle errors and notifications
    .addCase(fetchNotebooks.rejected, (state) => {
      state.loading = false
    })

    .addCase(createNotebook.fulfilled, (state, action) => {
      notebooksAdapter.addOne(state, action.payload[0])
    })

    .addCase(updateNotebook.fulfilled, (state, action) => {
      notebooksAdapter.updateOne(state, {
        id: action.payload[0].id,
        changes: {
          title: action.payload[0].title,
          color: action.payload[0].color
        }
      })
    })

    .addCase(deleteNotebook.fulfilled, (state, action) => {
      notebooksAdapter.removeOne(state, action.payload)
    })

    .addCase(reorderNotebooks.fulfilled, (state, action) => {
      console.log('action.payload: ', action.payload)
      notebooksAdapter.setAll(state, action.payload)
      state.backup = null; // Clear the backup
    })

    .addCase(reorderNotebooks.rejected, (state) => {
      console.log('rejected')
      if (state.backup) {
        state.ids = state.backup.ids;
        state.entities = state.backup.entities;
      }

      state.backup = null; // Clear the backup
    })
  }
})

export default notebooksSlice.reducer

export const { 
  optimisticallyReorderNotebooks,
  backupNotebooks
} = notebooksSlice.actions

