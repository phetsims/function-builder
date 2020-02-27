// Copyright 2015-2019, University of Colorado Boulder

/**
 * ScreenView for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import FBScreenView from '../../common/view/FBScreenView.js';
import functionBuilder from '../../functionBuilder.js';
import PatternsSceneNode from './PatternsSceneNode.js';

/**
 * @param {PatternsModel} model
 * @param {Object} [options]
 * @constructor
 */
function PatternsScreenView( model, options ) {
  FBScreenView.call( this, model, PatternsSceneNode, options );
}

functionBuilder.register( 'PatternsScreenView', PatternsScreenView );

inherit( FBScreenView, PatternsScreenView );
export default PatternsScreenView;