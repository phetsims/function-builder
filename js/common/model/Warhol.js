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
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var warholImage = require( 'mipmap!FUNCTION_BUILDER/functions/warhol.png' );

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
      context.fillStyle = '#FF51E7';
      context.fill();
      context.closePath();

      // Right-top quadrant
      context.beginPath();
      context.rect( canvas.width / 2, 0, canvas.width / 2, canvas.height / 2 );
      context.fillStyle = '#FAFF69';
      context.fill();
      context.closePath();

      // Left-bottom quadrant
      context.beginPath();
      context.rect( 0, canvas.height / 2, canvas.width / 2, canvas.height / 2 );
      context.fillStyle = '#5871FF';
      context.fill();
      context.closePath();

      // Right-bottom quadrant
      context.beginPath();
      context.rect( canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2 );
      context.fillStyle = '#06FFAF';
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
