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

      // Divide into 4 quadrants and shifted clockwise
      var inputCanvas = card.canvas;
      context.drawImage( inputCanvas, 0, 0, inputCanvas.width / 2, inputCanvas.height / 2, inputCanvas.width / 2, 0, inputCanvas.width / 2, inputCanvas.height / 2 );
      context.drawImage( inputCanvas, inputCanvas.width / 2, 0, inputCanvas.width / 2, inputCanvas.height / 2, inputCanvas.width / 2, inputCanvas.height / 2, inputCanvas.width / 2, inputCanvas.height / 2 );
      context.drawImage( inputCanvas, inputCanvas.width / 2, inputCanvas.height / 2, inputCanvas.width / 2, inputCanvas.height / 2, 0, inputCanvas.height / 2, inputCanvas.width / 2, inputCanvas.height / 2 );
      context.drawImage( inputCanvas, 0, inputCanvas.height / 2, inputCanvas.width / 2, inputCanvas.height / 2, 0, 0, inputCanvas.width / 2, inputCanvas.height / 2 );

      return new Card( card.name + '.' + this.name, canvas );
    }
  } );
} );
