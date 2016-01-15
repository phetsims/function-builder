// Copyright 2015-2016, University of Colorado Boulder

/**
 * For each type of function, an instance of this node is placed in the functions carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableCreatorNode = require( 'FUNCTION_BUILDER/common/view/MovableCreatorNode' );

  /**
   * @param {function} createFunction - function called to create an {AbstractFunction}
   * @param {Object} [options]
   * @constructor
   */
  function FunctionCreatorNode( createFunction, options ) {

    // The icon that represents the function type
    var iconNode = new FunctionNode( createFunction(), {
      cursor: 'pointer'
    } );

    MovableCreatorNode.call( this, iconNode, createFunction, options );
  }

  functionBuilder.register( 'FunctionCreatorNode', FunctionCreatorNode );

  return inherit( MovableCreatorNode, FunctionCreatorNode );
} );