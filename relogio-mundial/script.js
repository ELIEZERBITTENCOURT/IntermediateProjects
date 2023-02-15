function startClock() {
    setInterval(() => {
        const timezoneOffset = parseInt(document.getElementById("timezones").value);
        const date = new Date(new Date().getTime() + timezoneOffset * 60 * 60 * 1000);
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        };
        document.getElementById("clock").innerHTML = date.toLocaleString('en-US', options);
    }, 1000);
}

function changeTimezone() {
    const timezoneOffset = parseInt(document.getElementById("timezones").value);
    const date = new Date(new Date().getTime() + timezoneOffset * 60 * 60 * 1000);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
    };
    document.getElementById("clock").innerHTML = date.toLocaleString('en-US', options);
}  