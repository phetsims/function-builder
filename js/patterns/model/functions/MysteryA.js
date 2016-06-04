// Copyright 2015-2016, University of Colorado Boulder

/**
 * Reflects about the x axis.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBCanvasUtils = require( 'FUNCTION_BUILDER/patterns/model/FBCanvasUtils' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageFunction = require( 'FUNCTION_BUILDER/patterns/model/functions/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );

  // strings
  var mysteryAString = require( 'string!FUNCTION_BUILDER/mysteryA' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MysteryA( options ) {

    options = options || {};
    options.fill = 'rgb( 127, 225, 173 )';

    var iconNode = new SubSupText( mysteryAString, {
      subScale: 0.4,
      font: FBConstants.PATTERNS_FUNCTION_FONT,
      maxWidth: 0.5 * FBConstants.FUNCTION_SIZE.width
    } );

    ImageFunction.call( this, iconNode, options );
  }

  functionBuilder.register( 'MysteryA', MysteryA );

  return inherit( ImageFunction, MysteryA, {

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
      var outputCanvas = FBCanvasUtils.createCanvas( inputCanvas.width, inputCanvas.height );
      var context = outputCanvas.getContext( '2d' );

      // Reflect about the x axis
      context.translate( 0, outputCanvas.height );
      context.scale( 1, -1 );

      // Draw the input canvas to the output canvas
      context.drawImage( inputCanvas, 0, 0 );

      return outputCanvas;
    }
  } );
} );
