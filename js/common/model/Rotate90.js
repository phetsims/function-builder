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

    /**
     * Applies this function to a card.
     * @param {Card} card
     * @returns {Card}
     */
    apply: function( card ) {

      // Create the output canvas
      var canvas = this.createCanvas( card.canvas.height, card.canvas.width ); // swap width and height!
      var context = canvas.getContext( '2d' );

      // Rotate 90 degrees
      context.translate( canvas.width, 0 );
      context.rotate( Math.PI / 2 );

      // Draw the card's canvas to the output canvas
      context.drawImage( card.canvas, 0, 0 );

      return new Card( card.name + '.' + this.name, canvas );
    }

  } );
} );
