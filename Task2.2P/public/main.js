window.onload = function () {
    const section = document.getElementById("projects");

    const form = document.createElement("form");
    form.innerHTML = `
        <h3>Try the Add API</h3>
        <input type="number" id="num1" placeholder="Enter number A" required />
        <input type="number" id="num2" placeholder="Enter number B" required />
        <button type="submit ">Add</button>
        <p id="result"></p>
    `;

    form.onsubmit = async function (e) {
        e.preventDefault();

        const a = document.getElementById('num1').value;
        const b = document.getElementById('num2').value;

        try {
            const response = await fetch(`/add?a=${a}&b=${b}`);
            const data = await response.json();

            document.getElementById('result').textContent =
                data.result !== undefined ? `Result: ${data.result}` : `Error: ${data.error}`;
        } catch (err) {
            document.getElementById('result').textContent = `Error: ${err.message}`;
        }
    };

    section.appendChild(form);
};
