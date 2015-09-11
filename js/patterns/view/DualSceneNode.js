// Copyright 2002-2015, University of Colorado Boulder

/**
 * The 'dual' scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PatternsIconFactory = require( 'FUNCTION_BUILDER/patterns/view/PatternsIconFactory' );

  function DualSceneNode( options ) {
    options.children = [ new PatternsIconFactory.createDualSceneIcon( 200 ) ];
    Node.call( this, options );
  }

  return inherit( Node, DualSceneNode );
} );
