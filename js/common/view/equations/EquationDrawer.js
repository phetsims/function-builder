// Copyright 2016, University of Colorado Boulder

/**
 * Drawer that contains the equation that corresponds to the functions in the builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Drawer = require( 'FUNCTION_BUILDER/common/view/Drawer' );
  var EquationPanel = require( 'FUNCTION_BUILDER/common/view/equations/EquationPanel' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Builder} builder
   * @param {Property.<boolean>} slopeInterceptProperty - display the equation in slope-intercept form?
   * @param {Object} [options]
   * @constructor
   */
  function EquationDrawer( builder, slopeInterceptProperty, options ) {

    options = _.extend( {

      open: FBConstants.EQUATION_DRAWER_OPEN,
      cornerRadius: FBConstants.DRAWER_CORNER_RADIUS,
      handleLocation: 'bottom',
      handleTouchAreaXDilation: FBConstants.DRAWER_TOUCH_AREA_X_DILATION,
      handleTouchAreaYDilation: FBConstants.DRAWER_TOUCH_AREA_Y_DILATION,

      // improve performance by disabling updates while the drawer is closed
      beforeOpen: function() { equationPanel.updateEnabled = true; },
      afterClose: function() { equationPanel.updateEnabled = false; },

      // EquationPanel options
      xSymbol: FBSymbols.X,
      ySymbol: FBSymbols.Y,
      xyFont: FBConstants.EQUATION_CARD_XY_FONT, // {Font} for x & y symbols
      xyAsCards: false // {boolean} put x & y symbols on a rectangle background in equations, like a card?

    }, options );

    var equationPanel = new EquationPanel( builder, slopeInterceptProperty, {
      size: FBConstants.EQUATION_DRAWER_SIZE,
      cornerRadius: options.cornerRadius,
      xSymbol: options.xSymbol,
      ySymbol: options.ySymbol,
      xyFont: options.xyFont,
      xyAsCards: options.xyAsCards,
      updateEnabled: options.open
    } );

    Drawer.call( this, equationPanel, options );
  }

  functionBuilder.register( 'EquationDrawer', EquationDrawer );

  return inherit( Drawer, EquationDrawer );
} );
