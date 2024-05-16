
import inquirer from "inquirer";
import chalk from 'chalk'

class Cnc {
  // Class definition with properties
  name: string; // Name of the individual
  fatherName: string; // Father's name
  age: number; // Age 
  cardNo: string; // Card number
  dates: {
    // Nested object for dates
    birthDate: string; // Date of birth
    issueDate: string; // Issue date of the card
    expireDate: string; // Expiry date of the card
  };
  constructor(
    name: string,
    fatherName: string,
    age: number,
    cardNo: string,
    birthData: string,
    issueDate: string,
    expireDate: string
  ) {
    this.name = name;
    this.fatherName = fatherName;
    this.age = age;
    this.cardNo = cardNo;
    this.dates = { // Nested object for dates
      birthDate: birthData,
      issueDate: issueDate,
      expireDate: expireDate
    };
  }

  greet(message: string): void {
    console.log(message);
  }
};
console.log(chalk.bold.italic.bgWhite("\t\t*********************************************************"));
console.log(chalk.italic.bold.yellowBright.bgGreenBright("\t\t\t💎 Welcome to the ID Card Service!!! 💫"));
console.log(chalk.bold.italic.bgGrey("\t\t*********************************************************"));

function idCard() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: chalk.italic.bold.bgYellow("Please enter your name: "),
        
      },
      {
        type: "input",
        name: "fatherName",
        message: chalk.italic.bold.bgCyanBright("Enter Father/'s name: "),
      },

      {
        type: "input",
        name: "age",
        message: chalk.italic.bold.bgRed("Please Enter your age:  "),
        validate: (input: any) => {
          const age = parseInt(input);
          if (age >= 18) {
            return true;
          } else {
            return chalk.italic.magentaBright.redBright( "You must be 18 or older to apply for an ID card.");
          }
        },
      },
      {
        type: "input",
        name: "cardNo",
        message: chalk.italic.bold.bgBlueBright("Please enter your valid card number or B-Form number (with hyphens): ")
      },
      {
        type: "input",
        name: "birthDate",
        message: chalk.italic.bold.bgWhiteBright("Please enter your Date of Birth(YYYY-MM-DD): "),
      },
      {
        type: "input",
        name: "issueDate",
        message: chalk.italic.bold.bgGrey("Please enter your card issue date(YYYY-MM-DD): "),
      },
      {
        type: "input",
        name: "expireDate",
        message: chalk.italic.bold.bgMagentaBright("Please enter your ID Card Expire Date(after 5 year): "),
      },
    ]).then((answer) => {
      const cnc = new Cnc(
        answer.name,
        answer.fatherName,
        parseInt(answer.age),
        answer.cardNo,
        answer.birthDate,
        answer.issueDate,
        answer.expireDate
      );
      cnc.greet(chalk.bgCyan('Thanks for your Positive Response!!!')) // Using the greet method
      console.log(chalk.bold.italic.bgYellowBright("\t\t\tID Card Created SuccessFully!!..."));
      console.log(cnc);
      // If age is under 18, prompt for confirmation to exit.
      if(!answer.age) {
        inquirer.prompt(
          {
          name: 'exit',
          type: 'confirm',
          message: 'Would you like to exit the program.'
        }).then((confirmExit) => {
          if(confirmExit.exit){
            console.log('Exiting!!!');
            process.exit(); 
          }else{
            // Restart the ID card application
            idCard();
          }
        });
      }
    });
}

idCard();

