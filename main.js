console.clear();
const fs = require("fs");

let history = fs.readFileSync("./history.json");
history = JSON.parse(history);
let keyArr = Object.keys(history);

const curPrice = 9380;
const athPrice = 19665.39;
const binanceAmount = 0.070;
const realTotal = 0.15987129;

let totalAmount = 0;
let totalBTC = 0;
let totalFees = 0;
let avgPrice = 0;

for (let i = 0; i < keyArr.length; i++) {
    totalAmount += history[keyArr[i]]["amount"];
    totalBTC += history[keyArr[i]]["btcAmount"];
    totalFees += history[keyArr[i]]["fee"];
    avgPrice += history[keyArr[i]]["priceOnPurchase"];
}
avgPrice = avgPrice / keyArr.length;

let totalBtcUsd = Math.round(totalBTC * curPrice * 100) / 100;
let totalBtcAndFutures = Math.round((totalBTC + binanceAmount) * curPrice * 100) / 100;

let realProfit = Math.round((((realTotal + binanceAmount) * curPrice) - totalAmount - totalFees) * 100) / 100;
let profit = Math.round((((totalBTC + binanceAmount) * curPrice) - totalAmount - totalFees) * 100) / 100;

let athProfit = Math.round((((totalBTC + binanceAmount) * athPrice) - totalAmount - totalFees) * 100) / 100;
let realAthProfit = Math.round((((realTotal + binanceAmount) * athPrice) - totalAmount - totalFees) * 100) / 100;

console.log(`
Total BTC: ${totalBTC} BTC
Total BTC w/ Binance Futures: ${totalBTC + binanceAmount} BTC

Amount of BTC in Futures: ${binanceAmount} BTC / $${Math.round(binanceAmount * curPrice * 100) / 100}

Total BTC in USD: $${totalBtcUsd}
Total in USD w/ Binance Futures: $${totalBtcAndFutures}

Real BTC Total: ${realTotal} BTC
Real BTC Total + Futures: ${realTotal + binanceAmount} BTC

Fees: $${Math.round(totalFees * 100) / 100}
Average Purchase Price: $${Math.round(avgPrice * 100) / 100}
Amount Spent: $${totalAmount}

Profit: $${profit} (${Math.round((profit / totalAmount) * 100)}%)
Real Profit: $${realProfit} (${Math.round((realProfit / totalAmount) * 100)}%)

Profit at ATH: $${athProfit} (${Math.round((athProfit / totalAmount) * 100)}%)
Real Profit at ATH: $${realAthProfit} (${Math.round((realAthProfit / totalAmount) * 100)}%)
`);