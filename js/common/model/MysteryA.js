// Copyright 2002-2015, University of Colorado Boulder

/**
 * Reflects about the x axis.
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

      // Create the output canvas
      var canvas = this.createCanvas( card.canvas.width, card.canvas.height );
      var context = canvas.getContext( '2d' );

      // Reflect about the x axis
      context.translate( 0, canvas.height );
      context.scale( 1, -1 );

      // Draw the card's canvas to the output canvas
      context.drawImage( card.canvas, 0, 0 );

      return new Card( card.name + '.' + this.name, canvas );
    }
  } );
} );
