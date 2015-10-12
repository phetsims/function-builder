// Copyright 2002-2015, University of Colorado Boulder

/**
 * Creates a 2x2 grid of the input card, using 4 colors (#FF51E7, #06FFAF, #FAFF69, #5871FF).
 * All non-transparent pixels in the input are mapped to one of the 4 colors. Each background is one of the 4 colors.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Card = require( 'FUNCTION_BUILDER/common/model/Card' );
  var Color = require( 'SCENERY/util/Color' );
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var warholImage = require( 'mipmap!FUNCTION_BUILDER/functions/warhol.png' );

  // constants
  var LEFT_TOP_COLOR = new Color( 255, 81, 231 );
  var RIGHT_TOP_COLOR = new Color( 250, 255, 105 );
  var LEFT_BOTTOM_COLOR = new Color( 88, 113, 255 );
  var RIGHT_BOTTOM_COLOR = new Color( 6, 255, 175 );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Warhol( options ) {

    options = _.extend( {
      name: 'warhol',
      image: warholImage,
      fill: 'rgb( 250, 186, 75 )'
    }, options );

    FBFunction.call( this, options );
  }

  /**
   * Gets image data for 1 quadrant of the Warhol image.
   * @param {ImageData} inputData
   * @param {ImageData} outputData
   * @param {Color} foregroundColor
   * @param {Color} backgroundColor
   * @returns {ImageData}
   */
  function getQuadrantImageData( inputData, outputData, foregroundColor, backgroundColor ) {

    assert && assert( inputData.data.length === outputData.data.length );

    // for each pixel ...
    for ( var i = 0; i < outputData.data.length - 4; i += 4 ) {
      if ( inputData.data[ i + 3 ] === 0 ) {

        // transparent pixel -> background color
        outputData.data[ i ] = backgroundColor.red;
        outputData.data[ i + 1 ] = backgroundColor.green;
        outputData.data[ i + 2 ] = backgroundColor.blue;
      }
      else {

        // non-transparent pixel -> foreground color
        outputData.data[ i ] = foregroundColor.red;
        outputData.data[ i + 1 ] = foregroundColor.green;
        outputData.data[ i + 2 ] = foregroundColor.blue;
      }

      // in both cases, opaque pixel
      outputData.data[ i + 3 ] = 255;
    }
    return outputData;
  }

  return inherit( FBFunction, Warhol, {

    apply: function( card ) {

      // Draw the card into a half-size canvas, effectively scaling by 50%
      var halfCanvas = this.createCanvas( card.canvas.width / 2, card.canvas.height / 2 );
      var halfContext = halfCanvas.getContext( '2d' );
      halfContext.drawImage( card.canvas, 0, 0, halfCanvas.width, halfCanvas.height );

      // Input and output image data
      var imageData = halfContext.getImageData( 0, 0, halfCanvas.width, halfCanvas.height );
      var outputData = halfContext.createImageData( halfCanvas.width, halfCanvas.height );

      // Create the output canvas
      var canvas = this.createCanvas( card.canvas.width, card.canvas.height );
      var context = canvas.getContext( '2d' );

      // Left-top quadrant
      context.putImageData( getQuadrantImageData( imageData, outputData, RIGHT_BOTTOM_COLOR, LEFT_TOP_COLOR ),
        0, 0, 0, 0, canvas.width / 2, canvas.height / 2 );

      // Right-top quadrant
      context.putImageData( getQuadrantImageData( imageData, outputData, LEFT_BOTTOM_COLOR, RIGHT_TOP_COLOR ),
        canvas.width / 2, 0, 0, 0, canvas.width / 2, canvas.height / 2 );

      // Left-bottom quadrant
      context.putImageData( getQuadrantImageData( imageData, outputData, RIGHT_TOP_COLOR, LEFT_BOTTOM_COLOR ),
        0, canvas.height / 2, 0, 0, canvas.width / 2, canvas.height / 2 );

      // Right-bottom quadrant
      context.putImageData( getQuadrantImageData( imageData, outputData, LEFT_TOP_COLOR, RIGHT_BOTTOM_COLOR ),
        canvas.width / 2, canvas.height / 2, 0, 0, canvas.width / 2, canvas.height / 2 );

      return new Card( card.name + '.' + this.name, canvas );
    }
  } );
} );
