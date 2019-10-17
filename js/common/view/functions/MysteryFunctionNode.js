// Copyright 2016-2019, University of Colorado Boulder

/**
 * Function for the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MathFunctionNode = require( 'FUNCTION_BUILDER/common/view/functions/MathFunctionNode' );
  const merge = require( 'PHET_CORE/merge' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const mysteryCharacterString = require( 'string!FUNCTION_BUILDER/mysteryCharacter' );

  /**
   * @param {MathFunction} functionInstance
   * @param {FunctionContainer} container - container in the function carousel
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Object} [options]
   * @constructor
   */
  function MysteryFunctionNode( functionInstance, container, builderNode, dragLayer, options ) {

    options = merge( {
      size: FBConstants.FUNCTION_SIZE,
      identityVisible: false, // function's identity is not initially visible
      hiddenFill: null, // don't change fill color when identity is hidden
      draggable: false // {boolean} Mystery functions are not draggable
    }, options );

    // Node that is displayed when the function's identity is hidden
    assert && assert( !options.hiddenNode );
    options.hiddenNode = new Text( mysteryCharacterString, {
      font: FBConstants.MYSTERY_FUNCTION_FONT,
      maxWidth: 0.35 * options.size.width,
      maxHeight: 0.9 * options.size.height
    } );

    MathFunctionNode.call( this, functionInstance, container, builderNode, dragLayer, options );
  }

  functionBuilder.register( 'MysteryFunctionNode', MysteryFunctionNode );

  return inherit( MathFunctionNode, MysteryFunctionNode );
} );
