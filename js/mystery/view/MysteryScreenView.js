// Copyright 2016-2019, University of Colorado Boulder

/**
 * ScreenView for the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import FBScreenView from '../../common/view/FBScreenView.js';
import functionBuilder from '../../functionBuilder.js';
import MysterySceneNode from './MysterySceneNode.js';

/**
 * @param {MysteryModel} model
 * @param {Object} [options]
 * @constructor
 */
function MysteryScreenView( model, options ) {

  options = merge( {
    sceneControlYOffset: 535 // offset of scene control's top from top of screen
  }, options );

  FBScreenView.call( this, model, MysterySceneNode, options );
}

functionBuilder.register( 'MysteryScreenView', MysteryScreenView );

inherit( FBScreenView, MysteryScreenView );
export default MysteryScreenView;