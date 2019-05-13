function prepareDate(someDate) {
  const date = new Date(someDate);
  const newDate = date.toISOString().split("T")[0];
  return newDate;
}

export { prepareDate as date };
