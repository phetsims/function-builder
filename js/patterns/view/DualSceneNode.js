// Copyright 2015, University of Colorado Boulder

/**
 * The 'dual' scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PatternsIconFactory = require( 'FUNCTION_BUILDER/patterns/view/PatternsIconFactory' );

  /**
   * @param {PatternsScene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function DualSceneNode( scene, layoutBounds, options ) {
    var icon = new PatternsIconFactory.createDualSceneIcon( 200 );
    icon.center = layoutBounds.center;
    options.children = [ icon ];
    Node.call( this, options );
  }

  functionBuilder.register( 'DualSceneNode', DualSceneNode );

  return inherit( Node, DualSceneNode, {

    // @public
    reset: function() {
      //TODO
    }
  } );
} );
