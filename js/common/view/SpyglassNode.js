// Copyright 2016, University of Colorado Boulder

/**
 * A spyglass, looks like a magnifying glass, use to see inside the builder.
 * Origin is at the center of the lens.
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
   * @param {number} lensRadius
   * @param {Object} [options]
   * @constructor
   */
  function SpyglassNode( lensRadius, options ) {

    options = _.extend( {
      lensFill: null
    }, options );

    var lensNode = new Circle( lensRadius, {
      fill: options.lensFill,
      stroke: 'black',
      lineWidth: 5
    } );

    var handleAngle = Math.PI / 2;
    var handleX = lensRadius * Math.cos( handleAngle );
    var handleY = lensRadius * Math.sin( handleAngle );
    var handleNode = new Line( handleX, handleY + 3, handleX, handleY + ( lensRadius / 2 ), {
      stroke: 'black',
      lineWidth: 8,
      lineCap: 'round'
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ handleNode, lensNode ];

    Node.call( this, options );
  }

  functionBuilder.register( 'SpyglassNode', SpyglassNode );

  return inherit( Node, SpyglassNode );
} );
