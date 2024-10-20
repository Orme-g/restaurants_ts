const tranfsormDate = (date) => {
    const value = new Date(date).toLocaleString("ru", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    return value;
};

export default tranfsormDate;
