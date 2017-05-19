// Copyright 2015-2016, University of Colorado Boulder

/**
 * Shrinks an image.
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
  var ImageFunction = require( 'FUNCTION_BUILDER/common/model/functions/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Util = require( 'DOT/Util' );

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
    options.name = 'Shrink';
    options.fill = 'rgb( 246, 164, 255 )';

    assert && assert( options.scale > 0 && options.scale < 1 );
    this.scale = options.scale; // @private

    var iconNode = new Image( shrinkImage, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

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

      // Constrain shrinking to even dimensions, to prevent anti-aliasing artifacts.
      // See https://github.com/phetsims/function-builder-basics/issues/18
      var width = Util.roundSymmetric( this.scale * inputCanvas.width );
      if ( width % 2 !== 0 ) {
        width++;
      }
      var height = Util.roundSymmetric( this.scale * inputCanvas.height );
      if ( height % 2 !== 0 ) {
        height++;
      }

      // scale by drawing into a smaller canvas
      var outputCanvas = FBCanvasUtils.createCanvas( width, height );
      outputCanvas.getContext( '2d' ).drawImage( inputCanvas, 0, 0, outputCanvas.width, outputCanvas.height );
      return outputCanvas;
    }
  } );
} );
