// Copyright 2015-2016, University of Colorado Boulder

/**
 * Shrinks an image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ImageFunction = require( 'FUNCTION_BUILDER/patterns/model/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var shrinkImage = require( 'mipmap!FUNCTION_BUILDER/functions/shrink.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Shrink( options ) {

    options = _.extend( {}, options, {
      fill: 'rgb( 246, 164, 255 )',
      scale: 0.75
    } );
    
    assert && assert( options.scale > 0 && options.scale < 1 );
    this.scale = options.scale; // @private

    var iconNode = new Image( shrinkImage, { scale: FBConstants.FUNCTION_IMAGE_SCALE } );

    ImageFunction.call( this, iconNode, options );
  }

  functionBuilder.register( 'Shrink', Shrink );

  return inherit( ImageFunction, Shrink, {

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
      var outputCanvas = CanvasUtils.createCanvas( inputCanvas.width, inputCanvas.height );
      var context = outputCanvas.getContext( '2d' );

      // Scale
      var translationFactor = 0.5 * ( 1 - this.scale );
      context.translate( translationFactor * outputCanvas.width, translationFactor * outputCanvas.height );
      context.scale( this.scale, this.scale );

      // Draw the input canvas to the output canvas
      context.drawImage( inputCanvas, 0, 0 );

      return outputCanvas;
    }
  } );
} );
