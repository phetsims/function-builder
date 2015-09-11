// Copyright 2002-2015, University of Colorado Boulder

/**
 * Scene control for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  var FUNCTION_WIDTH = 25;
  var LIGHT_GREEN = 'rgb( 147, 231, 129 )';
  var LIGHT_PURPLE = 'rgb( 205, 175, 230 )';

  var createSingleIcon = function() {
    return new FunctionNode( {
      backgroundWidth: FUNCTION_WIDTH,
      fill: LIGHT_GREEN
    } );
  };

  var createDualIcon = function() {
    return new VBox( {
      spacing: 4,
      children: [
        new FunctionNode( {
          backgroundWidth: FUNCTION_WIDTH,
          fill: LIGHT_GREEN
        } ),
        new FunctionNode( {
          backgroundWidth: FUNCTION_WIDTH,
          fill: LIGHT_PURPLE
        } )
      ]
    } );
  };

  var createComposedIcon = function() {
    var leftNode = new FunctionNode( {
      backgroundWidth: FUNCTION_WIDTH,
      fill: LIGHT_GREEN
    } );
    var rightNode = new FunctionNode( {
      backgroundWidth: FUNCTION_WIDTH,
      fill: LIGHT_PURPLE,
      left: leftNode.right - leftNode.xInset - 1
    } );
    return new Node( { children: [ leftNode, rightNode ] } );
  };

  /**
   * @param {Property<string>} sceneProperty - which scene is visible, 'single'|'dual'|'composed'
   * @param {Object} [options]
   * @constructor
   */
  function PatternsSceneControl( sceneProperty, options ) {

    options = options || {};
    options.orientation = 'horizontal';
    options.spacing = 15;
    options.baseColor = 'white';
    options.selectedLineWidth = 2;
    options.buttonContentXMargin = 10;
    options.buttonContentYMargin = 5;

    RadioButtonGroup.call( this, sceneProperty, [
      { value: 'single', node: createSingleIcon() },
      { value: 'dual', node: createDualIcon() },
      { value: 'composed', node: createComposedIcon() }
    ], options );
  }

  return inherit( RadioButtonGroup, PatternsSceneControl );
} );
