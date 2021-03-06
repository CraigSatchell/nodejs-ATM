"use strict";

const { _appName, promptFor, promptPassword, appBanner, pressReturn} = require('./helper');


// get account balance
function getBalance(account, wallet) {
   const holder = account.holder.split(' ')[0];
   console.log(`\n\t\t${holder}, your current account balance is $${account.balance}. You have $${wallet.balance} left in your wallet`);
}

// make cash withdrawal
function withdraw(account, wallet) {
   let amt = promptFor("Enter Withdrawal $ ");
   amt = Number(amt);
   if (amt > 0) {
      if (account.balance - amt >= 0) {
         account.balance -= amt; // withdraw monies from account
         wallet.balance += amt;  // add monies to wallet
         console.log(`\n\t\tYou withdrew: $${amt}`);
      } else {
         console.log('\n\t\tYour request exceeds*** your available account balance.')
      }
   } else {
      console.log('\n\t\tYour entry was invalid. Try Again.');
   }

}

// deposit cash
function deposit(account, wallet) {
   let amt = promptFor("Enter Deposit $ ");
   amt = Number(amt);
   if (amt > 0) {
      if (wallet.balance - amt >= 0) {
         wallet.balance -= amt; // take money from wallet to deposit into account
         account.balance += amt;  // deposit monies into account
         console.log(`\n\t\tYou deposited: $${amt}`);
      } else {
         console.log('\n\t\tYou do not have enough money in your wallet to make deposit.')
      }
   } else {
      console.log('\n\t\tYour entry was invalid. Try Again.');
   }

}


// validate ATM pin
function validatePin(account) {
   let attempts = 0;
   let pin = '';
   while (attempts <= 2) {
      console.clear();
      console.log('\n\n');
      appBanner(account);
      pin = promptPin();

      if (pin !== '') {
         if (pin === account.pin) { // check valid
            return true // set _signedOn = true
         } else {
            pressReturn('Invalid PIN...Try again.');
         }
      }
      attempts++;
   }
   console.log('\n\t\tToo many bad attempts...Good Bye!\n\n');
   return false; // set _signedOn = false
}


// prompt user for pin
function promptPin() {
   console.log('\n');
   return promptPassword('\tPIN: ');
}

function exitATM(account) {
   const holder = account.holder.split(' ')[0];
   console.log(`\n\t\t${holder}, Thanks for choosing ${_appName}...\n\n`)
}


// default exports
module.exports.getBalance = getBalance;
module.exports.deposit = deposit;
module.exports.promptPin = promptPin;
module.exports.validatePin = validatePin;
module.exports.withdraw = withdraw;
module.exports.exitATM = exitATM;