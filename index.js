#!/usr/bin/env node
'use strict';

import clear from 'clear';
import boxen from 'boxen';
import hyperlinker from 'hyperlinker'
import chalk from 'chalk';
import inquirer from 'inquirer';
import open from 'open';
import clipboardy from "clipboardy";


const data = {
    name: "@Jude C. Lopez",
    github_username: "ExoticBubble15",
    github_link: "https://github.com/exoticbubble15",
    linkedin_username: "judecl",
    linkedin_link: "https://linkedin.com/in/judecl/",
    email: "cjudelopez@gmail.com",
    phone: "(818)984-7026",
    resume_link: "https://github.com/ExoticBubble15/resume/blob/main/Jude_Lopez_Resume.pdf"
}

const card = boxen (
    [
    hyperlinker(`${chalk.dim("linkedin:")} ${chalk.bold(data.linkedin_username)}`, `${data.linkedin_link}`),
    hyperlinker(`${chalk.dim("github:")} ${chalk.bold(data.github_username)}`, `${data.github_link}`),
    ``,
    `${chalk.dim("email:")} ${chalk.white(data.email)}`,
    `${chalk.dim("phone:")} ${chalk.white(data.phone)}`,
    ].join("\n"),
    {title: chalk.bold.cyan(data.name), titleAlignment: "center",
    padding: 1, borderStyle:"double"}
);

function contactOptions() {
    inquirer.prompt(
        [{
        name: "action",
        message: "what would you like to do?",
        type: "list",
        choices: [
            "- send me an email",
            "- copy email to clipboard",
            "- copy phone number to keyboard",
            "-> exit"
        ]
        }]
    )
    .then(function (response) {
        switch (response.action) {
            case "- send me an email":
                open(`https://mail.google.com/mail/?view=cm&fs=1&to=${data.email}`)
                main("composing new email draft...");
                return
            case "- copy email to clipboard":
                clipboardy.writeSync(`${data.email}`)
                main(`'${data.email}' copied to clipboard`);
                return
            case "- copy phone number to keyboard":
                clipboardy.writeSync(`${data.phone}`)
                main(`'${data.phone}' copied to clipboard`);
                return
            case "-> exit":
                main();
                return
        }
    });
}

function main(opening_message = "") {
    clear()
    console.log(card)
    if (opening_message != "") {
        console.log(opening_message)
    }
    inquirer.prompt(
        [{
        name: "option",
        message: "select an option",
        type: "list",
        choices: [
            "| resume",
            "| linkedin",
            "| github",
            ">> contact me",
            "-> exit"]
        }]
    )
    .then(function (response) {
        switch (response.option) {
            case "| resume":
                open(`${data.resume_link}`)
                main("opening resume...");
                return
            case "| linkedin":
                open(`${data.linkedin_link}`)
                main("opening linkedin profile...");
                return
            case "| github":
                open(`${data.github_link}`)
                main("opening github profile...");
                return
            case ">> contact me":
                console.log(`email: ${data.email}`)
                console.log(`phone: ${data.phone}`)
                contactOptions();
                return
            case "-> exit":
                console.log("thank you for visiting!")
                return
        }
    });
}

main();