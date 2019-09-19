// Copyright 2015-2019, University of Colorado Boulder

/**
 * Shrinks an image.
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
  const Util = require( 'DOT/Util' );

  // images
  const shrinkImage = require( 'mipmap!FUNCTION_BUILDER/functions/shrink.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Shrink( options ) {

    options = _.extend( {
      scale: 0.75
    }, options );
    options.name = 'Shrink';
    options.fill = 'rgb( 246, 164, 255 )';

    assert && assert( options.scale > 0 && options.scale < 1 );
    this.scale = options.scale; // @private

    var iconNode = new Image( shrinkImage, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

    ImageFunction.call( this, iconNode, options );
  }

  functionBuilder.register( 'Shrink', Shrink );

  /**
   * Converts a value to an even integer.
   * @param {number} value
   * @returns {number}
   */
  var toEvenInteger = function( value ) {
    var newValue = Util.roundSymmetric( value );
    if ( newValue % 2 !== 0 ) {
      newValue++;
    }
    return newValue;
  };

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

      // Constrain shrinking to even integer dimensions, to prevent anti-aliasing artifacts.
      // See https://github.com/phetsims/function-builder-basics/issues/18
      var width = toEvenInteger( this.scale * inputCanvas.width );
      var height = toEvenInteger( this.scale * inputCanvas.height );

      // scale by drawing into a smaller canvas
      var outputCanvas = FBCanvasUtils.createCanvas( width, height );
      outputCanvas.getContext( '2d' ).drawImage( inputCanvas, 0, 0, outputCanvas.width, outputCanvas.height );
      return outputCanvas;
    }
  } );
} );
