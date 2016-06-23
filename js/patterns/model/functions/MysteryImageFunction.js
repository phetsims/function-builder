// Copyright 2016, University of Colorado Boulder

/**
 * Abstract base type for 'mystery' image functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageFunction = require( 'FUNCTION_BUILDER/common/model/functions/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );

  /**
   * @param {string} mysteryString - string that may contain subscripts and superscripts
   * @param {Object} [options]
   * @constructor
   */
  function MysteryImageFunction( mysteryString, options ) {

    var iconNode = new SubSupText( mysteryString, {
      subScale: 0.4, // subscript scale
      font: FBConstants.PATTERNS_FUNCTION_FONT,
      maxWidth: 0.35 * FBConstants.FUNCTION_SIZE.width
    } );

    ImageFunction.call( this, iconNode, options );
  }

  functionBuilder.register( 'MysteryImageFunction', MysteryImageFunction );

  return inherit( ImageFunction, MysteryImageFunction );
} );
