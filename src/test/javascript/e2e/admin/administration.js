/*
 * Copyright (c) 2017 dtrouillet
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *  Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

describe('administration', function () {

    var username = element(by.id('username'));
    var password = element(by.id('password'));
    var accountMenu = element(by.id('account-menu'));
    var adminMenu = element(by.id('admin-menu'));
    var login = element(by.id('login'));
    var logout = element(by.id('logout'));

    beforeAll(function () {
        browser.get('/');

        accountMenu.click();
        login.click();

        username.sendKeys('admin');
        password.sendKeys('admin');
        element(by.css('button[type=submit]')).click();
    });

    beforeEach(function () {
        adminMenu.click();
    });

    it('should load user management', function () {
        element(by.css('[ui-sref="user-management"]')).click();
        const expect1 = /userManagement.home.title/;
        element.all(by.css('h2')).first().getAttribute('data-translate').then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    it('should load metrics', function () {
        element(by.css('[ui-sref="jhi-metrics"]')).click();
        const expect1 = /metrics.title/;
        element.all(by.css('h2')).first().getAttribute('data-translate').then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    it('should load health', function () {
        element(by.css('[ui-sref="jhi-health"]')).click();
        const expect1 = /health.title/;
        element.all(by.css('h2')).first().getAttribute('data-translate').then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    it('should load configuration', function () {
        element(by.css('[ui-sref="jhi-configuration"]')).click();
        const expect1 = /configuration.title/;
        element.all(by.css('h2')).first().getAttribute('data-translate').then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    it('should load audits', function () {
        element(by.css('[ui-sref="audits"]')).click();
        const expect1 = /audits.title/;
        element.all(by.css('h2')).first().getAttribute('data-translate').then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    it('should load logs', function () {
        element(by.css('[ui-sref="logs"]')).click();
        const expect1 = /logs.title/;
        element.all(by.css('h2')).first().getAttribute('data-translate').then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    afterAll(function () {
        accountMenu.click();
        logout.click();
    });
});
