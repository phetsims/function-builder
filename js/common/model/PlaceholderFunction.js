// Copyright 2002-2015, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   */
  function PlaceholderFunction( options ) {

    options = _.extend( {
      fill: null,
      stroke: 'white',
      lineDash: [ 3, 3 ]
    }, options );

    FBFunction.call( this, 'placeholder', options );
  }

  return inherit( FBFunction, PlaceholderFunction );
} );
