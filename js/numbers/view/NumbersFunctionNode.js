// Copyright 2016, University of Colorado Boulder

/**
 * Node that displays a function in the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathFunction = require( 'FUNCTION_BUILDER/common/model/MathFunction' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {MathFunction} functionInstance
   * @param {FunctionContainer} container - container in the function carousel
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Object} [options]
   * @constructor
   */
  function NumbersFunctionNode( functionInstance, container, builderNode, dragLayer, options ) {

    assert && assert( functionInstance instanceof MathFunction, 'unexpected type: ' + functionInstance.constructor.name );

    var labelString = StringUtils.format( '{0} {1}',
      functionInstance.operatorString, functionInstance.operandProperty.get() );

    var contentNode = new Text( labelString, {
      font: FBConstants.NUMBERS_FUNCTION_FONT
    } );

    FunctionNode.call( this, functionInstance, contentNode, container, builderNode, dragLayer, options );
  }

  functionBuilder.register( 'NumbersFunctionNode', NumbersFunctionNode );

  return inherit( FunctionNode, NumbersFunctionNode );
} );