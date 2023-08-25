// Copyright 2015-2023, University of Colorado Boulder

/**
 * ScreenView for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import FBScreenView from '../../common/view/FBScreenView.js';
import functionBuilder from '../../functionBuilder.js';
import PatternsModel from '../model/PatternsModel.js';
import PatternsSceneNode from './PatternsSceneNode.js';

export default class PatternsScreenView extends FBScreenView {

  /**
   * @param {PatternsModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {
    assert && assert( model instanceof PatternsModel );
    assert && assert( tandem instanceof Tandem );
    super( model, PatternsSceneNode, {
      tandem: tandem
    } );
  }
}

functionBuilder.register( 'PatternsScreenView', PatternsScreenView );