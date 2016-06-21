// Copyright 2016, University of Colorado Boulder

/**
 * Model for the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBModel = require( 'FUNCTION_BUILDER/common/model/FBModel' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MysteryScene = require( 'FUNCTION_BUILDER/mystery/model/MysteryScene' );

  // pool of 1-function challenges
  var POOL1 = [
    '+ 3',
    '+ 2',
    '+ 1',
    '+ 0',
    '- 3',
    '- 2',
    '- 1',
    '- 0',
    '* 3',
    '* 2',
    '* 1',
    '* 0',
    '* -1',
    '* -2',
    '* -3',
    '/ 3',
    '/ 2',
    '/ 1',
    '/ -1',
    '/ -2',
    '/ -3'
  ];

  // pool of 2-function challenges
  var POOL2 = [
    '+ 1 + 3',
    '+ 1 + 2',
    '* 2 * 0',
    '* 0 * 1',
    '* -1 * -2',
    '* 2 * 1',
    '* -3 * 2',
    '* 2 * -3',
    '* 3 + 3',
    '* 2 + 3',
    '* 2 - 2',
    '* 1 + 3',
    '* 1 + 2',
    '/ 1 - 1',
    '* 0 + 3',
    '* -3 + 0',
    '/ 3 - 3',
    '/ 3 + 2',
    '/ -1 - 3',
    '/ -2 + 2',
    '+ 3 * 3',
    '- 3 * 2',
    '+ 2 * 2',
    '+ 3 * 1',
    '+ 2 / 1',
    '- 1 * 1',
    '+ 3 * 0',
    '+ 0 * -3',
    '- 3 / 3',
    '- 2 / 3',
    '+ 3 / -1',
    '+ 2 / -1'
  ];

  // pool of 3-function challenges
  var POOL3 = [
    '* -3 * -1 * 0',
    '* 3 * -2 * -1',
    '* 2 * -2 * -2',
    '/ 3 / -1 / -1',
    '/ 2 / 3 / -2',
    '/ 1 / -1 / 2',
    '* 3 * -3 + 3',
    '/ 2 * 2 - 2' ,
    '+ 3 * 1 + 3',
    '+ 2 * 1 + 2',
    '- 1 / 1 - 1',
    '+ 3 * 0 + 3',
    '+ 2 * -2 + 3',
    '+ 0 * -3 + 0',
    '- 3 / 3 - 3',
    '- 2 / 3 + 2' ,
    '+ 3 / -1 - 3',
    '+ 2 / -2 + 2',
    '* -3 + 3 + 3',
    '/ 3 - 3 - 3',
    '* 0 + 2 + 2',
    '* 3 + 3 * 1',
    '/ 2 + 2 / 1',
    '/ 2 - 1 * 1',
    '* -2 + 3 * 0',
    '* 2 + 3 * -2',
    '* 1 + 0 * -3',
    '* 0 - 3 / 3',
    '* -1 - 2 / 3',
    '* 0 + 3 / -1',
    '* 1 + 2 / -1'
  ];

  /**
   * @constructor
   */
  function MysteryModel() {
    FBModel.call( this, [
      new MysteryScene( POOL1, { functionsPerChallenge: 1 } ),
      new MysteryScene( POOL2, { functionsPerChallenge: 2 } ),
      new MysteryScene( POOL3, { functionsPerChallenge: 3 } )
    ] );
  }

  functionBuilder.register( 'MysteryModel', MysteryModel );

  return inherit( FBModel, MysteryModel );
} );
