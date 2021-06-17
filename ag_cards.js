'use strict';

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 14
   Tutorial Case

Author: Ian Jones
   Date:   6/16/21

   Filename: ag_cards.js


   Custom Object Classes
   
   pokerGame
      The pokerGame object contains properties and methods for the game
      of draw poker

   pokerDeck
      The pokerDeck object contains an array of poker cards and methods
      for shuffling and drawing cards from the deck.

   pokerHand
      The pokerHand object contains an array of poker cards drawn from a
      poker deck. The methods associated with the object include the ability 
      to calculate the value of the hand and to mark cards to be discarded,
      replaced with new cards from a poker deck.

   pokerCard
      The pokerCard object contains properties and methods associated with
      individual poker cards including the card rank, suit, and value.
   
	
*/

// The pokerGame object
var pokerGame = {
	currentBank: null,
	currentBet: null,

	placeBet: function () {
		this.currentBank -= this.currentBet;
		return this.currentBank;
	},
};

// Constructor function for poker cards
function pokerCard(cardsSuit, cardRank) {
	this.suit = cardsSuit;
	this.rank = cardRank;
	this.rankValue = null;
}
