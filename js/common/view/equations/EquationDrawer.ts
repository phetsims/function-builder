// Copyright 2016-2023, University of Colorado Boulder

/**
 * Drawer that contains the equation that corresponds to the functions in the builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import Drawer from '../../../../../scenery-phet/js/Drawer.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import EquationPanel from './EquationPanel.js';

export default class EquationDrawer extends Drawer {

  /**
   * @param {Builder} builder
   * @param {Property.<boolean>} slopeInterceptProperty - display the equation in slope-intercept form?
   * @param {Object} [options]
   */
  constructor( builder, slopeInterceptProperty, options ) {

    options = merge( {
      open: FBConstants.EQUATION_DRAWER_OPEN,
      handlePosition: 'bottom',
      equationOptions: null, // {*} options for EquationPanel

      // improve performance by disabling updates while the drawer is closed
      beforeOpen: () => { equationPanel.updateEnabled = true; },
      afterClose: () => { equationPanel.updateEnabled = false; }

    }, FBConstants.DRAWER_OPTIONS, options );

    const equationPanel = new EquationPanel( builder, slopeInterceptProperty, merge( {
      size: FBConstants.EQUATION_DRAWER_SIZE,
      updateEnabled: options.open,
      cornerRadius: options.cornerRadius
    }, options.equationOptions ) );

    super( equationPanel, options );
  }
}

functionBuilder.register( 'EquationDrawer', EquationDrawer );