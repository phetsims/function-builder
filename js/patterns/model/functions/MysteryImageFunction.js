// Copyright 2016-2017, University of Colorado Boulder

/**
 * Abstract base type for 'mystery' image functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const ImageFunction = require( 'FUNCTION_BUILDER/common/model/functions/ImageFunction' );
  const inherit = require( 'PHET_CORE/inherit' );
  const RichText = require( 'SCENERY/nodes/RichText' );

  /**
   * @param {string} mysteryString - string that may contain subscripts and superscripts
   * @param {Object} [options]
   * @constructor
   */
  function MysteryImageFunction( mysteryString, options ) {

    const iconNode = new RichText( mysteryString, {
      subScale: 0.4, // subscript scale
      font: FBConstants.PATTERNS_FUNCTION_FONT,
      maxWidth: 0.35 * FBConstants.FUNCTION_SIZE.width
    } );

    ImageFunction.call( this, iconNode, options );
  }

  functionBuilder.register( 'MysteryImageFunction', MysteryImageFunction );

  return inherit( ImageFunction, MysteryImageFunction );
} );
