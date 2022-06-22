export const formatDate = dateInput => {
  const newDate = new Date(dateInput);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return newDate.toLocaleDateString('es-ES', options);
};
