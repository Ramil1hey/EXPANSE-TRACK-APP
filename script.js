const balance = document.querySelector('#balance');
const income = document.querySelector('#incomeBalance');
const expense = document.querySelector('#expenseBalance');
const historyExpense = document.querySelector('#historyExpense');
const input1 = document.querySelector('#what');
const input2 = document.querySelector('#amount');
const btn = document.querySelector('#btn');

// create some variables
let summa = 0;
let count = -1;
let savedDatas = {};
savedDatas.transuctionsData = [];
const pattern = `<div class="expenses_products" style="display: none;">
                    <span class="cancel">X</span>
                    <span id="products_text"></span>
                    <span id="products_amount"></span>
                </div>`;

function addTransuction(text, value, state) {
    historyExpense.innerHTML += `<div class="expenses_products ${state}">
                                    <span class="cancel">X</span>
                                    <span id="products_text">${text}</span>
                                    <span id="products_amount">${value}</span>
                                </div>`;
}



btn.addEventListener('click', function() {
    if (input1.value && input2.value) {
        if (Number(input2.value) < 0) {
            summa += Number(input2.value);
            balance.innerHTML = '$' + summa;
            expense.innerHTML = '$' + (Number(expense.innerHTML.slice(1)) - Number(input2.value));
            addTransuction(input1.value, Number(input2.value), 'spended');

            localStorage.setItem('SUMMA', JSON.stringify(summa));
            savedDatas.balanceData = Number(balance.innerHTML.slice(1)); 
            localStorage.setItem('BALANCE', JSON.stringify(savedDatas.balanceData));
            savedDatas.incomeData = Number(income.innerHTML.slice(1));
            localStorage.setItem('INCOME', JSON.stringify(savedDatas.incomeData));
            savedDatas.expenseData = Number(expense.innerHTML.slice(1));
            localStorage.setItem('EXPENSE', JSON.stringify(savedDatas.expenseData));
            count++;
            savedDatas.transuctionsData.push(`<div class="expenses_products spended">
                                                <span id=${count} class="cancel">X</span>
                                                <span id="products_text">${input1.value}</span>
                                                <span id="products_amount">${input2.value}</span>
                                            </div>`);
            localStorage.setItem('TRANSUCTION DATA', JSON.stringify(savedDatas.transuctionsData));
        }
        else if (Number(input2.value) > 0) {
            summa += Number(input2.value);
            balance.innerHTML = '$' + summa;
            income.innerHTML = '$' + (Number(income.innerHTML.slice(1)) + Number(input2.value));
            addTransuction(input1.value, Number(input2.value), 'earned');

            localStorage.setItem('SUMMA', JSON.stringify(summa));
            savedDatas.balanceData = Number(balance.innerHTML.slice(1)); 
            localStorage.setItem('BALANCE', JSON.stringify(savedDatas.balanceData));
            savedDatas.incomeData = Number(income.innerHTML.slice(1));
            localStorage.setItem('INCOME', JSON.stringify(savedDatas.incomeData));
            savedDatas.expenseData = Number(expense.innerHTML.slice(1));
            localStorage.setItem('EXPENSE', JSON.stringify(savedDatas.expenseData));
            count++;
            savedDatas.transuctionsData.push(`<div class="expenses_products earned">
                                                <span id=${count} class="cancel">X</span>
                                                <span id="products_text">${input1.value}</span>
                                                <span id="products_amount">${input2.value}</span>
                                            </div>`);
            localStorage.setItem('TRANSUCTION DATA', JSON.stringify(savedDatas.transuctionsData));
        } 
    }
    else {
        alert('Add text and amount');
    }
    input1.value = '';
    input2.value = ''; 
})
document.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        if (input1.value && input2.value) {
            if (Number(input2.value) < 0) {
                summa += Number(input2.value);
                balance.innerHTML = '$' + summa;
                expense.innerHTML = '$' + (Number(expense.innerHTML.slice(1)) - Number(input2.value));
                addTransuction(input1.value, Number(input2.value), 'spended');

                localStorage.setItem('SUMMA', JSON.stringify(summa));
                savedDatas.balanceData = Number(balance.innerHTML.slice(1)); 
                localStorage.setItem('BALANCE', JSON.stringify(savedDatas.balanceData));
                savedDatas.incomeData = Number(income.innerHTML.slice(1));
                localStorage.setItem('INCOME', JSON.stringify(savedDatas.incomeData));
                savedDatas.expenseData = Number(expense.innerHTML.slice(1));
                localStorage.setItem('EXPENSE', JSON.stringify(savedDatas.expenseData));
                count++;
                savedDatas.transuctionsData.push(`<div class="expenses_products spended">
                                                <span id=${count} class="cancel">X</span>
                                                <span id="products_text">${input1.value}</span>
                                                <span id="products_amount">${input2.value}</span>
                                            </div>`);
                localStorage.setItem('TRANSUCTION DATA', JSON.stringify(savedDatas.transuctionsData));
            }
            else if (Number(input2.value) > 0) {
                summa += Number(input2.value);
                balance.innerHTML = '$' + summa;
                income.innerHTML = '$' + (Number(income.innerHTML.slice(1)) + Number(input2.value));
                addTransuction(input1.value, Number(input2.value), 'earned');

                localStorage.setItem('SUMMA', JSON.stringify(summa));
                savedDatas.balanceData = Number(balance.innerHTML.slice(1)); 
                localStorage.setItem('BALANCE', JSON.stringify(savedDatas.balanceData));
                savedDatas.incomeData = Number(income.innerHTML.slice(1));
                localStorage.setItem('INCOME', JSON.stringify(savedDatas.incomeData));
                savedDatas.expenseData = Number(expense.innerHTML.slice(1));
                localStorage.setItem('EXPENSE', JSON.stringify(savedDatas.expenseData));
                count++;
                savedDatas.transuctionsData.push(`<div class="expenses_products earned">
                                                <span id=${count} class="cancel">X</span>
                                                <span id="products_text">${input1.value}</span>
                                                <span id="products_amount">${input2.value}</span>
                                            </div>`);
                localStorage.setItem('TRANSUCTION DATA', JSON.stringify(savedDatas.transuctionsData));
            } 
        }
        else {
            alert('Add text and amount');
        }
        input1.value = '';
        input2.value = '';
    }
})


setInterval(() => {
    document.querySelectorAll('.expenses_products').forEach(div => {
        div.onmouseover = () => {
            div.querySelector('.cancel').style.opacity = '1';
        }
        div.onmouseout = () => {
            div.querySelector('.cancel').style.opacity = '0';
        }
        div.querySelector('.cancel').onclick = () => {
            div.querySelector('.cancel').parentNode.style.display = 'none';
            savedDatas.transuctionsData[Number(div.querySelector('.cancel').attributes.id.value)] = pattern;
            localStorage.setItem('TRANSUCTION DATA', JSON.stringify(savedDatas.transuctionsData));
            if (Number(div.querySelector('#products_amount').innerHTML) > 0) {
                income.innerHTML = '$' + (Number(income.innerHTML.slice(1)) - Number(div.querySelector('#products_amount').innerHTML));
                balance.innerHTML = '$' + (Number(balance.innerHTML.slice(1)) - Number(div.querySelector('#products_amount').innerHTML));
    
                savedDatas.balanceData = Number(balance.innerHTML.slice(1)); 
                localStorage.setItem('BALANCE', JSON.stringify(savedDatas.balanceData));
                savedDatas.incomeData = Number(income.innerHTML.slice(1));
                localStorage.setItem('INCOME', JSON.stringify(savedDatas.incomeData));
                savedDatas.expenseData = Number(expense.innerHTML.slice(1));
                localStorage.setItem('EXPENSE', JSON.stringify(savedDatas.expenseData));
            }
            else if (Number(div.querySelector('#products_amount').innerHTML) < 0) {
                expense.innerHTML = '$' + (Number(expense.innerHTML.slice(1)) + Number(div.querySelector('#products_amount').innerHTML));
                balance.innerHTML = '$' + (Number(balance.innerHTML.slice(1)) - Number(div.querySelector('#products_amount').innerHTML));
    
                savedDatas.balanceData = Number(balance.innerHTML.slice(1));
                localStorage.setItem('BALANCE', JSON.stringify(savedDatas.balanceData));
                savedDatas.incomeData = Number(income.innerHTML.slice(1));
                localStorage.setItem('INCOME', JSON.stringify(savedDatas.incomeData));
                savedDatas.expenseData = Number(expense.innerHTML.slice(1));
                localStorage.setItem('EXPENSE', JSON.stringify(savedDatas.expenseData));
            }
        }
    })
}, 1000);

summa = Number(localStorage.getItem('SUMMA'));

let dataBalance = localStorage.getItem('BALANCE');
dataBalance = Number(dataBalance);
balance.innerHTML = '$' + dataBalance;

let dataIncome = localStorage.getItem('INCOME');
dataIncome = Number(dataIncome);
income.innerHTML = '$' + dataIncome;

let dataExpenses = localStorage.getItem('EXPENSES');
dataExpenses = Number(dataExpenses);
expense.innerHTML = '$' + dataExpenses;

let dataTransuctions = localStorage.getItem('TRANSUCTION DATA');
dataTransuctions = JSON.parse(dataTransuctions);

if (dataTransuctions) {
    dataTransuctions.forEach(i => {
        historyExpense.innerHTML += i;
        savedDatas.transuctionsData.push(i);
    })
    count = dataTransuctions.length - 1;
}