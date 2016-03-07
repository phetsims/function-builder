// Copyright 2016, University of Colorado Boulder

/**
 * Base type for function containers.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableContainer = require( 'FUNCTION_BUILDER/common/view/MovableContainer' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function FunctionContainer( options ) {

    options = _.extend( {
      size: FBConstants.FUNCTION_SIZE
    }, options );

    MovableContainer.call( this, options );
  }

  functionBuilder.register( 'FunctionContainer', FunctionContainer );

  return inherit( MovableContainer, FunctionContainer, {

    /**
     * Creates functions and puts them in the container.
     *
     * @param {number} numberOfInstances
     * @param {PatternsScene} scene
     * @param {BuilderNode} builderNode
     * @param {Node} worldNode
     * @public
     */
    createFunctions: function( numberOfInstances, scene, builderNode, worldNode ) {
      throw new Error( 'must be implemented by subtypes' );
    }
  } );
} );
