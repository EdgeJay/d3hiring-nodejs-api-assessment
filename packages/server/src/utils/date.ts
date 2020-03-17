const formatterForDB = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'UTC',
});

const formatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

export const dateStringForDatabase = (date: Date): string => {
  const [
    { value: MM },
    ,
    { value: dd },
    ,
    { value: yyyy },
    ,
    { value: hh },
    ,
    { value: mm },
    ,
    { value: ss },
  ] = formatterForDB.formatToParts(date);
  return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
};

export const dateString = (date: Date): string => {
  const [
    { value: MM },
    ,
    { value: dd },
    ,
    { value: yyyy },
    ,
    { value: hh },
    ,
    { value: mm },
    ,
    { value: ss },
  ] = formatter.formatToParts(date);
  return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
};
