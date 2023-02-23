// Copyright 2015-2023, University of Colorado Boulder

/**
 * ScreenView for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import FBScreenView from '../../common/view/FBScreenView.js';
import functionBuilder from '../../functionBuilder.js';
import PatternsSceneNode from './PatternsSceneNode.js';

export default class PatternsScreenView extends FBScreenView {

  /**
   * @param {PatternsModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {
    super( model, PatternsSceneNode, options );
  }
}

functionBuilder.register( 'PatternsScreenView', PatternsScreenView );