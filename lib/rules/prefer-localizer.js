/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

const { docUrl } = require('../util/doc-url');

module.exports = {
    meta: {
        docs: {
            description: 'suggest usage of "@salesforce/localizerjs" over "Intl" constructor',
            category: 'LWC',
            recommended: true,
            url: docUrl('prefer-localizer'),
        },
        schema: [],
    },

    create(context) {
        return {
            NewExpression(node) {
                const { callee } = node;
                const intlFormatMethods = ['DateTimeFormat', 'NumberFormat', 'RelativeTimeFormat'];

                if (
                    callee.object &&
                    callee.object.name === 'Intl' &&
                    callee.property &&
                    intlFormatMethods.includes(callee.property.name)
                ) {
                    context.report({
                        node,
                        message:
                            'Prefer using "@salesforce/localizerjs" over directly calling "Intl".',
                    });
                }
            },
        };
    },
};