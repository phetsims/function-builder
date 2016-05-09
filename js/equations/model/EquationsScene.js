// Copyright 2016, University of Colorado Boulder

/**
 * A scene in the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Scene = require( 'FUNCTION_BUILDER/common/model/Scene' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function EquationsScene( options ) {

    options = _.extend( {
      cardNumbers: [], // {number[]} numbers on cards
      cardSymbol: null, // {string|null} symbol on a card
      functionOptions: [] // {*[]} options for MathFunction constructors
    }, options );

    // @public (read-only)
    this.cardNumbers = options.cardNumbers;
    this.cardSymbol = options.cardSymbol;
    this.functionOptions = options.functionOptions;

    Scene.call( this, options );
  }

  functionBuilder.register( 'EquationsScene', EquationsScene );

  return inherit( Scene, EquationsScene );
} );
