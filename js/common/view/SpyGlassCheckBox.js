// Copyright 2015-2016, University of Colorado Boulder

/**
 * Spyglass check box.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CheckBox = require( 'SUN/CheckBox' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var spyglassString = require( 'string!FUNCTION_BUILDER/spyglass' );

  /**
   * @param {Property.<boolean>} spyglassVisibleProperty
   * @param {Object} [options]
   * @constructor
   */
  function SpyglassCheckBox( spyglassVisibleProperty, options ) {

    var content = new HBox( {
      spacing: 8,
      children: [
        new Text( spyglassString, { font: new FBFont( 20 ) } ),
        createSpyglassIcon()
      ]
    } );

    CheckBox.call( this, content, spyglassVisibleProperty, options );
  }

  functionBuilder.register( 'SpyglassCheckBox', SpyglassCheckBox );

  // Creates the spyglass icon
  function createSpyglassIcon() {

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

  return inherit( CheckBox, SpyglassCheckBox );
} );
