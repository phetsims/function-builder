// Copyright 2016, University of Colorado Boulder

/**
 * A spyglass, looks like a magnifying glass, use to see inside the builder.
 * Origin is at the center of the lens.
 * Handle points to right; use options.rotation to change orientation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function SpyglassNode( options ) {

    options = _.extend( {
      lensRadius: FBConstants.SPYGLASS_RADIUS,
      lensFill: null,
      lensLineWidth: 5,
      handleLength: 16,
      handleLineWidth: 8,
      rotation: Math.PI / 4
    }, options );

    // lens
    var lensNode = new Circle( options.lensRadius, {
      fill: options.lensFill,
      stroke: 'black',
      lineWidth: options.lensLineWidth
    } );

    // handle, pointing right
    var handleX = options.lensRadius + ( options.lensLineWidth / 2 );
    var handleY = 0;
    var handleNode = new Line( handleX, handleY, handleX + options.handleLength, handleY, {
      stroke: 'black',
      lineWidth: options.handleLineWidth,
      lineCap: 'round'
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ handleNode, lensNode ];

    Node.call( this, options );
  }

  functionBuilder.register( 'SpyglassNode', SpyglassNode );

  return inherit( Node, SpyglassNode );
} );
