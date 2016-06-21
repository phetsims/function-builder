// Copyright 2016, University of Colorado Boulder

/**
 * Base type for functions that can hide their identity.
 * The function turns gray and displays a 'close eye' icon.
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
  var Property = require( 'AXON/Property' );

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

    options = _.extend( {
      identityVisible: true, // {boolean} is the function's identity visible?
      hiddenFill: FBColors.HIDDEN_FUNCTION // {null|Color|string} background color when function identity is hidden
    }, options );

    var thisNode = this;

    // @private
    this.identityNode = contentNode;

    // @private
    this.eyeCloseNode = new FontAwesomeNode( 'eye_close', {
      visible: false
    } );
    this.eyeCloseNode.setScaleMagnitude( ( 0.4 * FBConstants.FUNCTION_SIZE.height ) / this.eyeCloseNode.height );
    this.eyeCloseNode.center = this.identityNode.center;

    var decoratedContentNode = new Node( {
      children: [ this.identityNode, this.eyeCloseNode ]
    } );

    FunctionNode.call( this, functionInstance, decoratedContentNode, container, builderNode, dragLayer, options );

    // @public
    this.identityVisibleProperty = new Property( options.identityVisible );
    this.identityVisibleProperty.link( function( identityVisible ) {

      thisNode.identityNode.visible = identityVisible;
      thisNode.eyeCloseNode.visible = !identityVisible;

      if ( options.hiddenFill ) {
        thisNode.backgroundNode.fill = identityVisible ? thisNode.functionInstance.fillProperty.get() : options.hiddenFill;
      }
    } );
  }

  functionBuilder.register( 'HideableFunctionNode', HideableFunctionNode );

  return inherit( FunctionNode, HideableFunctionNode );
} );
