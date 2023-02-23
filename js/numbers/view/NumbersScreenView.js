// Copyright 2015-2023, University of Colorado Boulder

/**
 * ScreenView for the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import FBScreenView from '../../common/view/FBScreenView.js';
import functionBuilder from '../../functionBuilder.js';
import NumbersSceneNode from './NumbersSceneNode.js';

export default class NumbersScreenView extends FBScreenView {

  /**
   * @param {NumbersModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {
    super( model, NumbersSceneNode, options );
  }
}

functionBuilder.register( 'NumbersScreenView', NumbersScreenView );