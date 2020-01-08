// Copyright 2016-2019, University of Colorado Boulder

/**
 * Drawer that contains the equation that corresponds to the functions in the builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Drawer = require( 'SCENERY_PHET/Drawer' );
  const EquationPanel = require( 'FUNCTION_BUILDER/common/view/equations/EquationPanel' );
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );

  /**
   * @param {Builder} builder
   * @param {Property.<boolean>} slopeInterceptProperty - display the equation in slope-intercept form?
   * @param {Object} [options]
   * @constructor
   */
  function EquationDrawer( builder, slopeInterceptProperty, options ) {

    options = merge( {
      open: FBConstants.EQUATION_DRAWER_OPEN,
      handlePosition: 'bottom',
      equationOptions: null, // {*} options for EquationPanel

      // improve performance by disabling updates while the drawer is closed
      beforeOpen: function() { equationPanel.updateEnabled = true; },
      afterClose: function() { equationPanel.updateEnabled = false; }

    }, FBConstants.DRAWER_OPTIONS, options );

    var equationPanel = new EquationPanel( builder, slopeInterceptProperty, merge( {
      size: FBConstants.EQUATION_DRAWER_SIZE,
      updateEnabled: options.open,
      cornerRadius: options.cornerRadius
    }, options.equationOptions ) );

    Drawer.call( this, equationPanel, options );
  }

  functionBuilder.register( 'EquationDrawer', EquationDrawer );

  return inherit( Drawer, EquationDrawer );
} );
