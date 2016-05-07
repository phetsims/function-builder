// Copyright 2016, University of Colorado Boulder

/**
 * A scene that involves mathematical functions.
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
  function MathScene( options ) {

    options = _.extend( {
      cardNumbers: [], // {number[]} numbers on cards
      cardSymbols: [], // {string[]} symbols on cards
      functionData: [] // {*[]} data structures for creating MathFunction instances
    }, options );

    // @public (read-only)
    this.cardNumbers = options.cardNumbers;
    this.cardSymbols = options.cardSymbols;
    this.functionData = options.functionData;

    Scene.call( this, options );
  }

  functionBuilder.register( 'MathScene', MathScene );

  return inherit( Scene, MathScene );
} );
