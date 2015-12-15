// Copyright 2002-2015, University of Colorado Boulder

/**
 * Function node that stays synchronized with the position of a function instance, and can be dragged by the user
 * to set the position of a function instance.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {AbstractFunction} functionInstance
   * @param {Object} [options]
   * @constructor
   */
  function MovableFunctionNode( functionInstance, options ) {

    FunctionNode.call( this, functionInstance, options );

    var thisNode = this;
    function locationObserver( location ) {
      thisNode.center = location;
    }

    functionInstance.locationProperty.link( locationObserver );

    // @private
    this.disposeMovableFunctionNode = function() {
      functionInstance.locationProperty.unlink( locationObserver );
    }
  }

  functionBuilder.register( 'MovableFunctionNode', MovableFunctionNode );

  return inherit( FunctionNode, MovableFunctionNode, {

    // @public
    dispose: function() {
      this.disposeMovableFunctionNode();
    }
  } );
} );
