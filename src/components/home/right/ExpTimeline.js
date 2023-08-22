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
    months: (inverse ? -1 : 1) * (yearsDifference * 12 + monthsDifference),
    days: daysDifference,
  };
}

function ExpTimeline() {
  const cols = 12;

  const averageDaysInMonth = 30;
  const start = new Date("2021-05-17");
  const today = new Date();

  const difference = getDifferenceBetweenDates(start, today);

  const total = difference.months + (cols - (difference.months % cols)) + cols;
  const active = difference.months;
  const nonActive = total - difference.months - (difference.days > 0 ? 1 : 0);

  return (
    <div>
      <h3 className="mb-1">Experience</h3>
      <div className="grid gap-1 exp-timeline-container grid-cols-[repeat(12,14px)] mb-4 cursor-help">
        {Array(active)
          .fill(0)
          .map((t, i) => (
            <div className="exp-timeline-square bg-indigo-500" key={i}></div>
          ))}
        {difference.days > 0 && (
          <div
            className="exp-timeline-square days relative bg-gray-300"
            style={{
              "--days-width-percent":
                Number((difference.days / averageDaysInMonth) * 100).toFixed(
                  2
                ) + "%",
            }}
          ></div>
        )}
        {Array(nonActive)
          .fill(0)
          .map((t, i) => (
            <div className="exp-timeline-square bg-gray-300" key={i}></div>
          ))}
        {Array(cols)
          .fill(0)
          .map((t, i) => (
            <div
              className="exp-timeline-square bg-gray-300"
              style={{ opacity: 1.25 / (i + 1) }}
              key={i}
            ></div>
          ))}
      </div>
      <div className="flex flex-row items-center">
        <div className="bg-indigo-500 block me-2 rounded-sm w-[14px] h-[14px]"></div>
        <p className="text-xs m-0 relative top-[1px]">One Month</p>
      </div>
    </div>
  );
}

export default ExpTimeline;
