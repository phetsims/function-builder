// Copyright 2002-2015, University of Colorado Boulder

/**
 * Shrinks by 75%.
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
  var shrink75Image = require( 'mipmap!FUNCTION_BUILDER/functions/shrink75.png' );

  // constants
  var SCALE = 0.75;

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Shrink75( options ) {

    options = _.extend( {
      name: 'shrink75',
      image: shrink75Image,
      fill: 'rgb( 250, 186, 75 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, Shrink75, {

    apply: function( card ) {

      var inputImage = card.image;

      // Create a canvas
      var canvas = document.createElement( 'canvas' );
      canvas.width = SCALE * inputImage.width;
      canvas.height = SCALE * inputImage.height;
      var context = canvas.getContext( '2d' );

      //TODO or should we use context.scale?
      // Draw the scaled input image to the canvas
      context.drawImage( inputImage, 0, 0, canvas.width, canvas.height );

      // Convert canvas to HTMLImageElement
      var outputImage = document.createElement( 'img' );
      outputImage.src = canvas.toDataURL();

      var outputName = card.name + '.' + this.name;

      return new Card( outputName, outputImage );
    }
  } );
} );
