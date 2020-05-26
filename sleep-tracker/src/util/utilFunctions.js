export const formatThisDate = (dateEntered, startSleep, endSleep) => {
    let month = dateEntered.getMonth() + 1
    let day = dateEntered.getDate()
    let year = dateEntered.getFullYear()
    
    const timeSlept = Math.abs(new Date(`${year}/${month}/${day} ${startSleep}:00:00`) - new Date(`${year}/${month}/${day + 1} ${endSleep}:00:00`));

    const totalHours = Math.floor(timeSlept/1000/60/60); 

    return [ `${month}-${day}-${year}`, totalHours ];
}