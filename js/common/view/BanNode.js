// Copyright 2016-2019, University of Colorado Boulder

/**
 * The symbol is the universal "no" symbol, which shows a circle with a line through it, see
 * https://en.wikipedia.org/wiki/No_symbol. It's known by a number of  different emoji names, include "banned", see
 * https://emojipedia.org/no-entry-sign/.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const Line = require( 'SCENERY/nodes/Line' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );

  // TODO: Should this be named BannedNode or BanNode? See https://github.com/phetsims/scenery-phet/issues/548
  class BanNode extends Node {

    /**
     * @param {Object} [options]
     * @constructor
     */
    constructor( options ) {

      options = merge( {
        radius: 20,
        lineWidth: 5,
        stroke: 'red',
        fill: 'white' // TODO: Should the default fill be null? See https://github.com/phetsims/scenery-phet/issues/548
      }, options );

      const circleNode = new Circle( options.radius, {
        lineWidth: options.lineWidth,
        stroke: options.stroke,
        fill: options.fill
      } );

      const slashNode = new Line( 0, 0, 2 * options.radius, 0, {
        lineWidth: options.lineWidth,
        stroke: options.stroke,
        rotation: Math.PI / 4,
        center: circleNode.center
      } );

      // TODO: Should we show the circleNode in front of the slashNode to avoid the possibility of "seams"? See https://github.com/phetsims/scenery-phet/issues/548

      assert && assert( !options.children, 'decoration not supported' );
      options.children = [ circleNode, slashNode ];

      super( options );
    }
  }

  functionBuilder.register( 'BanNode', BanNode );

  return BanNode;
} );