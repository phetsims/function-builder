// Copyright 2015-2019, University of Colorado Boulder

/**
 * ScreenView for the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import FBScreenView from '../../common/view/FBScreenView.js';
import functionBuilder from '../../functionBuilder.js';
import NumbersSceneNode from './NumbersSceneNode.js';

/**
 * @param {NumbersModel} model
 * @param {Object} [options]
 * @constructor
 */
function NumbersScreenView( model, options ) {
  FBScreenView.call( this, model, NumbersSceneNode, options );
}

functionBuilder.register( 'NumbersScreenView', NumbersScreenView );

inherit( FBScreenView, NumbersScreenView );
export default NumbersScreenView;