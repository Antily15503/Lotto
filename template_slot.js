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

//specifications of the slot machine
const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = { //how many of each letter appears
    "A": 1,
    "B": 3,
    "C": 6,
    "D": 10
};

const SYMBOL_VALUES = { //multiplier / value of each symbol in payout
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
};


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
};

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
};

const spin = () => { //spins and generates the different resulting wheels (uses up one line)
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) { //loops through all values in SYMBOLS_COUNT and prints out each character and the associated value
        for(i = 0; i < count; i++){
            symbols.push(symbol); //add symbol into array
        }
    }
    const reels = [];
    for (let i = 0; i < COLS; i++){
        reels.push([]); //in case # of reels is different from 3
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++){
            const random = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[random];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(random, 1);
        }
    }
    //returned reels will be [#, #, #],[#, #, #],[#, #, #] where each [ ] is a column
    return reels;
};

const transpose = (reels) => { //trasposes the reels so instead of columns in each [ ] it is rows
    const rows = [];

    for(let i = 0; i < ROWS; i++){
        rows.push([]);
        for (let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printRows = (rows) => {
    for (const row of rows){
        let rowStr = "";
        for (const [i, symbol] of row.entries()){
            rowStr += symbol;
            if (i != rows.length - 1){
                rowStr += " | "
            }
        }
        console.log(rowStr); //prints out the rows
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols) {
            if(symbol != symbols[0]){ //check if all of the symbols are equal to the first symbol
                allSame = false;
                break;
            }
        }
        if(allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
}

const slotGame = () => {
    let balance = deposit();
    while(true){
        console.log("Your current balance: $" + balance);
        const lineNum = getNumberOfLines();
        const bet = getBet(balance, lineNum);
        balance -= bet * lineNum;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, lineNum);
        balance += winnings;
        console.log("You won, $" + winnings.toString());

        if (balance <= 0){
            console.log("you ran out of money!");
            break;
        }
    }
    const playAgain = prompt("Do you want to play again? (y/n)");
    if (playAgain != "y") return 0;
};

slotGame();

