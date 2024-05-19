export const dateFormat = (dateString) => {
    const objectDate = new Date(dateString);
    let day = objectDate.getDate();
    let month = objectDate.getMonth();
    let year = objectDate.getFullYear();

    return `${month}/${day}/${year}`;
}