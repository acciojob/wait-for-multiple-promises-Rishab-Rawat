document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");

  const loadingRow = document.createElement("tr");
  loadingRow.id = "loading";
  const loadingCell = document.createElement("td");
  loadingCell.colSpan = 2;
  loadingCell.textContent = "Loading...";
  loadingRow.appendChild(loadingCell);
  output.appendChild(loadingRow);

  function createPromise(promiseName) {
    return new Promise((resolve) => {
      const time = Math.random() * 2 + 1;
      setTimeout(() => {
        resolve({ name: promiseName, time: time.toFixed(3) });
      }, time * 1000);
    });
  }

  const promises = [
    createPromise("Promise 1"),
    createPromise("Promise 2"),
    createPromise("Promise 3"),
  ];

  const startTime = performance.now();

  Promise.all(promises).then((results) => {
 const endTime = performance.now();
    const totalTime = ((endTime - startTime) / 1000).toFixed(3);

    output.innerHTML = "";

    results.forEach((result) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      const timeCell = document.createElement("td");
      nameCell.textContent = result.name;
      timeCell.textContent = result.time;
      row.appendChild(nameCell);
      row.appendChild(timeCell);
      output.appendChild(row);
    });

    const totalRow = document.createElement("tr");
    const totalNameCell = document.createElement("td");
    const totalTimeCell = document.createElement("td");
    totalNameCell.textContent = "Total";
    totalTimeCell.textContent = totalTime;
    totalRow.appendChild(totalNameCell);
    totalRow.appendChild(totalTimeCell);
    output.appendChild(totalRow);
  });
});