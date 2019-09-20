// Copyright 2015-2019, University of Colorado Boulder

/**
 * Creates a mirror image, a reflection about the y axis.
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
  const mirrorImage = require( 'mipmap!FUNCTION_BUILDER/functions/mirror.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Mirror( options ) {

    options = options || {};
    options.name = 'Mirror';
    options.fill = 'rgb( 128, 197, 237 )';

    const iconNode = new Image( mirrorImage, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

    ImageFunction.call( this, iconNode, options );
  }

  functionBuilder.register( 'Mirror', Mirror );

  return inherit( ImageFunction, Mirror, {

    /**
     * Applies this function.
     *
     * @param {HTMLCanvasElement} inputCanvas
     * @returns {HTMLCanvasElement}
     * @public
     * @override
     */
    apply: function( inputCanvas ) {

      // Create the output canvas
      const outputCanvas = FBCanvasUtils.createCanvas( inputCanvas.width, inputCanvas.height );
      const context = outputCanvas.getContext( '2d' );

      // Reflect about the y axis
      context.translate( outputCanvas.width, 0 );
      context.scale( -1, 1 );

      // Draw the input canvas to the output canvas
      context.drawImage( inputCanvas, 0, 0 );

      return outputCanvas;
    }
  } );
} );
