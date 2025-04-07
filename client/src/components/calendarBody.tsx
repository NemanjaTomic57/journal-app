import CalendarHeader from "./calendarHeader";

export default function CalendarBody() {
  return (
    <>
      <CalendarHeader />
      <div>
        <div className="w-full flex justify-around items-center py-4 bg-stone">
          <p>MON</p>
          <p>TUE</p>
          <p>WED</p>
          <p>THU</p>
          <p>FRI</p>
          <p>SAT</p>
          <p>SUN</p>
        </div>
      </div>
    </>
  );
}
