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
    var depositAmount = prompt("Enter a deposit amount: ");
    var numberDepositAmount = parseFloat(depositAmount);

    while (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        depositAmount = prompt("Invalid deposit amount, try again: ");
        numberDepositAmount = parseFloat(depositAmount);
    }
    return numberDepositAmount;
};

const getNumberOfLines = () =>{
    var lines = prompt("How many lines would you like to play? (1 - 3): ")
    var numberOfLines = parseFloat(lines);
    while (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
        if (lines > 3){
            lines = prompt("that's too many lines, try again: ");
            numberOfLines = parseFloat(lines);
        } else {
            lines = prompt("Didn't understand that, try again: ");
            numberOfLines = parseFloat(lines);
        }
    }
    return numberOfLines;
}

const getBet = (balance, lineNum) => {
    var betPrompt = prompt("How much do you want to bet? ")
    var betRead = parseFloat(betPrompt);
    while (isNaN(betRead) || betRead <= 0 || betRead > (balance/lineNum)){
        if (betRead > (balance/lineNum)){
            betPrompt = prompt("You don't have enough to make that bet! Try again: ");
            betRead = parseFloat(betPrompt);
        } else {
            lines = prompt("Didn't understand that, try again: ");
            numberOfLines = parseFloat(lines);
        }
    }
    return betRead;
}

let balance = deposit();
const lineNum = getNumberOfLines();
const bet = getBet(balance, lineNum);

