'use strict';

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 14
   Tutorial Case

   Author: Ian Jones
   Date:   6/16/21
   
   Filename: ag_poker.js

*/

// Begin playDrawPoker function
window.addEventListener('load', playDrawPoker);

function playDrawPoker() {
	var dealButton = document.getElementById('dealB');
	var drawButton = document.getElementById('drawB');
	var standButton = document.getElementById('standB');
	var resetButton = document.getElementById('restB');
	var handValueText = document.getElementById('handValue');
	var betSelection = document.getElementById('bet');
	var bankBox = document.getElementById('bank');

	// Set the initial values of the pokerGame object
	pokerGame.currentBank = 500;
	pokerGame.currentBet = 25;

	bankBox.value = pokerGame.currentBank;
	// Display the value of current bank
	betSelection.onchange = function (e) {
		pokerGame.currentBet = parseInt(
			e.target.options[e.target.selectedIndex].value
		);
	};
	// disable poker btn
	function disableObj(obj) {
		obj.disable = true;
		obj.style.opacity = 0.25;
	}
	// enable poker btn
	function enableObj(obj) {
		obj.disable = false;
		obj.style.opacity = 1;
	}
	// enable the draw and stand btn after the deal
	dealButton.addEventListener('click', function () {
		if (pokerGame.currentBank >= pokerGame.currentBet) {
			disableObj(dealButton);
			disableObj(betSelection);
			enableObj(drawButton);
			enableObj(standButton);
			bankBox.value = pokerGame.placeBet();
		} else {
			alert('Reduce the size of your bet');
		}
	});
	// enable the deal and bet options when the current hands ends
	drawButton.addEventListener('click', function () {
		enableObj(dealButton);
		enableObj(betSelection);
		disableObj(drawButton);
		disableObj(standButton);
	});
	standButton.addEventListener('click', function () {
		enableObj(dealButton);
		enableObj(betSelection);
		disableObj(drawButton);
		disableObj(standButton);
	});
}
