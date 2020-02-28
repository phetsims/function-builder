// Copyright 2015-2020, University of Colorado Boulder

/**
 * ScreenView for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import FBScreenView from '../../common/view/FBScreenView.js';
import functionBuilder from '../../functionBuilder.js';
import EquationsSceneNode from './EquationsSceneNode.js';

/**
 * @param {EquationsModel} model
 * @param {Object} [options]
 * @constructor
 */
function EquationsScreenView( model, options ) {
  FBScreenView.call( this, model, EquationsSceneNode, options );
}

functionBuilder.register( 'EquationsScreenView', EquationsScreenView );

inherit( FBScreenView, EquationsScreenView );
export default EquationsScreenView;