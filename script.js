const buttons = document.getElementsByClassName('button');

if (buttons.length > 0) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            const initial = parseFloat(document.getElementById('initial').value);
            const contribution = parseFloat(document.getElementById('contribution').value);
            const nominalRate = parseFloat(document.getElementById('rate').value) / 100;
            const inflationRate = parseFloat(document.getElementById('inflation').value) / 100; // Get inflation from input
            const years = parseInt(document.getElementById('years').value);

            if (isNaN(initial) || isNaN(contribution) || isNaN(nominalRate) || isNaN(inflationRate) || isNaN(years) ||
                initial < 0 || contribution < 0 || nominalRate < 0 || inflationRate < 0 || years < 0) {
                alert("Please enter valid positive numbers for all fields.");
                return;
            }

            // Calculate the real rate of return (using the approximation):
            const realRate = (1 + nominalRate) / (1 + inflationRate) - 1;

            let futureValue = initial;
            for (let j = 0; j < years; j++) {
                futureValue = (futureValue + contribution) * (1 + realRate);
            }

            document.getElementById('result').textContent = "Approximate end balance: £" + futureValue.toFixed(2);
        });
    }

    const inputs = document.querySelectorAll('.calculator input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            document.getElementById('result').textContent = "";
        });
    });
} else {
    console.log("No elements with class 'button' found.");
}
