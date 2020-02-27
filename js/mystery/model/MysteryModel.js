// Copyright 2016-2019, University of Colorado Boulder

/**
 * Model for the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import FBModel from '../../common/model/FBModel.js';
import functionBuilder from '../../functionBuilder.js';
import MysteryChallenges from './MysteryChallenges.js';
import MysteryScene from './MysteryScene.js';

/**
 * @constructor
 */
function MysteryModel() {
  FBModel.call( this, [
    new MysteryScene( MysteryChallenges.POOL1, { numberOfSlots: 1 } ),
    new MysteryScene( MysteryChallenges.POOL2, { numberOfSlots: 2 } ),
    new MysteryScene( MysteryChallenges.POOL3, { numberOfSlots: 3 } )
  ] );
}

functionBuilder.register( 'MysteryModel', MysteryModel );

inherit( FBModel, MysteryModel );
export default MysteryModel;