// Copyright 2002-2015, University of Colorado Boulder

/**
 * The 'single' scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );

  function SingleSceneNode( options ) {

    options.children = [ new Text( 'single', { font: new PhetFont( 40 ) } ) ];

    Node.call( this, options );
  }

  return inherit( Node, SingleSceneNode );
} );
