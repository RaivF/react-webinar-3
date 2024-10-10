export default function formatDate(dateStr, locale) {
  const parsedDate = new Date(dateStr);

  const date = parsedDate.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = parsedDate.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = date.replace(/г./i, "в ");

  return formattedDate + " " + time;
}
