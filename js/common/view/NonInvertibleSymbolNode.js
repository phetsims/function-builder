// Copyright 2016, University of Colorado Boulder

/**
 * Symbol that indicates that a function is non-invertible.
 * Consists of the universal 'no' symbol (circle with slash).
 * Displayed on a function when it actively blocks a card from passing through the builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function NonInvertibleSymbolNode( options ) {

    options = _.extend( {
      radius: 20,
      lineWidth: 5,
      stroke: 'red',
      fill: 'white'
    }, options );

    var circleNode = new Circle( options.radius, {
      lineWidth: options.lineWidth,
      stroke: options.stroke,
      fill: options.fill
    } );

    var slashNode = new Line( 0, 0, 2 * options.radius, 0, {
      lineWidth: options.lineWidth,
      stroke: options.stroke,
      rotation: Math.PI / 4,
      center: circleNode.center
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ circleNode, slashNode ];

    Node.call( this, options );
  }

  functionBuilder.register( 'NonInvertibleSymbolNode', NonInvertibleSymbolNode );

  return inherit( Node, NonInvertibleSymbolNode );
} );
