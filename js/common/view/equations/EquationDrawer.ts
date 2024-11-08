// Copyright 2016-2023, University of Colorado Boulder

/**
 * Drawer that contains the equation that corresponds to the functions in the builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../../axon/js/Property.js';
import merge from '../../../../../phet-core/js/merge.js';
import { optionize4 } from '../../../../../phet-core/js/optionize.js';
import Drawer, { DrawerOptions } from '../../../../../scenery-phet/js/Drawer.js';
import { NodeTranslationOptions } from '../../../../../scenery/js/imports.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import Builder from '../../model/builder/Builder.js';
import EquationPanel, { EquationPanelOptions } from './EquationPanel.js';

type SelfOptions = {
  equationPanelOptions?: EquationPanelOptions;
};
type EquationDrawerOptions = SelfOptions & NodeTranslationOptions;

export default class EquationDrawer extends Drawer {

  public constructor( builder: Builder, slopeInterceptProperty: Property<boolean>, providedOptions?: EquationDrawerOptions ) {

    const options = optionize4<EquationDrawerOptions, SelfOptions, DrawerOptions>()( {}, FBConstants.DRAWER_OPTIONS, {

      // SelfOptions
      equationPanelOptions: {},

      // DrawerOptions
      open: FBConstants.EQUATION_DRAWER_OPEN,
      handlePosition: 'bottom',


      // improve performance by disabling updates while the drawer is closed
      beforeOpen: () => { equationPanel.updateEnabled = true; },
      afterClose: () => { equationPanel.updateEnabled = false; }

    }, providedOptions );

    const equationPanel = new EquationPanel( builder, slopeInterceptProperty, merge( {
      size: FBConstants.EQUATION_DRAWER_SIZE,
      updateEnabled: options.open,
      cornerRadius: options.cornerRadius
    }, options.equationPanelOptions ) );

    super( equationPanel, options );
  }
}

functionBuilder.register( 'EquationDrawer', EquationDrawer );