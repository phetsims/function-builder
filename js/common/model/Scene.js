// Copyright 2016, University of Colorado Boulder

/**
 * Base type for scenes.
 * A scene is a particular configuration of functions, cards, and a builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Builder = require( 'FUNCTION_BUILDER/common/model/Builder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Scene( options ) {

    options = _.extend( {
      numberOfEachCard: 2, // {number} number of instances of each card type
      numberOfEachFunction: 2, // {number} number of instances of each function type
      builder: new Builder()
    }, options );

    // @public (read-only)
    this.numberOfEachFunction = options.numberOfEachFunction;
    this.numberOfEachCard = options.numberOfEachCard;
    this.builder = options.builder;

    // @public {ImageCard[]} all cards that exist
    this.cards = [];

    // @public {ImageFunction[]} all function instances that exist
    this.functionInstances = [];
  }

  return inherit( Object, Scene, {

    /**
     * Animates the scene.
     *
     * @param {number} dt - time since the previous step, in seconds
     * @public
     */
    step: function( dt ) {

      // functions
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