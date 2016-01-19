// Copyright 2016, University of Colorado Boulder

/**
 * Placeholder for a function, has a dashed outline and no fill.
 * Appears in the builder to indicate where 'slots' are.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/FunctionBackgroundNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function PlaceholderFunctionNode( options ) {

    options = _.extend( {
      fill: null,
      stroke: 'white',
      lineDash: [ 4, 4 ]
    }, options );

    FunctionBackgroundNode.call( this, options );
  }

  functionBuilder.register( 'PlaceholderFunctionNode', PlaceholderFunctionNode );


  return inherit( FunctionBackgroundNode, PlaceholderFunctionNode );
} );
