#! /usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";
// 1) asking username 
// 2) start functionality 
//-------------------------------- asking username ---------------------------
const askUserName = async () => {
    const userName_ans = await inquirer.prompt({
        name: `usr_name`,
        type: `input`,
        message: chalk.magenta(`\nWhat is Your Good Name: `),
        validate: (input) => {
            const trimmedInput = input.trim();
            if (trimmedInput === "") {
                return chalk.redBright(`Please enter your name.`);
            }
            else if (!/^[a-zA-Z]+$/.test(trimmedInput)) {
                return chalk.redBright(`Please enter a valid name without numbers.`);
            }
            return true;
        },
    });
    return userName_ans.usr_name;
};
const userName = await askUserName();
console.log(chalk.yellow.underline(`\n\t Welcome! "${userName}" in Simple Calculator:\n`));
//--------------------------------- main functionality---------------------------
async function simp_cal() {
    let useAnotherOperator = true;
    while (useAnotherOperator) {
        const answer = await inquirer.prompt([
            {
                message: chalk.magenta `Enter your First number:`,
                type: `number`,
                name: `firstNumber`,
                validate: (input) => {
                    if (!/^\d+$/.test(input.toString().trim())) {
                        return `Please enter a valid number.`;
                    }
                    return true;
                }
            },
            {
                message: chalk.magenta `Enter your second number:`,
                type: `number`,
                name: `secondNumber`,
                validate: (input) => {
                    if (!/^\d+$/.test(input.toString().trim())) {
                        return `Please enter a valid number.`;
                    }
                    return true;
                }
            },
            {
                message: chalk.magenta `Select one of operator to perform action:\n`,
                type: `list`,
                name: `operator`,
                choices: [`- ADDITION`, `- SUBSTRACTION`, `- MULTIPLICATION`, `- DIVISION`, `- REMAINDER`, `- POWER`],
            }
        ]);
        //conditional statments
        if (answer.operator === `- ADDITION`) {
            console.log(`\t`, `->`, answer.firstNumber + answer.secondNumber);
        }
        else if (answer.operator === `- SUBSTRACTION`) {
            console.log(`\t`, `->`, answer.firstNumber - answer.secondNumber);
        }
        else if (answer.operator === `- MULTIPLICATION`) {
            console.log(`\t`, `->`, answer.firstNumber * answer.secondNumber);
        }
        else if (answer.operator === `- DIVISION`) {
            console.log(`\t`, `->`, answer.firstNumber / answer.secondNumber);
        }
        else if (answer.operator === `- REMAINDER`) {
            console.log(`\t`, `->`, answer.firstNumber % answer.secondNumber);
        }
        else if (answer.operator === `- POWER`) {
            console.log(`\t`, `->`, answer.firstNumber ** answer.secondNumber);
        }
        else {
            chalk.red.underline `Please select valid operator!`;
        }
        // message which appear after complete one function  
        const confirmation_ans = await inquirer.prompt({
            name: `user_confirmation`,
            type: `confirm`,
            message: chalk.yellow.bold(`Do you want to use the calculator more.? `),
        });
        let develporName = chalk.magenta.underline ` BILAL WALEED `;
        if (confirmation_ans.user_confirmation === false) {
            useAnotherOperator = false;
            console.log(chalk.yellow.underline(`\n\t Thanks for using "${userName}", Have a great Day!`));
            console.log(chalk.magenta(`\n\t`, `\t`, `Developer Name: ${develporName}`));
        }
    }
}
simp_cal();
