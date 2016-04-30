// Copyright 2016, University of Colorado Boulder

/**
 * Function whose identity is hidden. Gray with a 'closed eye' icon.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/FunctionBackgroundNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function HiddenFunctionNode( options ) {

    options = _.extend( {
      lineWidth: 1
    }, options );

    var functionNode = new FunctionBackgroundNode( {
      fill: FBColors.HIDDEN_FUNCTION,
      lineWidth: options.lineWidth
    } );

    var closedEyeNode = new FontAwesomeNode( 'eye_close' );

    closedEyeNode.setScaleMagnitude( ( 0.65 * functionNode.height ) / closedEyeNode.height );
    closedEyeNode.center = functionNode.center;

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ functionNode, closedEyeNode ];

    Node.call( this, options );
  }

  functionBuilder.register( 'HiddenFunctionNode', HiddenFunctionNode );

  return inherit( Node, HiddenFunctionNode );
} );
