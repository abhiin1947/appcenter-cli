/*
 * Code generated by Microsoft (R) AutoRest Code Generator 0.17.0.0
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

var util = require('util');

/**
 * @class
 * Initializes a new instance of the AvailableVersions class.
 * @constructor
 * @member {array} [versions] List of available versions.
 * 
 * @member {number} [totalCount] The full number of versions accross all pages.
 * 
 */
function AvailableVersions() {
}

/**
 * Defines the metadata of AvailableVersions
 *
 * @returns {object} metadata of AvailableVersions
 *
 */
AvailableVersions.prototype.mapper = function () {
  return {
    required: false,
    serializedName: 'AvailableVersions',
    type: {
      name: 'Composite',
      className: 'AvailableVersions',
      modelProperties: {
        versions: {
          required: false,
          serializedName: 'versions',
          type: {
            name: 'Sequence',
            element: {
                required: false,
                serializedName: 'StringElementType',
                type: {
                  name: 'String'
                }
            }
          }
        },
        totalCount: {
          required: false,
          serializedName: 'totalCount',
          type: {
            name: 'Number'
          }
        }
      }
    }
  };
};

module.exports = AvailableVersions;