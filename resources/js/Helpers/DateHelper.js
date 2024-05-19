export const dateFormat = (dateString) => {
    const objectDate = new Date(dateString);
    let day = objectDate.getDate() + 1;
    let month = objectDate.getMonth() + 1;
    let year = objectDate.getFullYear();

    if (day.toString().length < 2) day = '0' + day;
    if (month.toString().length < 2) month = '0' + month;

    return `${month}/${day}/${year}`;
}
