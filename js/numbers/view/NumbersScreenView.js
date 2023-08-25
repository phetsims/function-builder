// Copyright 2015-2023, University of Colorado Boulder

/**
 * ScreenView for the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import FBScreenView from '../../common/view/FBScreenView.js';
import functionBuilder from '../../functionBuilder.js';
import NumbersModel from '../model/NumbersModel.js';
import NumbersSceneNode from './NumbersSceneNode.js';

export default class NumbersScreenView extends FBScreenView {

  /**
   * @param {NumbersModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {
    assert && assert( model instanceof NumbersModel );
    assert && assert( tandem instanceof Tandem );
    super( model, NumbersSceneNode, {
      tandem: tandem
    } );
  }
}

functionBuilder.register( 'NumbersScreenView', NumbersScreenView );