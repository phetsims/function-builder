// Copyright 2018, University of Colorado Boulder

/**
 * Drawer that contains the equation that corresponds to the functions in the builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Drawer = require( 'SCENERY_PHET/Drawer' );
  var EquationPanel = require( 'FUNCTION_BUILDER/common/view/equations/EquationPanel' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
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

      stepper: 'timer', // animation is controlled by the global phet-core Timer
      open: FBConstants.EQUATION_DRAWER_OPEN,
      handleLocation: 'bottom',
      equationOptions: null, // {*} options for EquationPanel

      // improve performance by disabling updates while the drawer is closed
      beforeOpen: function() { equationPanel.updateEnabled = true; },
      afterClose: function() { equationPanel.updateEnabled = false; }

    }, FBConstants.DRAWER_OPTIONS, options );

    var equationPanel = new EquationPanel( builder, slopeInterceptProperty, _.extend( {
      size: FBConstants.EQUATION_DRAWER_SIZE,
      updateEnabled: options.open,
      cornerRadius: options.cornerRadius
    }, options.equationOptions ) );

    Drawer.call( this, equationPanel, options );
  }

  functionBuilder.register( 'EquationDrawer', EquationDrawer );

  return inherit( Drawer, EquationDrawer );
} );
