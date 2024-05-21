export function formatDate(date) {
  // Extract year, month, and day from the date object
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month because months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  // Concatenate year, month, and day with '-' as separator
  return `${year}-${month}-${day}`;
}

export function formatLongDate(date) {
  // Extract year, month, and day from the date object
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const day = String(date.getDate()).padStart(2, "0");
  // Concatenate year, month, and day with '-' as separator
  return `${month} ${day}, ${year}`;
}

export function formatLongDateTime(date) {
  return `${formatLongDate(date)} | ${formatTime(date)}`;
}

export function formatTime(date) {
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getTableHeaders(jsonArray) {
  // Initialize a Set to store unique field names
  const allFields = new Set();
  
  // Iterate through each object in the JSON array
  jsonArray.forEach(obj => {
      Object.keys(obj.data).forEach(key => allFields.add(key));
  });

  // Convert the Set to a sorted array to use as table headers
  const tableHeaders = Array.from(allFields);

  return tableHeaders;
}