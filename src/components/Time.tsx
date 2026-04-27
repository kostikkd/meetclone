"use client";

function LocalTime() {
    const date = new Date();

    const dateValue = {
        hour:
            date.getHours() >= 12
                ? "0" + (date.getHours() - 12)
                : date.getHours(),
        minute: date.getMinutes(),
        dayHalf: date.getHours() >= 12 ? "PM" : "AM",
        weekday: date.toLocaleString("en-US", { weekday: "short" }),
        mounth: date.toLocaleString("en-US", { month: "short" }),
        day: date.getDate(),
    };
    return (
        <div className="text-center">{`${dateValue.hour}:${dateValue.minute} ${dateValue.dayHalf} • ${dateValue.weekday}, ${dateValue.mounth} ${dateValue.day}`}</div>
    );
}

export default LocalTime;
