// Copyright 2015-2016, University of Colorado Boulder

/**
 * Node that displays an {ImageFunction}.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/FunctionBackgroundNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @param {ImageFunction} functionInstance
   * @param {Object} [options]
   * @constructor
   */
  function FunctionNode( functionInstance, options ) {

    options = _.extend( {
      iconScale: 0.3 // {number} scale for icon
    }, options );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [];

    var backgroundNode = new FunctionBackgroundNode( functionInstance.viewInfo );
    options.children.push( backgroundNode );

    //TODO remove if
    if ( functionInstance.image ) {
      var iconNode = new Image( functionInstance.image, {
        scale: options.iconScale,
        center: backgroundNode.center
      } );
      options.children.push( iconNode );
    }

    Node.call( this, options );

    this.xInset = backgroundNode.xInset; // @public (read-only), needed for layout
  }

  functionBuilder.register( 'FunctionNode', FunctionNode );

  return inherit( Node, FunctionNode );
} );