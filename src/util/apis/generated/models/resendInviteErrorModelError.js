/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

/**
 * Class representing a ResendInviteErrorModelError.
 */
class ResendInviteErrorModelError {
  /**
   * Create a ResendInviteErrorModelError.
   * @property {string} code Possible values include: 'BadRequest', 'Conflict',
   * 'NotAcceptable', 'NotFound', 'InternalServerError', 'Unauthorized',
   * 'TooManyRequests'
   * @property {string} message
   */
  constructor() {
  }

  /**
   * Defines the metadata of ResendInviteErrorModelError
   *
   * @returns {object} metadata of ResendInviteErrorModelError
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'ResendInviteErrorModel_error',
      type: {
        name: 'Composite',
        className: 'ResendInviteErrorModelError',
        modelProperties: {
          code: {
            required: true,
            serializedName: 'code',
            type: {
              name: 'String'
            }
          },
          message: {
            required: true,
            serializedName: 'message',
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = ResendInviteErrorModelError;