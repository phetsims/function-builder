// Copyright 2016, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/FunctionBackgroundNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableContainerNode = require( 'FUNCTION_BUILDER/test/view/MovableContainerNode' );

  function ImageFunctionContainerNode( parentNode, options ) {

    options = options || {};

    var functionBackgroundNode = new FunctionBackgroundNode();
    options.size = new Dimension2( functionBackgroundNode.width, functionBackgroundNode.height );

    MovableContainerNode.call( this, parentNode, options );
  }

  return inherit( MovableContainerNode, ImageFunctionContainerNode );
} );
