export interface IEvent {
    _id: string;
    title: string;
    title_image: string;
    short_description: string;
    content: { [key: string]: string }[];
    createdAt: Date;
    restaurantName: string;
    restaurantId: string;
    dateStart: Date;
    dateFinish: Date;
}
