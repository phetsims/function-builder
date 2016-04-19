// Copyright 2015-2016, University of Colorado Boulder

/**
 * Reflects about the x axis.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ImageFunction = require( 'FUNCTION_BUILDER/patterns/model/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var aString = require( 'string!FUNCTION_BUILDER/A' );

  // images
  var mysteryAImage = require( 'mipmap!FUNCTION_BUILDER/functions/mysteryA.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MysteryA( options ) {

    options = _.extend( {}, options, {
      fill: 'rgb( 127, 225, 173 )'
    } );

    var imageNode = new Image( mysteryAImage, { scale: FBConstants.FUNCTION_IMAGE_SCALE } );

    var textNode = new Text( aString, {
      font: FBConstants.PATTERNS_FUNCTION_FONT,
      maxWidth: 0.5 * FBConstants.FUNCTION_SIZE.width,
      center: imageNode.center
    } );

    var iconNode = new Node( {
      children: [ imageNode, textNode ]
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
      var outputCanvas = CanvasUtils.createCanvas( inputCanvas.width, inputCanvas.height );
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
