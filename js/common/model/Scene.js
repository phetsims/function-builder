// Copyright 2016, University of Colorado Boulder

/**
 * A scene is a particular configuration of functions, cards, and a builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {*[]} cardContent - content of the cards, type determined by client
   * @param {FunctionCreator[]} functionCreators
   * @param {Builder} builder
   * @param {Object} [options]
   * @constructor
   */
  function Scene( cardContent, functionCreators, builder, options ) {

    options = _.extend( {
      iconNode: null, // {Node|null} icon that represents the scene
      cardSymbol: null, // {string|null} symbolic input card, e.g. 'x'
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

  return inherit( Object, Scene, {

    // @public
    reset: function() {
      //TODO implement Scene.reset
    },

    /**
     * Animates the scene.
     *
     * @param {number} dt - time since the previous step, in seconds
     * @public
     */
    step: function( dt ) {

      // function instances
      for ( var functionIndex = 0; functionIndex < this.functionInstances.length; functionIndex++ ) {
        this.functionInstances[ functionIndex ].step( dt );
      }

      // cards
      for ( var cardIndex = 0; cardIndex < this.cards.length; cardIndex++ ) {
        this.cards[ cardIndex ].step( dt );
      }
    }
  } );
} );
