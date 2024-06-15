export const convertDateFormat = (dateStr) => {
  const dateObj = new Date(dateStr);

  const day = dateObj.getUTCDate();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const year = dateObj.getUTCFullYear();

  const months = {
    January: "Januari",
    February: "Februari",
    March: "Maret",
    April: "April",
    May: "Mei",
    June: "Juni",
    July: "Juli",
    August: "Agustus",
    September: "September",
    October: "Oktober",
    November: "November",
    December: "Desember",
  };

  const monthIndonesian = months[month];

  return `${day} ${monthIndonesian} ${year}`;
};
