import { baseApi } from "./baseApi";
import type { IEvent } from "../types/eventTypes";

export const eventsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEvent: builder.query<IEvent, string>({
            query: (id: string) => `event/${id}`,
        }),
        getRestaurantEvents: builder.query<IEvent[] | [], string>({
            query: (restId: string) => `event/restaurant/${restId}`,
        }),
        addEvent: builder.mutation<{ message: string }, any>({
            query: (data) => ({
                url: "event/addEvent",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useGetEventQuery, useGetRestaurantEventsQuery, useAddEventMutation } = eventsApi;
