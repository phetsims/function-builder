// Copyright 2016-2020, University of Colorado Boulder

/**
 * A scene is a particular configuration of functions, cards, and a builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import functionBuilder from '../../functionBuilder.js';
import FBConstants from '../FBConstants.js';

/**
 * @param {*[]} cardContent - content that will appear on card, type determined by client
 * @param {FunctionCreator[]} functionCreators - describes how to create functions
 * @param {Builder} builder
 * @param {Object} [options]
 * @constructor
 */
function Scene( cardContent, functionCreators, builder, options ) {

  options = merge( {
    iconNode: null, // {Node|null} icon that represents the scene
    cardSymbol: null, // {string|null} symbolic input card (e.g. 'x') added to end of card carousel
    numberOfEachCard: 1, // {number} number of instances of each card type
    numberOfEachFunction: 1 // {number} number of instances of each function type
  }, options );

  // validate options
  assert && assert( options.numberOfEachCard > 0 );
  assert && assert( options.numberOfEachFunction > 0 );

  // @public (read-only)
  this.iconNode = options.iconNode;
  this.cardContent = cardContent;
  this.cardSymbol = options.cardSymbol;
  this.numberOfEachCard = options.numberOfEachCard;
  this.functionCreators = functionCreators;
  this.numberOfEachFunction = options.numberOfEachFunction;
  this.builder = builder;

  // @public {Card[]} all cards that exist
  this.cards = [];

  // @public {AbstractFunction[]} all function instances that exist
  this.functionInstances = [];
}

functionBuilder.register( 'Scene', Scene );

export default inherit( Object, Scene, {

  // @public
  reset: function() {

    // function instances
    for ( let functionIndex = 0; functionIndex < this.functionInstances.length; functionIndex++ ) {
      this.functionInstances[ functionIndex ].reset();
    }

    // cards
    for ( let cardIndex = 0; cardIndex < this.cards.length; cardIndex++ ) {
      this.cards[ cardIndex ].reset();
    }
  },

  /**
   * Animates the scene.
   *
   * @param {number} dt - time since the previous step, in seconds
   * @public
   */
  step: function( dt ) {

    // function instances
    for ( let functionIndex = 0; functionIndex < this.functionInstances.length; functionIndex++ ) {
      this.functionInstances[ functionIndex ].step( dt );
    }

    // cards
    for ( let cardIndex = 0; cardIndex < this.cards.length; cardIndex++ ) {
      this.cards[ cardIndex ].step( dt );
    }
  }
}, {

  /**
   * Computes the builder width for the specified number of slots.
   * Constants determined empirically.
   * @param {number} numberOfSlots
   * @returns {number}
   * @public
   * @static
   */
  computeBuilderWidth: function( numberOfSlots ) {
    if ( numberOfSlots === 1 ) {

      // use a bit of extra padding for single slot
      return FBConstants.FUNCTION_SIZE.width + 200;
    }
    else {
      return ( numberOfSlots * FBConstants.FUNCTION_SIZE.width ) + 70;
    }
  }
} );