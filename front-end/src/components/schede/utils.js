
function getStringaData(data) {
    const day = data.getDate().toString().padStart(2);
    const month = (data.getMonth() + 1).toString().padStart(2, '0');
    const year = data.getFullYear();

    return `${day}/${month}/${year}`;
}

export default getStringaData