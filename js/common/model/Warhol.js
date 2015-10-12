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
   * @param {ImageData} source
   * @param {ImageData} destination
   * @param {Color} foregroundColor
   * @param {Color} backgroundColor
   * @returns {ImageData}
   */
  function getQuadrantImageData( source, destination, foregroundColor, backgroundColor ) {
    for ( var i = 0; i < destination.data.length - 4; i += 4 ) {
      if ( source.data[ i + 3 ] === 0 ) {
        // transparent pixel -> background color
        destination.data[ i ] = backgroundColor.red;
        destination.data[ i + 1 ] = backgroundColor.green;
        destination.data[ i + 2 ] = backgroundColor.blue;
        destination.data[ i + 3 ] = 255;
      }
      else {
        // non-transparent pixel -> foreground color
        destination.data[ i ] = foregroundColor.red;
        destination.data[ i + 1 ] = foregroundColor.green;
        destination.data[ i + 2 ] = foregroundColor.blue;
        destination.data[ i + 3 ] = 255;
      }
    }
    return destination;
  }

  return inherit( FBFunction, Warhol, {

    apply: function( card ) {

      //TODO can this be done with 1 canvas?
      // Draw the card's canvas into a half-size canvas
      var halfCanvas = this.createCanvas( card.canvas.width / 2, card.canvas.height / 2 );
      var halfContext = halfCanvas.getContext( '2d' );
      halfContext.drawImage( card.canvas, 0, 0, halfCanvas.width, halfCanvas.height );
      var imageData = halfContext.getImageData( 0, 0, halfCanvas.width, halfCanvas.height );

      // Create the output canvas
      var canvas = this.createCanvas( card.canvas.width, card.canvas.height );
      var context = canvas.getContext( '2d' );

      // Data to hold monochromatic image data
      var monoData = context.createImageData( halfCanvas.width, halfCanvas.height );
      assert && assert( imageData.data.length === monoData.data.length );

      // Left-top quadrant
      context.putImageData( getQuadrantImageData( imageData, monoData, RIGHT_BOTTOM_COLOR, LEFT_TOP_COLOR ),
        0, 0, 0, 0, canvas.width / 2, canvas.height / 2 );

      // Right-top quadrant
      context.putImageData( getQuadrantImageData( imageData, monoData, LEFT_BOTTOM_COLOR, RIGHT_TOP_COLOR ),
        canvas.width / 2, 0, 0, 0, canvas.width / 2, canvas.height / 2 );

      // Left-bottom quadrant
      context.putImageData( getQuadrantImageData( imageData, monoData, RIGHT_TOP_COLOR, LEFT_BOTTOM_COLOR ),
        0, canvas.height / 2, 0, 0, canvas.width / 2, canvas.height / 2 );

      // Right-bottom quadrant
      context.putImageData( getQuadrantImageData( imageData, monoData, LEFT_TOP_COLOR, RIGHT_BOTTOM_COLOR ),
        canvas.width / 2, canvas.height / 2, 0, 0, canvas.width / 2, canvas.height / 2 );

      return new Card( card.name + '.' + this.name, canvas );
    }
  } );
} );
