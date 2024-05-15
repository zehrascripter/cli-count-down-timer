#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import {differenceInSeconds} from "date-fns";

console.log(chalk.magentaBright.italic.bold(`
           ██████╗░██╗░░░██╗███████╗██╗░░░░░███████╗░█████╗░███╗░░░███╗
           ██╔══██╗██║░░░██║██╔════╝██║░░░░░██╔════╝██╔══██╗████╗░████║
           ██████╔╝██║░░░██║█████╗░░██║░░░░░█████╗░░██║░░██║██╔████╔██║
           ██╔═══╝░██║░░░██║██╔══╝░░██║░░░░░██╔══╝░░██║░░██║██║╚██╔╝██║
           ██║░░░░░╚██████╔╝███████╗███████╗███████╗╚█████╔╝██║░╚═╝░██║
           ╚═╝░░░░░░╚═════╝░╚══════╝╚══════╝╚══════╝░╚════╝░╚═╝░░░░░╚═╝
           ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
           `));


let res = await inquirer.prompt([
    {
        name : 'userInput',
        type : 'number',
        message : 'Enter seconds in number',
        validate : (input)=>{
            if(isNaN(input)){
                return 'Enter a valid number'
            }else if(input > 60){
                return 'Enter a number under 60'
            }else{
                return true;
            }
        }
    }
]);

let input = res.userInput;

function startTime(val:number){
    const initialTime = new Date().setSeconds(new Date().getSeconds()+val);
    const intervelTime = new Date(initialTime);
    setInterval((()=>{
        const currentTime = new Date()
        const TimeDiff = differenceInSeconds(intervelTime,currentTime);
        
        if(TimeDiff <= 0){
            console.log(`Time is over`);
            process.exit()
        }
        let minuts = Math.floor((TimeDiff%(3600*24))/3600)
        let secondz = Math.floor(TimeDiff%60)
        console.log(chalk.redBright.italic.bold(`${minuts.toString().padStart(2,'0')}: ${secondz.toString().padStart(2,'0')}`));
        
    }),1000)
}
startTime(input)