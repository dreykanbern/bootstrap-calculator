const bmiCategories = [
    { min: 0, max: 16, description: 'Выраженный дефицит массы тела' },
    { min: 16, max: 18.5, description: 'Недостаточная (дефицит) масса тела' },
    { min: 18.5, max: 25, description: 'Норма' },
    { min: 25, max: 30, description: 'Избыточная масса тела (предожирение)' },
    { min: 30, max: 35, description: 'Ожирение первой степени' },
    { min: 35, max: 40, description: 'Ожирение второй степени' },
    { min: 40, description: 'Ожирение третьей степени (морбидное)' }
];

document.addEventListener('DOMContentLoaded', () => {
    createBmiTable(bmiCategories);

    const bmiForm = document.getElementById('bmiForm');
    bmiForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateAndDisplayBMI();
    });

    const clearButton = document.getElementById('clearForm');
    clearButton.addEventListener('click', clearForm);
});

function calculateAndDisplayBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const bmi = calculateBMI(weight, height);
    const description = getBmiDescription(bmi, bmiCategories);

    document.getElementById('bmiResult').value = bmi;
    document.getElementById('bmiDescription').textContent = description;
}

function calculateBMI(weight, height) {
    return (weight / ((height / 100) ** 2)).toFixed(2);
}

function getBmiDescription(bmi, categories) {
    const category = categories.find(c => bmi >= c.min && (!c.max || bmi < c.max));
    return category ? category.description : 'Значение ИМТ вне диапазона';
}

function createBmiTable(categories) {
    const tableBody = document.getElementById('bmiTableBody');
    tableBody.innerHTML = ''; // надо очистить предыдущие строки таблицы, если они есть
    categories.forEach(category => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = `${category.min} - ${category.max || ''}`;
        row.insertCell(1).textContent = category.description;
    });
}

function clearForm() {
    document.getElementById('weight').value = '';
    document.getElementById('height').value = '';
    document.getElementById('bmiResult').value = '';
    document.getElementById('bmiDescription').textContent = '';
}
