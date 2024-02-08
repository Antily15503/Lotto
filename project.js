//this is a basic template for a slot machine
/*
GOALS: 
1. deposit money
2. determine how much to bet on
3. collect bet amount
4. spin slot machine
5. check if user won
6. if user won, give earnings
7. play again
*/

const prompt = require("prompt-sync")();

const deposit = () => { //function declaration
    var depositAmount = prompt("Enter a deposit amount: ")
    var numberDepositAmount = parseFloat(depositAmount);

    while (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        depositAmount = prompt("Invalid deposit amount, try again: ")
        numberDepositAmount = parseFloat(depositAmount);
    }
    return numberDepositAmount;
};

deposit();