// Copyright 2015-2020, University of Colorado Boulder

/**
 * ScreenView for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import FBScreenView from '../../common/view/FBScreenView.js';
import functionBuilder from '../../functionBuilder.js';
import EquationsSceneNode from './EquationsSceneNode.js';

export default class EquationsScreenView extends FBScreenView {

  /**
   * @param {EquationsModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {
    super( model, EquationsSceneNode, options );
  }
}

functionBuilder.register( 'EquationsScreenView', EquationsScreenView );