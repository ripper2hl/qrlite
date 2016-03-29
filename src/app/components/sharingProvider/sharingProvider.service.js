(function() {
  'use strict';

  angular
      .module('qrlite')
      .service('sharingProvider', sharingProvider);

  /** @ngInject */
  function sharingProvider() {
    var providers = [
      {
        'name': 'facebook'
      },
      {
        'name': 'twitter'
      },
      {
        'name': 'linkedin'
      },
      {
        'name': 'pocket'
      },
      {
        'name': 'evernote'
      },
      {
        'name': 'pinterest'
      },
      {
        'name': 'tumblr'
      },
      {
        'name': 'reddit'
      },
      {
        'name': 'vk'
      },
      {
        'name': 'xing'
      },      
      {
        'name': 'wordpress'
      },
      {
        'name': 'stumbleupon'
      },
      {
        'name': 'buffer'
      },
      {
        'name': 'digg'
      },
      {
        'name': 'delicious'
      },
      {
        'name': 'flipboard'
      },
      {
        'name': 'hackernews'
      }
    ];

    this.getProviders = getProviders;

    function getProviders() {
      return providers;
    }
  }

})();
