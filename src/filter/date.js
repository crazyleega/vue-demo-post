export default (param) => {
  if (param) {
    const tt = new Date(param);
    const year = tt.getFullYear();
    const mouth = tt.getMonth() + 1;
    const day = tt.getDate();
    const time = tt.getHours() < 10 ? `0${tt.getHours()}` : tt.getHours();
    const min = tt.getMinutes() < 10 ? `0${tt.getMinutes()}` : tt.getMinutes();
    return `${year}-${mouth}-${day} ${time}:${min}`;
  }
  return param;
};
