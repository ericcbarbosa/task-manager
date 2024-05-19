export const dateFormat = (dateString) => {
    const objectDate = new Date(dateString);
    let day = objectDate.getDate();
    let month = objectDate.getMonth();
    let year = objectDate.getFullYear();

    if (day.toString().length < 2) day = '0' + day;
    if (month.toString().length < 2) month = '0' + month;

    return `${month}/${day}/${year}`;
}
