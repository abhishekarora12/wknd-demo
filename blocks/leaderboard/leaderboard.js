import { fetchIndex } from '../../scripts/scripts.js';

function convertToSeconds(t) {
    var time = t.split(':');
    var total_sec = 0;
    if (time.length == 2) {
        total_sec += parseInt(time[1]); // directly add seconds
        total_sec += 60 * parseInt(time[0]); // convert minutes to seconds
    }
    return total_sec;
}

/**
 *
 * @param {HTMLElement} block
 */
export default async function decorate(block) {
    // Fetch items from index
    const indexContent = await fetchIndex('drafts/summit23/beatthebuzzer/leaderboard');
    const data = indexContent.data;

    // Create the table
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    headerRow.insertCell().textContent = 'Date';
    headerRow.insertCell().textContent = 'Name';
    headerRow.insertCell().textContent = 'Time';
    headerRow.insertCell().textContent = 'URL';

    // Sort the rows by time
    data.sort((a, b) => {
        var c = convertToSeconds(a['Time']);
        console.log("c: ", c);
        var d = convertToSeconds(b['Time']);
        console.log("d: ", d);
        var result = c - d;
        console.log("result: ", result);
        return result;
    });

    // Add the rows to the table
    data.forEach(row => {
        // console.log("row:", row); // debug
        const tableRow = table.insertRow();
        tableRow.insertCell().textContent = row['Date'];
        tableRow.insertCell().textContent = row['Name'];
        tableRow.insertCell().textContent = row['Time'];
        tableRow.insertCell().innerHTML = `<a href="${row['URL']}">${row['URL']}</a>`;
    });

    // Add the table to the page
    block.append(table);
}




