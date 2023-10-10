
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useHttp } from '../hooks/http.hook'

const initialState = {
    allDonersData: null,
    singleDonerData: null,
    donerTopicComments: null,
    pageLoading: 'loading'
    
}


export const fetchAllDonersData = createAsyncThunk(
    'doners/fetchAllDonersData',
    () => {
        const {request} = useHttp()
        return request('http://localhost:4000/best-doner')
    }
)

export const fetchSingleDonerData = createAsyncThunk(
    'doners/fetchSingleDonerData',
    (donerId) => {
        const {request} = useHttp()
        return request(`http://localhost:4000/best-doner/${donerId}`)
    }
)

export const fetchTopicComments = createAsyncThunk(
    'doners/fetchTopicComments',
    (donerId) => {
        const {request} = useHttp()
        return request(`http://localhost:4000/best-doner/comments/${donerId}`)
    }
)

const donersSlice = createSlice({
    name: 'doners',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // All Doners
            .addCase(fetchAllDonersData.pending, state => {state.pageLoading = 'loading'})
            .addCase(fetchAllDonersData.fulfilled, (state, action) => {
                state.pageLoading = 'idle'
                state.allDonersData = action.payload
            })
            .addCase(fetchAllDonersData.rejected, state => {state.pageLoading = 'error'})
            // Single Doner
            .addCase(fetchSingleDonerData.pending, state => {state.pageLoading = 'loading'})
            .addCase(fetchSingleDonerData.fulfilled, (state, action) => {
                state.pageLoading = 'idle'
                state.singleDonerData = action.payload
            })
            .addCase(fetchSingleDonerData.rejected, state => {state.pageLoading = 'error'})
            // Comments
            .addCase(fetchTopicComments.pending, state => {state.pageLoading = 'loading'})
            .addCase(fetchTopicComments.fulfilled, (state, action) => {
                state.pageLoading = 'idle'
                state.donerTopicComments = action.payload
            })
            .addCase(fetchTopicComments.rejected, state => {state.pageLoading = 'error'})

    }
})

// eslint-disable-next-line 
const {actions, reducer} = donersSlice
export default reducer