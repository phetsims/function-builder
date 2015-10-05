// Copyright 2002-2015, University of Colorado Boulder

/**
 * Creates a grayscale image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Card = require( 'FUNCTION_BUILDER/common/model/Card' );
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var grayScaleImage = require( 'mipmap!FUNCTION_BUILDER/functions/grayscale.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Grayscale( options ) {

    options = _.extend( {
      name: 'grayscale',
      image: grayScaleImage,
      fill: 'rgb( 232, 232, 232 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, Grayscale, {

    /**
     * Applies the function.
     * @param {Card} card
     * @returns {Card}
     */
    apply: function( card ) {

      var inputImage = card.image;

      // Create a canvas
      var canvas = document.createElement( 'canvas' );
      canvas.width = inputImage.width;
      canvas.height = inputImage.height;
      var context = canvas.getContext( '2d' );

      // Draw the input image to the canvas
      context.drawImage( inputImage, 0, 0 );

      // Get image data
      var imageData = context.getImageData( 0, 0, canvas.width, canvas.height );

      //TODO see Canvas.globalCompositeOperation for (more efficient?) image filtering, test for browser compatibility
      // Average the red, green and blue values of each pixel. This drains the color from the image.
      var data = imageData.data;
      for ( var i = 0; i < data.length - 4; i += 4 ) {
        var average = ( data[ i ] + data[ i + 1 ] + data[ i + 2 ] ) / 3;
        data[ i ] = average;
        data[ i + 1 ] = average;
        data[ i + 2 ] = average;
      }

      // Draw the modified image data to the canvas.
      context.putImageData( imageData, 0, 0 );

      //TODO pass canvas around in model, each Card has a canvas
      //TODO pass canvas.toDataURL() to scenery.Image in view when time to display it
      //TODO or set Image renderer:webgl and pass it a canvas (doesn't support clipping, would need to try to keep all cards in 1 layer)
      // Convert canvas to HTMLImageElement
      var outputImage = document.createElement( 'img' );
      outputImage.src = canvas.toDataURL();

      var outputName = card.name + '.' + this.name;

      return new Card( outputName, outputImage );
    }
  } );
} );
