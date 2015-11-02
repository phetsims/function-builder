// Copyright 2002-2015, University of Colorado Boulder

/**
 * 'Spy Glass' check box.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CheckBox = require( 'SUN/CheckBox' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var spyGlassString = require( 'string!FUNCTION_BUILDER/spyGlass' );

  /**
   * @param {Property.<boolean>} spyGlassVisibleProperty
   * @param {Object} [options]
   * @constructor
   */
  function SpyGlassCheckBox( spyGlassVisibleProperty, options ) {

    var content = new HBox( {
      spacing: 8,
      children: [
        new Text( spyGlassString, { font: new FBFont( 20 ) } ),
        createSpyGlassIcon()
      ]
    } );

    CheckBox.call( this, content, spyGlassVisibleProperty, options );
  }

  // Creates the spy glass icon
  function createSpyGlassIcon() {

    var LENS_RADIUS = 10;

    var lensNode = new Circle( LENS_RADIUS, {
      stroke: 'black',
      lineWidth: 2,
      fill: 'rgb(186,205,217)'
    } );

    var handleNode = new Line( 0, 0, 1.25 * LENS_RADIUS, 1.25 * LENS_RADIUS, {
      stroke: 'black',
      lineWidth: 4,
      lineCap: 'round'
    } );

    return new Node( {
      children: [ handleNode, lensNode ]
    } );
  }

  return inherit( CheckBox, SpyGlassCheckBox );
} );
