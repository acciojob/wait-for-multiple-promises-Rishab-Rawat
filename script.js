document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('resultsTable');
    const loadingRow = document.getElementById('loadingRow');

    if (!loadingRow) {
        console.error('Loading row not found!');
        return; // Exit early if loading row is not found
    }

    // Function to create a promise that resolves after a random time between 1 and 3 seconds
    function createRandomPromise(index) {
        return new Promise((resolve) => {
            const time = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
            setTimeout(() => {
                resolve({ index: index, time: time.toFixed(3) }); // Resolve with the promise index and time taken
            }, time * 1000);
        });
    }

    // Create an array of 3 promises
    const promises = [
        createRandomPromise(1),
        createRandomPromise(2),
        createRandomPromise(3)
    ];

    const startTime = performance.now(); // Record start time

    // Use Promise.all to wait for all promises to resolve
    Promise.all(promises).then(results => {
        const endTime = performance.now(); // Record end time
        const totalTime = ((endTime - startTime) / 1000).toFixed(3); // Calculate total time in seconds

        // Remove the loading row
        loadingRow.remove();

        // Populate the table with the resolved values
        results.forEach(result => {
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = `Promise ${result.index}`;
            cell2.textContent = `${result.time} seconds`;
        });

        // Add the final row for total time
        const totalRow = table.insertRow();
        const totalCell1 = totalRow.insertCell(0);
        const totalCell2 = totalRow.insertCell(1);
        totalCell1.textContent = 'Total';
        totalCell2.textContent = `${totalTime} seconds`;
    }).catch(error => {
        console.error('Error during promise execution:', error);
    });
});
