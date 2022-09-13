module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return (
      [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("/") +
      " " +
      [date.getHours(), date.getMinutes(), date.getSeconds()].join(":")
    );
  },
};
