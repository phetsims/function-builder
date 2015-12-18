// Copyright 2015, University of Colorado Boulder

/**
 * Node for functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/FunctionBackgroundNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @param {AbstractFunction} functionInstance
   * @param {Object} [options]
   * @constructor
   */
  function FunctionNode( functionInstance, options ) {

    options = _.extend( {
      iconScale: 0.3 // {number} scale for icon
    }, options );

    options.children = [];

    var backgroundNode = new FunctionBackgroundNode( functionInstance.viewInfo );
    options.children.push( backgroundNode );

    if ( functionInstance.viewInfo.image ) {
      var iconNode = new Image( functionInstance.viewInfo.image, {
        scale: options.iconScale,
        center: backgroundNode.center
      } );
      options.children.push( iconNode );
    }

    Node.call( this, options );

    this.functionInstance = functionInstance; // @public (read-only)
    this.xInset = backgroundNode.xInset; // @public (read-only), needed for layout
  }

  functionBuilder.register( 'FunctionNode', FunctionNode );

  return inherit( Node, FunctionNode );
} );