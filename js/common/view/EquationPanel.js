// Copyright 2016, University of Colorado Boulder

/**
 * Displays the equation and control for switching its format.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CheckBox = require( 'SUN/CheckBox' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SlopeInterceptEquationNode = require( 'FUNCTION_BUILDER/common/view/SlopeInterceptEquationNode' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var simplifyString = require( 'string!FUNCTION_BUILDER/simplify' );

  /**
   * @param {Property.<boolean>} simplifyEquationProperty
   * @param {Object} [options]
   * @constructor
   */
  function EquationPanel( simplifyEquationProperty, options ) {

    options = _.extend( {
      size: FBConstants.EQUATION_DRAWER_SIZE
    }, options );

    // background
    var backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, {
      fill: 'white'
    } );

    // Equation
    var equationNode = new SlopeInterceptEquationNode( -11, 9, FBSymbols.PLUS, 4 ); //TODO temporary

    // 'Simplify Equation' check box, at bottom center
    var simplifyEquationLabel = new Text( simplifyString, {
      font: FBConstants.CHECK_BOX_FONT,
      maxWidth: 0.9 * options.size.width
    } );
    var simplifyEquationCheckBox = new CheckBox( simplifyEquationLabel, simplifyEquationProperty, {
      centerX: backgroundNode.centerX,
      bottom: backgroundNode.bottom - 5
    } );
    simplifyEquationCheckBox.touchArea = simplifyEquationCheckBox.localBounds.dilatedXY( 10, 10 );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, equationNode, simplifyEquationCheckBox ];

    Node.call( this, options );

    simplifyEquationProperty.link( function( simplifyEquation ) {
      //TODO update equation

      // center in available space
      equationNode.centerX = backgroundNode.centerX;
      equationNode.centerY = backgroundNode.top + ( simplifyEquationCheckBox.top - backgroundNode.top ) / 2;
    } );
  }

  functionBuilder.register( 'EquationPanel', EquationPanel );

  return inherit( Node, EquationPanel );
} );
