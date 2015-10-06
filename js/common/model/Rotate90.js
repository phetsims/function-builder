// Copyright 2002-2015, University of Colorado Boulder

/**
 * Rotates 90 degrees clockwise.
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
  var rotate90Image = require( 'mipmap!FUNCTION_BUILDER/functions/rotate90.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Rotate90( options ) {

    options = _.extend( {
      name: 'rotate90',
      image: rotate90Image,
      fill: 'rgb( 147, 231, 128 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, Rotate90, {

    apply: function( card ) {

      var inputImage = card.image;

      // Create a canvas
      var canvas = document.createElement( 'canvas' );
      canvas.width = inputImage.height; // swap width and height!
      canvas.height = inputImage.width;
      var context = canvas.getContext( '2d' );

      // Rotate 90 degrees
      context.translate( canvas.width, 0 );
      context.rotate( Math.PI / 2 );

      // Draw the input image to the canvas
      context.drawImage( inputImage, 0, 0 );

      // Convert canvas to HTMLImageElement
      var outputImage = document.createElement( 'img' );
      outputImage.src = canvas.toDataURL();

      var outputName = card.name + '.' + this.name;

      return new Card( outputName, outputImage );
    }

  } );
} );
