// Copyright 2016, University of Colorado Boulder

/**
 * XY graph for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function XYGraphNode( options ) {

    options = _.extend( {
      size: FBConstants.GRAPH_DRAWER_SIZE
    }, options );

    var backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, {
      fill: 'white'
    } );

    //TODO placeholder
    var textNode = new Text( 'Graph', {
      font: FBConstants.GRAPH_FONT,
      center: backgroundNode.center
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, textNode ];

    Node.call( this, options );
  }

  functionBuilder.register( 'XYGraphNode', XYGraphNode );

  return inherit( Node, XYGraphNode );
} );
