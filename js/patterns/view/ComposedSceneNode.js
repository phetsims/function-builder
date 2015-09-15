// Copyright 2002-2015, University of Colorado Boulder

/**
 * The 'composed' scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PatternsIconFactory = require( 'FUNCTION_BUILDER/patterns/view/PatternsIconFactory' );

  function ComposedSceneNode( layoutBounds, options ) {
    var icon = new PatternsIconFactory.createComposedSceneIcon( 200 );
    icon.center = layoutBounds.center;
    options.children = [ icon ];
    Node.call( this, options );
  }

  return inherit( Node, ComposedSceneNode );
} );
