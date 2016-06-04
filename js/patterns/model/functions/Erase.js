// Copyright 2015-2016, University of Colorado Boulder

/**
 * Erases the image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBCanvasUtils = require( 'FUNCTION_BUILDER/patterns/model/FBCanvasUtils' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ImageFunction = require( 'FUNCTION_BUILDER/patterns/model/functions/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var eraseImage = require( 'mipmap!FUNCTION_BUILDER/functions/erase.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Erase( options ) {

    options = options || {};
    options.fill = 'rgb( 0, 222, 224 )';
    options.invertible = false; // lossy, erased image data cannot be restored

    var iconNode = new Image( eraseImage, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

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
      var imageData = inputCanvas.getContext( '2d' ).createImageData( inputCanvas.width, inputCanvas.height );
      return FBCanvasUtils.createCanvasWithImageData( imageData );
    }
  } );
} );
