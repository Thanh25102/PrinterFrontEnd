
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TopicsService } from "../../services/TopicsService";

export const TopicsThunk = {
    getAllTopics: createAsyncThunk("topics/get-all", async () => {
        return TopicsService.getTopics();
    })
}
