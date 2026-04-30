const calendars = document.querySelectorAll(".redCalendar");

for(const cal of calendars){
    const rcal = new RedCalendar(cal, {
        title: "Nagy",
    });
}