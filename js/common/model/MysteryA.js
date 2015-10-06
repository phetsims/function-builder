// Copyright 2002-2015, University of Colorado Boulder

/**
 * Chops the image into 4 quadrants and shifts them clockwise.
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
  var mysteryAImage = require( 'mipmap!FUNCTION_BUILDER/functions/mysteryA.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MysteryA( options ) {

    options = _.extend( {
      name: 'mysteryA',
      image: mysteryAImage,
      fill: 'rgb( 127, 225, 173 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, MysteryA, {

    apply: function( card ) {

      var inputImage = card.image;

      // Create a canvas
      var canvas = document.createElement( 'canvas' );
      canvas.width = inputImage.width;
      canvas.height = inputImage.height;
      var context = canvas.getContext( '2d' );

      //TODO should this draw into a canvas of card.size, then shift things around?

      // Divide into 4 quadrants and shifted clockwise
      context.drawImage( inputImage, 0, 0, inputImage.width / 2, inputImage.height / 2, inputImage.width / 2, 0, inputImage.width / 2, inputImage.height / 2 );
      context.drawImage( inputImage, inputImage.width / 2, 0, inputImage.width / 2, inputImage.height / 2, inputImage.width / 2, inputImage.height / 2, inputImage.width / 2, inputImage.height / 2 );
      context.drawImage( inputImage, inputImage.width / 2, inputImage.height / 2, inputImage.width / 2, inputImage.height / 2, 0, inputImage.height / 2, inputImage.width / 2, inputImage.height / 2 );
      context.drawImage( inputImage, 0, inputImage.height / 2, inputImage.width / 2, inputImage.height / 2, 0, 0, inputImage.width / 2, inputImage.height / 2 );

      // Convert canvas to HTMLImageElement
      var outputImage = document.createElement( 'img' );
      outputImage.src = canvas.toDataURL();

      var outputName = card.name + '.' + this.name;

      return new Card( outputName, outputImage );
    }
  } );
} );
