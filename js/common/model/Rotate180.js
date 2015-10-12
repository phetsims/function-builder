// Copyright 2002-2015, University of Colorado Boulder

/**
 * Rotates 180 degrees clockwise.
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
  var rotate180Image = require( 'mipmap!FUNCTION_BUILDER/functions/rotate180.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Rotate180( options ) {

    options = _.extend( {
      name: 'rotate180',
      image: rotate180Image,
      fill: 'rgb( 147, 231, 128 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, Rotate180, {

    apply: function( card ) {

      // Create the output canvas
      var canvas = document.createElement( 'canvas' );
      canvas.width = card.canvas.width;
      canvas.height = card.canvas.height;
      var context = canvas.getContext( '2d' );

      // Rotate 180 degrees
      context.translate( canvas.width, canvas.height );
      context.rotate( Math.PI );

      // Draw the card's canvas to the output canvas
      context.drawImage( card.canvas, 0, 0 );

      return new Card( card.name + '.' + this.name, canvas );
    }
  } );
} );
