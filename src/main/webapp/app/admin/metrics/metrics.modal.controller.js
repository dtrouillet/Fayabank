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

(function() {
    'use strict';

    angular
        .module('fayabankApp')
        .controller('JhiMetricsMonitoringModalController', JhiMetricsMonitoringModalController);

    JhiMetricsMonitoringModalController.$inject = ['$uibModalInstance', 'threadDump'];

    function JhiMetricsMonitoringModalController ($uibModalInstance, threadDump) {
        var vm = this;

        vm.cancel = cancel;
        vm.getLabelClass = getLabelClass;
        vm.threadDump = threadDump;
        vm.threadDumpAll = 0;
        vm.threadDumpBlocked = 0;
        vm.threadDumpRunnable = 0;
        vm.threadDumpTimedWaiting = 0;
        vm.threadDumpWaiting = 0;

        angular.forEach(threadDump, function(value) {
            if (value.threadState === 'RUNNABLE') {
                vm.threadDumpRunnable += 1;
            } else if (value.threadState === 'WAITING') {
                vm.threadDumpWaiting += 1;
            } else if (value.threadState === 'TIMED_WAITING') {
                vm.threadDumpTimedWaiting += 1;
            } else if (value.threadState === 'BLOCKED') {
                vm.threadDumpBlocked += 1;
            }
        });

        vm.threadDumpAll = vm.threadDumpRunnable + vm.threadDumpWaiting +
            vm.threadDumpTimedWaiting + vm.threadDumpBlocked;

        function cancel () {
            $uibModalInstance.dismiss('cancel');
        }

        function getLabelClass (threadState) {
            if (threadState === 'RUNNABLE') {
                return 'label-success';
            } else if (threadState === 'WAITING') {
                return 'label-info';
            } else if (threadState === 'TIMED_WAITING') {
                return 'label-warning';
            } else if (threadState === 'BLOCKED') {
                return 'label-danger';
            }
        }
    }
})();
