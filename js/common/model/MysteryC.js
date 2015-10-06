// Copyright 2002-2015, University of Colorado Boulder

/**
 * Reflects about the y-axis and rotates 90 degrees clockwise.
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
  var mysteryCImage = require( 'mipmap!FUNCTION_BUILDER/functions/mysteryC.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MysteryC( options ) {

    options = _.extend( {
      name: 'mysteryC',
      image: mysteryCImage,
      fill: 'rgb( 222, 186, 247 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, MysteryC, {

    apply: function( card ) {

      var inputImage = card.image;

      // Create a canvas
      var canvas = document.createElement( 'canvas' );
      canvas.width = inputImage.height;
      canvas.height = inputImage.width;
      var context = canvas.getContext( '2d' );

      // Reflect about the y axis and rotate 90 degrees
      context.translate( canvas.width, canvas.height );
      context.rotate( Math.PI / 2 );
      context.scale( -1, 1 );

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
