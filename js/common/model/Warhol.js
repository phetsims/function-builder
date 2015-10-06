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
      fill: 'rgb( 0, 222, 224 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, Warhol, {

    apply: function( card ) {

      var inputImage = card.image;

      // Create a canvas
      var canvas = document.createElement( 'canvas' );
      canvas.width = inputImage.width;
      canvas.height = inputImage.height;
      var context = canvas.getContext( '2d' );

      // Left-top quadrant
      context.beginPath();
      context.rect( 0, 0, canvas.width / 2, canvas.height / 2 );
      context.fillStyle = LEFT_TOP_COLOR.toCSS();
      context.fill();
      context.closePath();

      // Right-top quadrant
      context.beginPath();
      context.rect( canvas.width / 2, 0, canvas.width / 2, canvas.height / 2 );
      context.fillStyle = RIGHT_TOP_COLOR.toCSS();
      context.fill();
      context.closePath();

      // Left-bottom quadrant
      context.beginPath();
      context.rect( 0, canvas.height / 2, canvas.width / 2, canvas.height / 2 );
      context.fillStyle = LEFT_BOTTOM_COLOR.toCSS();
      context.fill();
      context.closePath();

      // Right-bottom quadrant
      context.beginPath();
      context.rect( canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2 );
      context.fillStyle = RIGHT_BOTTOM_COLOR.toCSS();
      context.fill();
      context.closePath();

      // Convert canvas to HTMLImageElement
      var outputImage = document.createElement( 'img' );
      outputImage.src = canvas.toDataURL();

      var outputName = card.name + '.' + this.name;

      return new Card( outputName, outputImage );
    }
  } );
} );
