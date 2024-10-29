// Function transformDate take Date or array of Dates as an argument and returns
// single string formatted Date if only 1 Date was passed as an argument or array of
// string formatted dates if array was passed as an argument

type MonthFormat = "short" | "long" | "numeric";

function transformDate(date: Date, monthFormat?: MonthFormat): string;
function transformDate(dates: Date[], monthFormat?: MonthFormat): string[];

function transformDate(date: Date | Date[], monthFormat: MonthFormat = "long") {
    if (typeof date === "string") {
        let value: string = new Date(date).toLocaleString("ru", {
            day: "numeric",
            month: monthFormat,
            year: "numeric",
        });
        return value;
    } else if (date instanceof Array) {
        let value: string[] = [];
        let transfValue: string;
        date.forEach((item) => {
            transfValue = new Date(item).toLocaleString("ru", {
                day: "numeric",
                month: monthFormat,
                year: "numeric",
            });
            value.push(transfValue);
        });
        return value;
    }
}

export default transformDate;
