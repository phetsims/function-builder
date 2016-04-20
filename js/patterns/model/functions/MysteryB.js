// Copyright 2015-2016, University of Colorado Boulder

/**
 * Reflects about the y-axis and rotates 90 degrees clockwise.
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
  var bString = require( 'string!FUNCTION_BUILDER/B' );

  // images
  var mysteryBImage = require( 'mipmap!FUNCTION_BUILDER/functions/mysteryB.png' );

  /**
   * @constructor
   */
  function MysteryB() {

    var imageNode = new Image( mysteryBImage, { scale: FBConstants.FUNCTION_IMAGE_SCALE } );

    var textNode = new Text( bString, {
      font: FBConstants.IMAGE_FUNCTION_FONT,
      maxWidth: 0.5 * FBConstants.FUNCTION_SIZE.width,
      center: imageNode.center
    } );

    var iconNode = new Node( {
      children: [ imageNode, textNode ]
    } );

    ImageFunction.call( this, iconNode, {
      fill: 'rgb( 249, 144, 99 )'
    } );
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
      var outputCanvas = CanvasUtils.createCanvas( inputCanvas.height, inputCanvas.width ); // swap width and height!
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
