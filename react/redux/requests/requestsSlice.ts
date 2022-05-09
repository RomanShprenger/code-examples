import * as toolkit from '@reduxjs/toolkit';
import { fetchRequests } from './requestsAPI';
import { filter } from './helpers';

// Initital states
const initialState = {
  status: null, // can use for loading status in the future
  tableData: [], // default data without filters
  filteredData: [], // filtered data
  filters: {
    source: null,
    assignee: null,
    authorizer: null,
    status: null,
  },
  searchText: '',
};

// Async actions
export const initData = toolkit.createAsyncThunk(
  'requests/fetchRequests',
  // TODO: create type for get state
  async (_arg, { getState }: any) => {
    const response = await fetchRequests(getState().system.token);
    return response;
  }
);

// Reducer actions
export const requestsSlice = toolkit.createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
    changeSearchInput: (state, action) => {
      state.searchText = action.payload;
    },
    changeFilterState: (state, action) => {
      state.filters = {
        ...state.filters,
        [action.payload.key]: action.payload.value,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // TODO: create type for the state
      .addCase(initData.pending, (state: any) => {
        state.status = 'loading';
      })
      // TODO: create type for the state
      .addCase(initData.fulfilled, (state: any, action) => {
        state.status = 'done';
        state.tableData = action.payload ? [...action.payload] : [];
        state.filteredData = action.payload ? [...action.payload] : [];
      });
  },
});

// Export of reducer actions
export const {
  setTableData,
  setFilteredData,
  changeSearchInput,
  changeFilterState,
} = requestsSlice.actions;

// Selectors
export const selectInitData = (state) => state.requests.tableData;
export const selectData = (state) => state.requests.filteredData;
export const selectFilters = (state) => state.requests.filters;
export const selectStatus = (state) => state.requests.status;
export const selectSearchText = (state) => state.requests.searchText;

// Other methods
export const onSearch = (text) => (dispatch, getState) => {
  let data = selectInitData(getState());
  const currentFilters = selectFilters(getState());

  data = filter(text, currentFilters, data);

  dispatch(changeSearchInput(text));
  dispatch(setFilteredData(data));
};

export const onChangeFilter = (key, values) => (dispatch, getState) => {
  let data = selectInitData(getState());
  const searchText = selectSearchText(getState());
  const currentFilters = selectFilters(getState());

  const newFilters = {
    source: key === 'source' ? values : currentFilters.source,
    assignee: key === 'assignee' ? values : currentFilters.assignee,
    authorizer: key === 'authorizer' ? values : currentFilters.authorizer,
    status: key === 'status' ? values : currentFilters.status,
  };

  data = filter(searchText, newFilters, data);

  dispatch(changeFilterState({ key, value: values }));
  dispatch(setFilteredData(data));
};

export default requestsSlice.reducer;
