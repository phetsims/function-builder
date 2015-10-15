// Copyright 2002-2015, University of Colorado Boulder

/**
 * Creates a mirror image, a reflection about the y axis.
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
  var mirrorImage = require( 'mipmap!FUNCTION_BUILDER/functions/mirror.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Mirror( options ) {

    options = _.extend( {
      name: 'mirror',
      image: mirrorImage,
      fill: 'rgb( 128, 197, 237 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, Mirror, {

    /**
     * Applies this function to a card.
     * @param {Card} card
     * @returns {Card}
     * @public
     * @override
     */
    apply: function( card ) {

      // Create the output canvas
      var canvas = Card.createCanvas( card.canvas.width, card.canvas.height );
      var context = canvas.getContext( '2d' );

      // Reflect about the y axis
      context.translate( canvas.width, 0 );
      context.scale( -1, 1 );

      // Draw the card's canvas to the output canvas
      context.drawImage( card.canvas, 0, 0 );

      return new Card( card.name + '.' + this.name, canvas );
    }
  } );
} );
