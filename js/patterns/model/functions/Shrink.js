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

    options = _.extend( {
      scale: 0.75
    }, options );
    
    assert && assert( options.scale > 0 && options.scale < 1 );
    this.scale = options.scale; // @private

    ImageFunction.call( this, new Image( shrinkImage, { scale: FBConstants.FUNCTION_IMAGE_SCALE } ), {
      fill: 'rgb( 246, 164, 255 )'
    } );
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

      // scale by drawing into a smaller canvas
      var outputCanvas = CanvasUtils.createCanvas( this.scale * inputCanvas.width, this.scale * inputCanvas.height );
      outputCanvas.getContext( '2d' ).drawImage( inputCanvas, 0, 0, outputCanvas.width, outputCanvas.height );
      return outputCanvas;
    }
  } );
} );
