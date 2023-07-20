function calculatePPI() {
    const xInput = document.getElementById('x');
    const yInput = document.getElementById('y');
    const diagonalInput = document.getElementById('diagonal');
    const retinaCheckbox = document.getElementById('retinaCheckbox');
    const resultDiv = document.getElementById('result');

    const xPixels = xInput.value;
    const yPixels = yInput.value;
    const diagonalInches = diagonalInput.value;
    let ppi;

    if (xPixels && yPixels && diagonalInches) {
        const effectiveXPixels = retinaCheckbox.checked ? xPixels / 2 : xPixels;
        const effectiveYPixels = retinaCheckbox.checked ? yPixels / 2 : yPixels;
        const diagonalPixels = Math.sqrt(effectiveXPixels ** 2 + effectiveYPixels ** 2);
        ppi = diagonalPixels / diagonalInches;

        resultDiv.innerHTML = `Pixels Per Inch (PPI): ${ppi.toFixed(2)}`;
    } else {
        resultDiv.innerHTML = "Please fill in all input fields.";
    }

    // Update the URL with the input values after the calculation
    const params = new URLSearchParams();
    params.append('x', xPixels);
    params.append('y', yPixels);
    params.append('diagonal', diagonalInches);
    params.append('retina', retinaCheckbox.checked ? '1' : '0');

    // Check if the same entry already exists in the history
    const history = JSON.parse(localStorage.getItem('history')) || [];
    const sameEntryIndex = history.findIndex(entry => entry.x === xPixels && entry.y === yPixels && entry.diagonal === diagonalInches && entry.retina === retinaCheckbox.checked);
    if (sameEntryIndex !== -1) {
        // Entry with the same values already exists, remove it from history
        history.splice(sameEntryIndex, 1);
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);

    // Save the current entry to local storage
    saveToLocalStorage(xPixels, yPixels, diagonalInches, retinaCheckbox.checked, ppi);
    // Update the history list
    updateHistoryList();
}

function saveToLocalStorage(x, y, diagonal, retina, ppi) {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    // add as first element if the current first history item is different
    if (history.length > 0) {
        const firstEntry = history[0];
        if (firstEntry.x === x && firstEntry.y === y && firstEntry.diagonal === diagonal && firstEntry.retina === retina) {
            // same entry already exists, don't add it again
            return;
        }
    }
    history.unshift({ x, y, diagonal, retina, ppi });
    localStorage.setItem('history', JSON.stringify(history));
}

function updateHistoryList() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    const history = JSON.parse(localStorage.getItem('history')) || [];
    history.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'history-item';

        const entryString = `${entry.x}x${entry.y}@${entry.diagonal}inch`;
        const displayString = entry.retina ? `${entryString} (Retina) - ${entry.ppi.toFixed(2)} PPI` : `${entryString} - ${entry.ppi.toFixed(2)} PPI`;
        const isHighlighted = entry.ppi >= 89 && entry.ppi <= 111;

        const textContainer = document.createElement('div');
        textContainer.className = 'text-container';
        textContainer.innerHTML = `
            <span class="${isHighlighted ? 'highlighted' : ''}" title="${displayString}">
                ${displayString}
            </span>
            `;

        if (isHighlighted) {
            const checkmarkIcon = document.createElement('span');
            checkmarkIcon.className = 'checkmark-icon';
            checkmarkIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
                <path fill="#007bff" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
            `;
            textContainer.appendChild(checkmarkIcon);
        }

        listItem.appendChild(textContainer);

        const deleteButton = document.createElement('span');
        deleteButton.className = 'delete-entry';
        deleteButton.title = 'Delete Entry';
        deleteButton.innerHTML = '🗑️';
        deleteButton.onclick = () => deleteHistoryEntry(index);
        listItem.appendChild(deleteButton);

        historyList.appendChild(listItem);
    });

    if (history.length > 0) {
        const clearAllButton = document.createElement('li');
        clearAllButton.innerHTML = `<span class="delete-all" onclick="clearHistory()">Clear All</span>`;
        historyList.appendChild(clearAllButton);
    }
}

function deleteHistoryEntry(index) {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    history.splice(index, 1);
    localStorage.setItem('history', JSON.stringify(history));
    updateHistoryList();
}

function clearHistory() {
    localStorage.removeItem('history');
    updateHistoryList();
}

function loadValuesFromURL() {
    /* Load input values from the URL when the page loads */
    const urlParams = new URLSearchParams(window.location.search);
    const x = urlParams.get('x');
    const y = urlParams.get('y');
    const diagonal = urlParams.get('diagonal');
    const retina = urlParams.get('retina');

    if (x && y && diagonal) {
        document.getElementById('x').value = x;
        document.getElementById('y').value = y;
        document.getElementById('diagonal').value = diagonal;
        document.getElementById('retinaCheckbox').checked = retina === '1';
    }

    // Update the history list
    updateHistoryList();
}

loadValuesFromURL();
