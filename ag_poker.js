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
	var resetButton = document.getElementById('resetB');
	var handValueText = document.getElementById('handValue');
	var betSelection = document.getElementById('bet');
	var bankBox = document.getElementById('bank');
	var cardImages = document.querySelectorAll('img.cardImg');

	// Set the initial values of the pokerGame object
	pokerGame.currentBank = 500;
	pokerGame.currentBet = 25;

	// Create  a new deck of cards and shuffle them
	var myDeck = new pokerDeck();
	myDeck.shuffle();
	// Create a pokerHand object
	var myHand = new pokerHand(5);
	bankBox.value = pokerGame.currentBank;
	// Display the value of current bank
	betSelection.onchange = function (e) {
		pokerGame.currentBet = parseInt(
			e.target.options[e.target.selectedIndex].value
		);
	};
	// disable poker btn
	function disableObj(obj) {
		obj.disabled = true;
		obj.style.opacity = 0.25;
	}
	// enable poker btn
	function enableObj(obj) {
		obj.disabled = false;
		obj.style.opacity = 1;
	}
	// Restart the game btn
	resetButton.addEventListener('click', function () {
		pokerGame.currentBank = 500;
		bankBox.value = pokerGame.currentBank;
		enableObj(dealButton);
		enableObj(betSelection);
		disableObj(drawButton);
		disableObj(standButton);
	});
	// enable the draw and stand btn after the deal
	dealButton.addEventListener('click', function () {
		if (pokerGame.currentBank >= pokerGame.currentBet) {
			disableObj(dealButton);
			disableObj(betSelection);
			enableObj(drawButton);
			enableObj(standButton);
			bankBox.value = pokerGame.placeBet();
			if (myDeck.cards.length < 10) {
				myDeck = new pokerDeck();
				myDeck.shuffle();
			}
			myDeck.dealTo(myHand);
			// Display the card images on the table
			for (var i = 0; i < cardImages.length; i++) {
				cardImages[i].src = myHand.cards[i].cardImage();

				// Event handler for each card image
				cardImages[i].index = i;
				cardImages[i].onclick = function (e) {
					if (e.target.discard !== true) {
						e.target.discard = true;
						e.target.src = 'ag_cardback.png';
					} else {
						e.target.discard = false;
						e.target.src = myHand.cards[e.target.index].cardImage();
					}
				};
			}
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
		// Replace the cards selected for discarding
		for (var i = 0; i < cardImages.length; i++) {
			if (cardImages[i].discard) {
				myHand.cards[i].replaceFromDeck(myDeck);
				cardImages[i].src = myHand.cards[i].cardImage();
				cardImages[i].discard = false;
			}
			cardImages[i].onclick = null;
		}
	});
	standButton.addEventListener('click', function () {
		enableObj(dealButton);
		enableObj(betSelection);
		disableObj(drawButton);
		disableObj(standButton);
	});
}
