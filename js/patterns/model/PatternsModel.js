// Copyright 2015-2019, University of Colorado Boulder

/**
 * Model for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import FBModel from '../../common/model/FBModel.js';
import functionBuilder from '../../functionBuilder.js';
import PatternsScene from './PatternsScene.js';

/**
 * @constructor
 */
function PatternsModel() {
  FBModel.call( this, [

    // builder with 1 slot, for exploring application of 1 function
    new PatternsScene( {
      numberOfSlots: 1,
      numberOfEachCard: 2,
      numberOfEachFunction: 1
    } ),

    // builder with 3 slots, for exploring function composition
    new PatternsScene( {
      numberOfSlots: 3,
      numberOfEachCard: 2,
      numberOfEachFunction: 2
    } )
  ] );
}

functionBuilder.register( 'PatternsModel', PatternsModel );

inherit( FBModel, PatternsModel );
export default PatternsModel;