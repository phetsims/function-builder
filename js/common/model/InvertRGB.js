// Copyright 2002-2015, University of Colorado Boulder

/**
 * Inverts colors in RGB color space.
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
  var invertRGBImage = require( 'mipmap!FUNCTION_BUILDER/functions/invertRGB.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function InvertRGB( options ) {

    options = _.extend( {
      name: 'invertRGB',
      image: invertRGBImage,
      fill: 'black'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, InvertRGB, {

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

      // invert colors
      var data = imageData.data;
      for ( var i = 0; i < data.length; i += 4 ) {
        data[ i ] = 255 - data[ i ];
        data[ i + 1 ] = 255 - data[ i + 1 ];
        data[ i + 2 ] = 255 - data[ i + 2 ];
        data[ i + 3 ] = 255;
      }

      // Draw the modified image data to the canvas.
      context.putImageData( imageData, 0, 0, 0, 0, canvas.width, canvas.height );

      //TODO pass canvas around in model, each Card has a canvas
      //TODO pass canvas.toDataURL() to scenery.Image in view when time to display it
      //TODO or set Image renderer:webgl and pass it a canvas (doesn't support clipping, would need to try to keep all cards in 1 layer)
      // Convert canvas to HTMLImageElement
      var outputImage = document.createElement( 'img' );
      outputImage.src = canvas.toDataURL();

      //TODO for now, append the function name, so that we can track what functions have been applied to a card
      var outputName = card.name + '.' + this.name;

      return new Card( outputName, outputImage );
    }
  } );
} );
