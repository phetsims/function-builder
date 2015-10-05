// Copyright 2002-2015, University of Colorado Boulder

//TODO move to phet-core?
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
      assert && assert( !window.phet[ name ] );
      window.phet[ name ] = this;
    }
  }

  return inherit( Object, Namespace, {

    /**
     * Registers a key-value pair with the namespace.
     * @param {string} key
     * @param {*} value
     */
    register: function( key, value ) {
      assert && assert( !this[ key ], key + ' is already registered for namespace ' + this.name );
      this[ key ] = value;
    }
  } );
} );
