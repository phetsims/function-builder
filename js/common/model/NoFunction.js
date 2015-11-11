// Copyright 2015, University of Colorado Boulder

/**
 * Used to represent the absence of a function, as an alternative to null or undefined.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   */
  function NoFunction( options ) {

    options = _.extend( {
      name: 'noFunction'
    }, options );

    FBFunction.call( this, options );
  }

  functionBuilder.register( 'NoFunction', NoFunction );

  return inherit( FBFunction, NoFunction );
} );
