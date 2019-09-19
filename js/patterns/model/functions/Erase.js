// Copyright 2015-2017, University of Colorado Boulder

/**
 * Erases the image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBCanvasUtils = require( 'FUNCTION_BUILDER/patterns/model/FBCanvasUtils' );
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const Image = require( 'SCENERY/nodes/Image' );
  const ImageFunction = require( 'FUNCTION_BUILDER/common/model/functions/ImageFunction' );
  const inherit = require( 'PHET_CORE/inherit' );

  // images
  const eraseImage = require( 'mipmap!FUNCTION_BUILDER/functions/erase.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Erase( options ) {

    options = options || {};
    options.name = 'Erase';
    options.fill = 'rgb( 0, 222, 224 )';
    options.invertible = false; // lossy, erased image data cannot be restored

    const iconNode = new Image( eraseImage, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

    ImageFunction.call( this, iconNode, options );
  }

  functionBuilder.register( 'Erase', Erase );

  return inherit( ImageFunction, Erase, {

    /**
     * Applies this function.
     *
     * @param {HTMLCanvasElement} inputCanvas
     * @returns {HTMLCanvasElement}
     * @public
     * @override
     */
    apply: function( inputCanvas ) {

      // blank image data (transparent black pixels), same dimensions as input
      const imageData = inputCanvas.getContext( '2d' ).createImageData( inputCanvas.width, inputCanvas.height );
      return FBCanvasUtils.createCanvasWithImageData( imageData );
    }
  } );
} );
