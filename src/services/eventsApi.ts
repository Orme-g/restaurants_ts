import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverHost, serverPort } from "../../URLs";

import type { IEvent } from "../types/eventTypes";

export const eventsApi = createApi({
    reducerPath: "eventsApi",
    baseQuery: fetchBaseQuery({ baseUrl: `http://${serverHost}:${serverPort}/` }),
    endpoints: (builder) => ({
        getEvent: builder.query<IEvent, string>({
            query: (id: string) => `event/${id}`,
        }),
        getRestaurantEvents: builder.query<IEvent[] | [], string>({
            query: (restId: string) => `event/restaurant/${restId}`,
        }),
        addEvent: builder.mutation({
            query: (data: any) => ({
                url: "event/addEvent",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useGetEventQuery, useGetRestaurantEventsQuery, useAddEventMutation } = eventsApi;
