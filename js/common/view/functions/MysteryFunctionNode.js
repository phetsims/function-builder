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
  var DownUpListener = require( 'SCENERY/input/DownUpListener' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );

  // images
  var lockClosedImage = require( 'image!FUNCTION_BUILDER/lock-closed.png' );
  var lockOpenImage = require( 'image!FUNCTION_BUILDER/lock-open.png' );

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

    //TODO clean up this block of lock stuff, replace setIdentityVisible with a Property
    {
      // @private
      this.lockedNode = new Image( lockClosedImage, {
        visible: !options.identityVisible,
        scale: 0.35,
        left: 0.75 * this.width,
        centerY: this.height / 2
      } );
      this.unlockedNode = new Image( lockOpenImage, {
        visible: options.identityVisible,
        scale: 0.35,
        left: this.lockedNode.left,
        bottom: this.lockedNode.bottom
      } );
      this.addChild( this.lockedNode );
      this.addChild( this.unlockedNode );

      var lockListener = new DownUpListener( {
        down: function() {
          thisNode.identityVisible = !thisNode.identityVisible;
        }
      } );
      this.lockedNode.addInputListener( lockListener );
      this.unlockedNode.addInputListener( lockListener );
      this.lockedNode.touchArea = this.lockedNode.localBounds.dilatedXY( 10, 10 );
      this.unlockedNode.touchArea = this.lockedNode.localBounds.dilatedXY( 10, 10 );
    }

    // synchronize operand with model.
    // unlink unnecessary, instances exist for lifetime of the sim
    functionInstance.operandProperty.link( function( operand ) {
      thisNode.identityNode.text = StringUtils.format( '{0} {1}', functionInstance.operator, operand );
      thisNode.identityNode.center = thisNode.mysteryNode.center;
    } );
  }

  functionBuilder.register( 'MysteryFunctionNode', MysteryFunctionNode );

  return inherit( FunctionNode, MysteryFunctionNode, {

    //TODO animate this transition?
    /**
     * Shows or hides the identify of the function.
     *
     * @param {boolean} visible
     */
    setIdentityVisible: function( visible ) {
      this.mysteryNode.visible = this.lockedNode.visible = !visible;
      this.identityNode.visible = this.unlockedNode.visible = visible;
    },
    set identityVisible( value ) { this.setIdentityVisible( value ); },

    /**
     * Is the function's identity visible?
     *
     * @returns {boolen}
     */
    getIdentityVisible: function() {
      return this.identityNode.visible;
    },
    get identityVisible() { return this.getIdentityVisible(); },

    /**
     * Sets the fill of the function's background.
     *
     * @param {Color|string} fill
     */
    setBackgroundFill: function( fill ) {
      this.backgroundNode.fill = fill;
    },
    set backgroundFill( value ) { this.setBackgroundFill( value ); },

    /**
     * Convenience function for setting the operand of the associated function.
     *
     * @param {number} operand
     */
    setOperand: function( operand ) {
      this.functionInstance.operandProperty.set( operand );
    },
    set operand( value ) { this.setOperand( value ); },

    /**
     * Convenience function for getting the operator of the associated function.
     *
     * @returns {string}
     */
    getOperator: function() {
      return this.functionInstance.operator;
    },
    get operator() { return this.getOperator(); },

    /**
     * Convenience function for determining if the associated function has a specific operator.
     *
     * @param {string} operator
     * @returns {boolean}
     */
    operatorEquals: function( operator ) {
      return this.functionInstance.operator === operator;
    }
  } );
} );
