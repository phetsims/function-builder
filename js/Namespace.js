// Copyright 2002-2015, University of Colorado Boulder

//TODO move this to a common-code repository. phet-core?
/**
 * @author Jonathan Olson
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {string} name
   * @constructor
   */
  function Namespace( name ) {

    this.name = name; // @public (read-only)

    if ( window.phet ) {
      window.phet[ name ] = this;
    }
  }

  return inherit( Object, Namespace, {

    /**
     * Registers a key-value pair with the namespace.
     * @param {string}
     * @param {*} value
     */
    register: function( key, value ) {
      assert && assert( !this[ key ] );
      this[ key ] = value;
    }
  } );
} );
