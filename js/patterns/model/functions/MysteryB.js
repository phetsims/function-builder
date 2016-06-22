// Copyright 2015-2016, University of Colorado Boulder

/**
 * Reflects about the y-axis and rotates 90 degrees clockwise.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBCanvasUtils = require( 'FUNCTION_BUILDER/patterns/model/FBCanvasUtils' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageFunction = require( 'FUNCTION_BUILDER/common/model/functions/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );

  // strings
  var mysteryBString = require( 'string!FUNCTION_BUILDER/mysteryB' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MysteryB( options ) {

    options = options || {};
    options.fill = 'rgb( 249, 144, 99 )';

    var iconNode = new SubSupText( mysteryBString, {
      subScale: 0.4,
      font: FBConstants.PATTERNS_FUNCTION_FONT,
      maxWidth: 0.35 * FBConstants.FUNCTION_SIZE.width
    } );

    ImageFunction.call( this, iconNode, options );
  }

  functionBuilder.register( 'MysteryB', MysteryB );

  return inherit( ImageFunction, MysteryB, {

    /**
     * Applies this function.
     *
     * @param {HTMLCanvasElement} inputCanvas
     * @returns {HTMLCanvasElement}
     * @public
     * @override
     */
    apply: function( inputCanvas ) {

      // Create the output canvas
      var outputCanvas = FBCanvasUtils.createCanvas( inputCanvas.height, inputCanvas.width ); // swap width and height!
      var context = outputCanvas.getContext( '2d' );

      // Reflect about the y axis and rotate 90 degrees
      context.translate( outputCanvas.width, outputCanvas.height );
      context.rotate( Math.PI / 2 );
      context.scale( -1, 1 );

      // Draw the input canvas to the output canvas
      context.drawImage( inputCanvas, 0, 0 );

      return outputCanvas;
    }
  } );
} );
