// Copyright 2015, University of Colorado Boulder

/**
 * The 'single' scene in the 'Patterns' screen.
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
   * @param {SingleScene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function SingleSceneNode( scene, layoutBounds, options ) {
    var icon = new PatternsIconFactory.createSingleSceneIcon( 200 );
    icon.center = layoutBounds.center;
    options.children = [ icon ];
    Node.call( this, options );
  }

  functionBuilder.register( 'SingleSceneNode', SingleSceneNode );

  return inherit( Node, SingleSceneNode, {

    // @public
    reset: function() {
      //TODO
    }
  } );
} );
