const RATE_EURO = 0.75;
const RATE_USD = 0.73;
const RATE_CAD = 1;
const RATE_BTC = 0.000036;
const RATE_ETH = 0.000474;


const SYMBOL_EURO = "€";
const SYMBOL_USD = "USD$";
const SYMBOL_CAD = "CAD$";
const SYMBOL_BTC = "$";
const SYMBOL_ETH = "$";

let sourceAmount;
let sourceRate;

function setActiveCurrency(event, currency, section) {
	let inputPrependElement = document.querySelector("#input-prepend-" + section);

	let buttonGroup = document.querySelectorAll("#" + section + " .btn");

	buttonGroup.forEach(function(button) {
		if (button.classList[1] == "btn-success") {
			button.classList.replace("btn-success", "btn-light");
		}
	});

	let buttonCliked = event.target;
	buttonCliked.classList.replace("btn-light", "btn-success");

	switch (currency) {
		case "euro":
			inputPrependElement.innerHTML = SYMBOL_EURO;
			break;
		case "usd":
			inputPrependElement.innerHTML = SYMBOL_USD;
			break;
		case "cad":
			inputPrependElement.innerHTML = SYMBOL_CAD;
			break;
		case "btc":
			inputPrependElement.innerHTML = SYMBOL_BTC;
			break;
		case "eth":
			inputPrependElement.innerHTML = SYMBOL_ETH;
			break;
		
	}
}

function setSourceCurrency(event, currency) {
	setActiveCurrency(event, currency, "source");

	switch (currency) {
		case "euro":
			sourceRate = 1 / RATE_EURO;
			break;
		case "usd":
			sourceRate = 1 / RATE_USD;
			break;
		case "cad":
			sourceRate = 1 / RATE_CAD;
			break;
		case "btc":
			sourceRate = 1 / RATE_BTC;
			break;
		case "eth":
			sourceRate = 1 / RATE_ETH;
			break;
		
	}

	convertAmount();
}

function setTargetCurrency(event, currency) {
	setActiveCurrency(event, currency, "target");
	convertAmount();
}

function convertAmount() {
	if (sourceRate == null) {
		sourceRate = 1;
	}

	let inputTargetElement = document.querySelector("#input-target");

	let sourceAmount = document.querySelector("#input-source").value;
	let targetCurrency = document.querySelector("#target button.btn-success")
		.innerText;
	let targetAmount;

	switch (targetCurrency) {
		case "Canadian Dollar":
    exchangeRate = sourceRate * RATE_CAD;  
    targetAmount = sourceAmount * exchangeRate;
			break;
		case "Euro":
    exchangeRate = sourceRate * RATE_EURO;  
    targetAmount = sourceAmount * exchangeRate;
			break;
		case "Bitcoin":
    exchangeRate = sourceRate * RATE_BTC;  
    targetAmount = sourceAmount * exchangeRate;
			break;
		case "Ethereum":
    exchangeRate = sourceRate * RATE_ETH;  
    targetAmount = sourceAmount * exchangeRate;
			break;
		case "US Dollar":
    exchangeRate = sourceRate * RATE_USD;  
    targetAmount = sourceAmount * exchangeRate;
			break;
	}

	inputTargetElement.value = targetAmount.toFixed(2);

	setExchangeRate(targetCurrency, exchangeRate);
}

function setExchangeRate(targetCurrency, exchangeRate) {
	let sourceCurrency = document.querySelector("#source button.btn-success")
		.innerText;
	let sourceRateElement = document.querySelector("#source-rate");
	let targetRateElement = document.querySelector("#target-rate");

	sourceRateElement.innerHTML = "1 " + sourceCurrency;
	targetRateElement.innerHTML = exchangeRate.toFixed(2) + " " + targetCurrency;
}