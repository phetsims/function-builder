// Copyright 2015-2020, University of Colorado Boulder

/**
 * Model for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import FBModel from '../../common/model/FBModel.js';
import functionBuilder from '../../functionBuilder.js';
import EquationsScene from './EquationsScene.js';

/**
 * @constructor
 */
function EquationsModel() {
  FBModel.call( this, [ new EquationsScene() ] );
}

functionBuilder.register( 'EquationsModel', EquationsModel );

inherit( FBModel, EquationsModel );
export default EquationsModel;