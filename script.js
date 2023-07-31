document.getElementById('add-item').addEventListener('click', function() {
    const itemInput = document.getElementById('item');
    const payerInput = document.getElementById('payer');
    const amountInput = document.getElementById('item-amount');
    const item = itemInput.value;
    const payer = payerInput.value;
    const amount = amountInput.value;
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item}</strong> - Paid by: ${payer} ($${amount})`;
    document.getElementById('item-ul').appendChild(li);
    itemInput.value = '';
    payerInput.value = '';
    amountInput.value = '';
});

document.getElementById('split-bill').addEventListener('click', function() {
    const people = parseInt(document.getElementById('people').value);
    const items = document.getElementById('item-ul').getElementsByTagName('li');
    let total = 0;
    const individualAmounts = {};

    for (let i = 0; i < items.length; i++) {
        const itemText = items[i].textContent;
        const nameIndex = itemText.indexOf('- Paid by: ');
        const itemName = itemText.substring(0, nameIndex).trim();
        const payerIndex = nameIndex + 11;
        const payerName = itemText.substring(payerIndex, itemText.indexOf('(', payerIndex)).trim();
        const amount = parseFloat(itemText.substring(itemText.indexOf('$') + 1, itemText.indexOf(')')));

        total += amount;

        if (!(payerName in individualAmounts)) {
            individualAmounts[payerName] = {};
            individualAmounts[payerName].total = 0;
            individualAmounts[payerName].items = [];
        }

        individualAmounts[payerName].total += amount;
        individualAmounts[payerName].items.push(itemName);
    }

    const perPerson = total / people;
    const payers = [];
    const receivers = [];

    for (const payer in individualAmounts) {
        const adjustedAmount = perPerson - individualAmounts[payer].total;
        if (adjustedAmount > 0) {
            payers.push({ name: payer, amount: adjustedAmount });
        } else if (adjustedAmount < 0) {
            receivers.push({ name: payer, amount: Math.abs(adjustedAmount) });
        }
    }

    const resultHTML = [];
    while (payers.length > 0 && receivers.length > 0) {
        const payer = payers[0];
        const receiver = receivers[0];

        if (payer.amount > receiver.amount) {
            resultHTML.push(`<li>${payer.name} needs to pay $${receiver.amount.toFixed(2)} to ${receiver.name}</li>`);
            payer.amount -= receiver.amount;
            receivers.shift();
        } else if (payer.amount < receiver.amount) {
            resultHTML.push(`<li>${payer.name} needs to pay $${payer.amount.toFixed(2)} to ${receiver.name}</li>`);
            receiver.amount -= payer.amount;
            payers.shift();
        } else {
            resultHTML.push(`<li>${payer.name} needs to pay $${payer.amount.toFixed(2)} to ${receiver.name}</li>`);
            payers.shift();
            receivers.shift();
        }
    }

    document.getElementById('result-ul').innerHTML = resultHTML.join('');
});

document.getElementById('result-ul').addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        const person = event.target.querySelector('strong').textContent;
        const explainDiv = document.getElementById('explain');
        explainDiv.innerHTML = `Because ${person} paid for ${item}, they should get paid ${amount}.`;
        explainDiv.style.display = 'block';
    }
});

// Share Calculation
document.getElementById('share-calculation').addEventListener('click', function() {
    let params = [];

    // Get all items
    const items = document.getElementById('item-ul').getElementsByTagName('li');
    for (let i = 0; i < items.length; i++) {
        const itemText = items[i].textContent;
        const nameIndex = itemText.indexOf('- Paid by: ');
        const itemName = itemText.substring(0, nameIndex).trim();
        const payerIndex = nameIndex + 11;
        const payerName = itemText.substring(payerIndex, itemText.indexOf('(', payerIndex)).trim();
        const amount = parseFloat(itemText.substring(itemText.indexOf('$') + 1, itemText.indexOf(')')));

        params.push(`item=${encodeURIComponent(itemName)}`);
        params.push(`payer=${encodeURIComponent(payerName)}`);
        params.push(`amount=${encodeURIComponent(amount)}`);
    }

    // Get number of people
    const people = document.getElementById('people').value;
    params.push(`people=${encodeURIComponent(people)}`);

    const url = `${window.location.href}?${params.join('&')}`;

    // Do something with url, e.g., copy to clipboard
    navigator.clipboard.writeText(url).then(function() {
        alert('Bill details copied successfully');
    }, function(err) {
        console.error('Could not copy Bill details : ', err);
    });
});

window.onload = function() {
    const params = new URLSearchParams(window.location.search);

    // Load items
    const items = params.getAll('item');
    const payers = params.getAll('payer');
    const amounts = params.getAll('amount');
    for (let i = 0; i < items.length; i++) {
        const itemInput = document.getElementById('item');
        const payerInput = document.getElementById('payer');
        const amountInput = document.getElementById('item-amount');
        itemInput.value = decodeURIComponent(items[i]);
        payerInput.value = decodeURIComponent(payers[i]);
        amountInput.value = decodeURIComponent(amounts[i]);
        document.getElementById('add-item').click(); // trigger the click event to add item
        itemInput.value = '';
        payerInput.value = '';
        amountInput.value = '';
    }

    // Load number of people
    const people = params.get('people');
    document.getElementById('people').value = decodeURIComponent(people);
}








