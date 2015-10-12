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
  var mysteryBImage = require( 'mipmap!FUNCTION_BUILDER/functions/mysteryB.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MysteryB( options ) {

    options = _.extend( {
      name: 'mysteryB',
      image: mysteryBImage,
      fill: 'rgb( 249, 144, 99 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, MysteryB, {

    apply: function( card ) {

      // Create the output canvas
      var canvas = this.createCanvas( card.canvas.height, card.canvas.width ); // swap width and height!
      var context = canvas.getContext( '2d' );

      // Reflect about the y axis and rotate 90 degrees
      context.translate( canvas.width, canvas.height );
      context.rotate( Math.PI / 2 );
      context.scale( -1, 1 );

      // Draw the card's canvas to the output canvas
      context.drawImage( card.canvas, 0, 0 );

      return new Card( card.name + '.' + this.name, canvas );
    }
  } );
} );
