import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { NotebookType as Notebook } from '@/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { supabase } from '@/utils/supabaseClient'

export const fetchNotebooks = createAsyncThunk('notebooks/fetchNotebooks', 
async(_, { rejectWithValue }) => {
  const { data, error } = await supabase
  .from('notebooks')
  .select('*')
  
  if (error) {
    console.log('Failed to fetch notebooks: ', error);
    rejectWithValue('Failed to fetch notebooks. Please try again.')
    throw error
  }
  return data
})

export const createNotebook = createAsyncThunk('notebooks/createNotebook',
async({ title, color } : { title: string, color: string}, { rejectWithValue }) => {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
  .from('notebooks')
  .insert({ 
    user_id: user?.id,
    title: title, 
    color: color
  })
  .select()

  if (error) {
    console.log('Failed to create notebook: ', error);
    rejectWithValue('Failed to create notebook. Please try again.')
    throw error
  }
  return data
})

export const updateNotebook = createAsyncThunk('notebooks/updateNotebook', 
async({ id, title, color } : { id: number, title: string, color: string}, { rejectWithValue }) => {
  const { data, error } = await supabase
  .from('notebooks')
  .update({ title: title, color: color })
  .eq('id', id)
  .select()

  if (error) {
    console.log('Failed to update notebook: ', error);
    rejectWithValue('Failed to update notebook. Please try again.')
    throw error
  }
  return data
})

export const deleteNotebook = createAsyncThunk('notebooks/deleteNotebook',
async({ id } : { id: number }, { rejectWithValue }) => {
  const { error } = await supabase
  .from('notebooks')
  .delete()
  .eq('id', id)

  if (error) {
    console.log('Failed to delete notebook: ', error);
    rejectWithValue('Failed to delete notebook. Please try again.')
    throw error
  }
  return id
})

export const reorderNotebooks = createAsyncThunk('notebooks/reorderNotebooks',
async(orderedNotebooks : Notebook[], { rejectWithValue }) => {
  // Update the orderIndex of each notebook
  const notebooks = orderedNotebooks.map((notebook, index) => ({
    ...notebook,
    orderIndex: index
  }));

  const { error } = await supabase
  .from('notebooks')
  .upsert(notebooks)

  if (error) {
    console.log('Failed to reorder notebooks: ', error);
    rejectWithValue('Failed to reorder notebooks. Please try again.')
    throw error
  }
  return notebooks
})

export const notebooksAdapter = createEntityAdapter<Notebook>({
  selectId: (notebook) => notebook.id,
  sortComparer: (a, b) => a.orderIndex - b.orderIndex
})

type NotebooksEntitiesState = ReturnType<typeof notebooksAdapter.getInitialState>
interface NotebooksState extends NotebooksEntitiesState {
  backup: NotebooksEntitiesState | null;
}

const initialState: NotebooksState = {
  ...notebooksAdapter.getInitialState(),
  backup: null
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
    .addCase(fetchNotebooks.fulfilled, (state, action) => {
      notebooksAdapter.setAll(state, action.payload)
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

