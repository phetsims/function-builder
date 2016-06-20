// Copyright 2016, University of Colorado Boulder

/**
 * Function that can hide its identity, replaces with a 'close eye' icon.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/functions/FunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @param {ImageFunction} functionInstance
   * @param {Node} contentNode - content that appears on the function, specific to functionInstance
   * @param {FunctionContainer} container - container in the function carousel
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Object} [options]
   * @constructor
   */
  function HideableFunctionNode( functionInstance, contentNode, container, builderNode, dragLayer, options ) {

    // @private
    this.identityNode = contentNode;

    // @private
    this.eyeCloseNode = new FontAwesomeNode( 'eye_close', {
      visible: false
    } );
    this.eyeCloseNode.setScaleMagnitude( ( 0.4 * FBConstants.FUNCTION_SIZE.height ) / this.eyeCloseNode.height );
    this.eyeCloseNode.center = contentNode.center;

    var decoratedContentNode = new Node( {
       children: [ contentNode, this.eyeCloseNode ]
    } );

    FunctionNode.call( this, functionInstance, decoratedContentNode, container, builderNode, dragLayer, options );
  }

  functionBuilder.register( 'HideableFunctionNode', HideableFunctionNode );

  return inherit( FunctionNode, HideableFunctionNode, {

    /**
     * Hides the identity of this function by changing its background to gray and
     * replacing its content with 'eye close' icon.
     *
     * @param {boolean} hidden
     * @public
     */
    setIdentityHidden: function( hidden ) {
      this.identityNode.visible = !hidden;
      this.eyeCloseNode.visible = hidden;
      this.backgroundNode.fill = hidden ? FBColors.HIDDEN_FUNCTION : this.functionInstance.viewOptions.fill;
    }
  } );
} );
