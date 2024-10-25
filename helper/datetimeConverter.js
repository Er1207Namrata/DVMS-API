

export const convertToISO8601 = (dateString) => {
  const dateParts = dateString.split('/');
  if (dateParts.length !== 3) {
    throw new Error('Invalid date format. Expected dd/mm/yyyy');
  }

  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; 
  const year = parseInt(dateParts[2], 10);

  const date = new Date(year, month, day);
  
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const pad = (num, size) => num.toString().padStart(size, '0');

  const formattedDate = `${date.getFullYear()}-${pad(date.getMonth() + 1, 2)}-${pad(date.getDate(), 2)} ` +
                        `${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:${pad(date.getSeconds(), 2)}.` +
                        `${pad(date.getMilliseconds(), 3)}000+00`;

  return formattedDate;
  };