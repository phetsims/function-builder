// Copyright 2002-2015, University of Colorado Boulder

/**
 * Make the image disappear.
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
  var disappearImage = require( 'mipmap!FUNCTION_BUILDER/functions/disappear.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Disappear( options ) {

    options = _.extend( {
      name: 'disappear',
      image: disappearImage,
      fill: 'rgb( 246, 164, 255 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, Disappear, {

    apply: function( card ) {

      var inputImage = card.image;

      // Create a canvas
      var canvas = document.createElement( 'canvas' );
      canvas.width = inputImage.width;
      canvas.height = inputImage.height;
      var context = canvas.getContext( '2d' );

      //TODO or should this make the image fully transparent? should this function be invertible?
      // Create a new, blank imageData object
      var imageData = context.createImageData( canvas.width, canvas.height );

      // Draw to the canvas.
      context.putImageData( imageData, 0, 0, 0, 0, canvas.width, canvas.height );

      // Convert canvas to HTMLImageElement
      var outputImage = document.createElement( 'img' );
      outputImage.src = canvas.toDataURL();

      var outputName = card.name + '.' + this.name;

      return new Card( outputName, outputImage )
    }

  } );
} );
