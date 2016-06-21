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
      identityVisible: false, // function's identity is not initially visible
      hiddenNode: new Text( mysteryCharacterString, { font: FBConstants.MYSTERY_FUNCTION_FONT } ), // '?'
      hiddenFill: null, // don't change fill color when identity is hidden
      draggable: false // {boolean} Mystery functions are not draggable
    }, options );

    var thisNode = this;

    // @private updated by operandProperty observer
    var contentNode = new Text( '', {
      font: FBConstants.MYSTERY_FUNCTION_FONT
    } );

    FunctionNode.call( this, functionInstance, contentNode, container, builderNode, dragLayer, options );

    // synchronize operand with model.
    // unlink unnecessary, instances exist for lifetime of the sim
    functionInstance.operandProperty.link( function( operand ) {
      contentNode.text = StringUtils.format( '{0} {1}', functionInstance.operator, operand );
      contentNode.center = thisNode.backgroundNode.center;
    } );
  }

  functionBuilder.register( 'MysteryFunctionNode', MysteryFunctionNode );

  return inherit( FunctionNode, MysteryFunctionNode );
} );
