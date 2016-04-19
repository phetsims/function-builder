// Copyright 2015-2016, University of Colorado Boulder

/**
 * Erases the image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ImageFunction = require( 'FUNCTION_BUILDER/patterns/model/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var eraseImage = require( 'mipmap!FUNCTION_BUILDER/functions/erase.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Erase( options ) {

    options = _.extend( {}, options, {
      fill: 'rgb( 0, 222, 224 )',
      invertible: false
    } );

    ImageFunction.call( this, new Image( eraseImage ), options );
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
      var imageData = CanvasUtils.createImageData( inputCanvas ); // blank image data, same dimensions as input
      return CanvasUtils.createCanvasWithImageData( imageData );
    }
  } );
} );
