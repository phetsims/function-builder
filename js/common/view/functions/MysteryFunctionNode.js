// Copyright 2016, University of Colorado Boulder

/**
 * Function for the Mystery screen. It adds the following features:
 *
 * - mutable background fill
 * - ability to show/hide the function's identity
 * - convenience functions for mutating and comparing the associated function
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/functions/FunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var mysteryCharacterString = require( 'string!FUNCTION_BUILDER/mysteryCharacter' );

  /**
   * @param {MathFunction} functionInstance
   * @param {FunctionContainer} container - container in the function carousel
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Object} [options]
   * @constructor
   */
  function MysteryFunctionNode( functionInstance, container, builderNode, dragLayer, options ) {

    options = _.extend( {

      // {Node} this node obscures the identity of the function
      mysteryNode: new Text( mysteryCharacterString, {
        font: FBConstants.MYSTERY_FUNCTION_FONT
      } ),

      draggable: false, // {boolean} Mystery functions are not draggable
      hiddenFill: null, // don't change fill color when identity is hidden
      identityVisible: false // {boolean} is the function's identity visible?

    }, options );

    var thisNode = this;

    // @private this node obscures the identity of the function
    this.mysteryNode = options.mysteryNode;
    this.mysteryNode.visible = !options.identityVisible;

    // @private this node reveals the identity of the function
    this.identityNode = new Text( '', {
      font: FBConstants.MYSTERY_FUNCTION_FONT,
      center: options.mysteryNode.center,
      visible: options.identityVisible
    } );

    var contentNode = new Node( {
      children: [ this.mysteryNode, this.identityNode ]
    } );

    FunctionNode.call( this, functionInstance, contentNode, container, builderNode, dragLayer, options );

    // synchronize operand with model.
    // unlink unnecessary, instances exist for lifetime of the sim
    functionInstance.operandProperty.link( function( operand ) {
      thisNode.identityNode.text = StringUtils.format( '{0} {1}', functionInstance.operator, operand );
      thisNode.identityNode.center = thisNode.mysteryNode.center;
    } );

    //TODO copied from HideableFunctionNode
    // @public
    this.identityVisibleProperty = new Property( options.identityVisible );
    this.identityVisibleProperty.link( function( identityVisible ) {

      thisNode.identityNode.visible = identityVisible;
      thisNode.mysteryNode.visible = !identityVisible;

      if ( options.hiddenFill ) {
        thisNode.backgroundNode.fill = identityVisible ? thisNode.functionInstance.fillProperty.get() : options.hiddenFill;
      }
    } );
  }

  functionBuilder.register( 'MysteryFunctionNode', MysteryFunctionNode );

  return inherit( FunctionNode, MysteryFunctionNode );
} );
