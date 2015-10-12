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
      fill: 'rgb( 246, 164, 255 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, Shrink75, {

    apply: function( card ) {

      // Create the output canvas
      var canvas = this.createCanvas( card.canvas.width, card.canvas.height );
      var context = canvas.getContext( '2d' );

      // Scale
      var translationFactor = 0.5 * ( 1 - SCALE );
      context.translate( translationFactor * canvas.width, translationFactor * canvas.height );
      context.scale( SCALE, SCALE );

      // Draw the card's canvas to the output canvas
      context.drawImage( card.canvas, 0, 0 );

      return new Card( card.name + '.' + this.name, canvas );
    }
  } );
} );
