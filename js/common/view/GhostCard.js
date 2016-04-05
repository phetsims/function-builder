// Copyright 2016, University of Colorado Boulder

/**
 * Base type fo 'ghost' cards, which appear (optionally) as a placeholder in an empty carousel container.
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

  /**
   * @param {Node} contentNode - content that appears on the card
   * @param {Object} [options]
   * @constructor
   */
  function GhostCard( contentNode, options ) {

    options = _.extend( {}, FBConstants.CARD_OPTIONS, options );
    options.lineDash = [ 4, 4 ];
    options.opacity = 0.5;

    var backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height,
      _.pick( options, 'cornerRadius', 'fill', 'stroke', 'lineWidth', 'lineDash' ) );

    // center content on background
    contentNode.center = backgroundNode.center;

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, contentNode ];

    Node.call( this, options );
  }

  functionBuilder.register( 'GhostCard', GhostCard );

  return inherit( Node, GhostCard );
} );
