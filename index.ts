#! /usr/bin/env node

import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";

let user_ans = await inquirer.prompt(
    
    [
        {
            name: "user_Input",
            type: "number",
            message: "Enter the amount of seconds",
            validate: (input) => {
                if(isNaN(input)){
                    return "Please enter a valid number"
                } else if (input > 60){
                    return "Seconds must be in 60"

                } else {
                    return true;
                }
            }

        }
    ]
);

let input = user_ans.user_Input

function startTime(value:number){
    let initiatlTime = new Date().setSeconds(new Date().getSeconds() + value)
    let intervalTime = new Date(initiatlTime)

    setInterval((() => {
        let currentTime = new Date()
        let timeDiff = differenceInSeconds(intervalTime, currentTime );

        if(timeDiff <= 0){
            console.log("Time has expired");  
            process.exit()

        }

        let min = Math.floor((timeDiff%(3600 * 24))/ 3600);
        let sec = Math.floor(timeDiff%60);

        console.log(`${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`);
        

    }), 1000)
}


startTime(input)