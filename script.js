document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const convertedAmount = document.querySelector('.converted-amount');
    const rateInfo = document.querySelector('.rate-info');
    const convertBtn = document.getElementById('convertBtn');

    // Exchange rates relative to USD
    const exchangeRates = {
        USD: 1.00,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110.42,
        CNY: 6.45,
        AUD: 1.36,
        CAD: 1.25,
        CHF: 0.92,
        NGN: 740,
        INR: 74.5
    };

    // Country code mapping
    const countryCodeMap = {
        USD: 'us',
        EUR: 'eu',
        GBP: 'gb',
        JPY: 'jp',
        CNY: 'cn',
        AUD: 'au',
        CAD: 'ca',
        CHF: 'ch',
        NGN: 'ng',
        INR: 'in'
    };

    // Update flag images when currency is changed
    function updateFlag(selectElement, imgElement) {
        const currency = selectElement.value;
        const countryCode = countryCodeMap[currency] || 'us';
        imgElement.src = `https://flagcdn.com/${countryCode}.svg`;
    }

    function convert() {
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        // Convert to USD first, then to target currency
        const inUSD = amount / exchangeRates[from];
        const final = inUSD * exchangeRates[to];

        // Update the converted amount display
        convertedAmount.textContent = `${to} ${final.toFixed(2)}`;

        // Update rate info
        const rate1 = (1 / exchangeRates[from] * exchangeRates[to]).toFixed(4);
        const rate2 = (exchangeRates[from] / exchangeRates[to]).toFixed(4);
        rateInfo.innerHTML = `
            <span>1 ${from} = ${rate1} ${to}</span>
            <span>1 ${to} = ${rate2} ${from}</span>
        `;
    }

    // Event listeners
    fromCurrency.addEventListener('change', () => {
        updateFlag(fromCurrency, fromCurrency.previousElementSibling);
        convert();
    });

    toCurrency.addEventListener('change', () => {
        updateFlag(toCurrency, toCurrency.previousElementSibling);
        convert();
    });

    amountInput.addEventListener('input', convert);
    convertBtn.addEventListener('click', convert);

    // Initial conversion
    convert();
});