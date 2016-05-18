// Copyright 2016, University of Colorado Boulder

/**
 * Font used throughout this simulation for math symbols.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  /**
   * @param {number} size - font size
   * @constructor
   */
  function MathSymbolFont( size ) {
    PhetFont.call( this, {
      family: '"Times New Roman", Times, serif',
      style: 'italic',
      size: size
    } );
  }

  functionBuilder.register( 'MathSymbolFont', MathSymbolFont );

  return inherit( PhetFont, MathSymbolFont );
} );
