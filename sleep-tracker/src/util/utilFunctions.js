export const formatThisDate = (dateEntered) => {
    let month = dateEntered.getMonth() + 1
    let day = dateEntered.getDate()
    let year = dateEntered.getFullYear()

    return `${month}-${day}-${year}`;
}