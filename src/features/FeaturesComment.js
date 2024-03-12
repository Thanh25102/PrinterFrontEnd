import { createSlice } from "@reduxjs/toolkit";

const initialValue = [
    {
        id: 1,
        userName: "John Doe",
        time: "12:00",
        comment: "This is a comment",
    },
    {
        id: 2,
        userName: "Jane Doe",
        time: "12:00",
        comment: "This is a comment",
    },
    {
        id: 3,
        userName: "Alice Smith",
        time: "13:30",
        comment: "I really like this artwork!",
    },
    {
        id: 4,
        userName: "Bob Johnson",
        time: "14:45",
        comment: "The colors are amazing!",
    },
    {
        id: 5,
        userName: "Charlie Brown",
        time: "15:15",
        comment: "Great composition!",
    },
    {
        id: 6,
        userName: "David Green",
        time: "16:00",
        comment: "I'm impressed by the level of detail.",
    },
    {
        id: 7,
        userName: "Eve White",
        time: "17:30",
        comment: "This artwork inspires me!",
    },
    {
        id: 8,
        userName: "Frank Blue",
        time: "18:45",
        comment: "The artist has truly outdone themselves!",
    },
    {
        id: 9,
        userName: "Grace Black",
        time: "19:15",
        comment: "I can't stop looking at it!",
    },
    {
        id: 10,
        userName: "Harry Red",
        time: "20:00",
        comment: "This artwork is a masterpiece!",
    },
];

export const commentSlice = createSlice({
    name: "comments",
    initialState: { value: initialValue },
    reducers: {
        addComment: (state, action) => {
            state.value.push(action.payload);
        },
        deleteComment: (state, action) => {
            state.value = state.value.filter(
                (comment) => comment.id !== action.payload.id
            );
        },
        updateComment: (state, action) => {
            const { id, comment } = action.payload;
            const updatedComments = state.value.map((c) =>
                c.id === id
                    ? {
                        ...c,
                        comment: comment,
                        time: new Date().toLocaleTimeString(),
                    }
                    : c
            );
            state.value = updatedComments;
        },
    },
});

export default commentSlice.reducer;
export const { addComment, deleteComment, updateComment } =
    commentSlice.actions;
