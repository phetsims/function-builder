// Copyright 2016-2023, University of Colorado Boulder

/**
 * Model for the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import FBModel from '../../common/model/FBModel.js';
import functionBuilder from '../../functionBuilder.js';
import MysteryChallenges from './MysteryChallenges.js';
import MysteryScene from './MysteryScene.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class MysteryModel extends FBModel {

  public constructor( tandem: Tandem ) {
    super( [
      new MysteryScene( MysteryChallenges.POOL1, { numberOfSlots: 1 } ),
      new MysteryScene( MysteryChallenges.POOL2, { numberOfSlots: 2 } ),
      new MysteryScene( MysteryChallenges.POOL3, { numberOfSlots: 3 } )
    ] );
  }
}

functionBuilder.register( 'MysteryModel', MysteryModel );