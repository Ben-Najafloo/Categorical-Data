import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "/api/";

interface BookResponse {
    works: {
        authors: { name: string }[],
        title: string,
        key: string,
        cover_id?: number
    }[]
}
interface SearchResult {
    author_name: { name: string }[],
    title: string,
    key: string,
    cover_i?: number
}
interface BookDetails {
    subjects: string[],
    title: string,
    description: string | { value: string }
    key: string,
    covers?: number[]
}
interface BookState {
    BooksByCategory: { [category: string]: BookResponse["works"] },
    searchResult: SearchResult[],
    Booksdetails: BookDetails | null,
    isLoading: boolean,
    error: string | null
}

export const fetchBooksByCategory = createAsyncThunk(
    "books/fetchBooksByCategory",
    async (category: string) => {
        const respond = await axios.get<BookResponse>(`${BASE_URL}/subjects/${category.toLowerCase()}.json?limit=4`)
        return { category, books: respond.data.works }
    }
)

export const fetchSearchresults = createAsyncThunk<SearchResult[], string>(
    "books/fetchSearchresults",
    async (query: string) => {
        const respond = await axios.get(`${BASE_URL}/search.json?q=${query}`)
        return respond.data.docs.map((doc: {
            author_name: string[]
            title: string
            key: string
            cover_i?: number
        }) => ({
            authors: doc.author_name || [],
            title: doc.title,
            key: doc.key,
            cover_i: doc.cover_i
        }))
    }
)

export const fetchBookDetails = createAsyncThunk<BookDetails, string>(
    "books/fetchBookDetails",
    async (bookID: string) => {
        const respond = await axios.get<BookDetails>(`${BASE_URL}/works/${bookID}.json`)
        return respond.data
    }
)

const initialState: BookState = {
    BooksByCategory: {},
    searchResult: [],
    Booksdetails: null,
    isLoading: false,
    error: null
}

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooksByCategory.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchBooksByCategory.fulfilled, (state, action: PayloadAction<{ category: string, books: BookResponse["works"] }>) => {
                state.isLoading = false
                state.BooksByCategory[action.payload.category] = action.payload.books
            })
            .addCase(fetchBooksByCategory.rejected, (state, action) => {
                state.error = action.error.message || "Faild to calling the data"
                state.isLoading = false
            })
            .addCase(fetchSearchresults.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchSearchresults.fulfilled, (state, action: PayloadAction<SearchResult[]>) => {
                state.isLoading = false
                state.searchResult = action.payload
            })
            .addCase(fetchSearchresults.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || "Faild to calling the data by search"
            })
            .addCase(fetchBookDetails.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchBookDetails.fulfilled, (state, action: PayloadAction<BookDetails>) => {
                state.isLoading = false
                state.Booksdetails = action.payload
            })
            .addCase(fetchBookDetails.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || "Faild to calling the Details"
            })
    }
})

export default bookSlice.reducer