import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function getDifferenceBetweenDates(date1, date2) {
  const startDate = date1;
  const endDate = date2;
  const inverse = false;

  if (date1 > date2) {
    startDate = date2;
    endDate = date1;
    inverse = true;
  }

  const yearsDifference = endDate.getFullYear() - startDate.getFullYear();
  const monthsDifference = endDate.getMonth() - startDate.getMonth();
  const daysDifference = endDate.getDate() - startDate.getDate();

  return {
    years: yearsDifference,
    months: monthsDifference,
    monthsTotal: (inverse ? -1 : 1) * (yearsDifference * 12 + monthsDifference),
    days: daysDifference,
  };
}

function ExpTimeline() {
  const avatarAppeared = useSelector((state) => state.avatarAppeared.value);
  const [className, setClassName] = useState(
    "opacity-0 scale-110 translate-x-[10rem]"
  );

  useEffect(() => {
    if (avatarAppeared) {
      setClassName("opacity-1 scale-100 translate-x-[0rem]");
    }
  });

  const cols = 12;

  const averageDaysInMonth = 30;
  const start = new Date("2021-05-17");
  const today = new Date();

  const { years, months, monthsTotal, days } = getDifferenceBetweenDates(
    start,
    today
  );

  const total = monthsTotal + (cols - (monthsTotal % cols)) + cols;
  const active = monthsTotal;
  const nonActive = total - monthsTotal - (days > 0 ? 1 : 0);

  return (
    <div
      className={
        `flex flex-col items-center transition duration-500 ` + className
      }
    >
      <h3 className="mb-1">Experience</h3>
      <div className="grid gap-1 exp-timeline-container grid-cols-[repeat(12,14px)] mb-4 relative cursor-help">
        <div className="absolute top-0 translate-y-[-54px] translate-x-[20px] text-xs text-white transition duration-500 right-0 bg-purple px-2 py-1 opacity-0 rounded-sm exp-timeline-popover">
          {years + " years " + months + " months " + days + " days"}
        </div>
        {Array(active)
          .fill(0)
          .map((t, i) => (
            <div className="exp-timeline-square bg-purple" key={i}></div>
          ))}
        {days > 0 && (
          <div
            className="exp-timeline-square days relative non-active"
            style={{
              "--days-width-percent":
                Number((days / averageDaysInMonth) * 100).toFixed(2) + "%",
            }}
          ></div>
        )}
        {Array(nonActive)
          .fill(0)
          .map((t, i) => (
            <div className="exp-timeline-square non-active" key={i}></div>
          ))}
        {Array(cols)
          .fill(0)
          .map((t, i) => (
            <div
              className="exp-timeline-square non-active"
              style={{ opacity: 1.25 / (i + 1) }}
              key={i}
            ></div>
          ))}
      </div>
      <div className="flex flex-row items-center">
        <div className="bg-purple block me-2 rounded-sm w-[14px] h-[14px]"></div>
        <p className="text-xs m-0 relative top-[1px]">One Month</p>
      </div>
    </div>
  );
}

export default ExpTimeline;
