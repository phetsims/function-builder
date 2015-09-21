// Copyright 2002-2015, University of Colorado Boulder

/**
 * The builder is a function 'pipeline'.
 * Each step in the pipeline is a function that takes 1 input and produces 1 output.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var NoFunction = require( 'FUNCTION_BUILDER/common/model/NoFunction' );
  var Property = require( 'AXON/Property' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Builder( options ) {

    options = _.extend( {
      numberOfFunctions: 1 // {number} number of functions in the pipeline
    }, options );

    // @public (read-only)
    this.numberOfFunctions = options.numberOfFunctions;

    // @public {Property.<FBFunction>[]} - order of this array determines the order that functions are applied
    this.functionProperties = [];
    for ( var i = 0; i < options.numberOfFunctions; i++ ) {
      this.functionProperties.push( new Property( new NoFunction() ) );
    }
  }

  return inherit( Object, Builder, {

    reset: function() {
      this.functionProperties.forEach( function( functionProperty ) {
        functionProperty.reset();
      } );
    }
  } );
} );
