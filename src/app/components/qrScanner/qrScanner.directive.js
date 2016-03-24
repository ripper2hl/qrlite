(function() {
  'use strict';

  angular
    .module('qrlite')
    .directive('qrScanner', ['qrService',qrScanner]);

  /** @ngInject */
  function qrScanner(qrService) {
    var directive = {
      restrict: 'A',
      link: qrScannerLink
    }

    return directive;

    function qrScannerLink(scope, element, attrs){
      qrService.setQr(initQrScanner(element));
      qrService.getQr().play();

      element.bind('click',fullscreen);

      function fullscreen(){
        console.log(attrs.id);
        var elem = document.getElementById(attrs.id);
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        }
      }

      /**
        * 25/02/2016
        * Inicializa el lector de codigos
        * @returns decoder objeto para manipular el inicio y fin del lector de codigos.
        * @author Jesus Perales.
        */
       function initQrScanner(element){
       	var options = {
                   DecodeQRCodeRate: 5,
                   DecodeBarCodeRate: 5,
                   successTimeout: 500,
                   codeRepetition: true,
                   tryVertical: true,
                   frameRate: 15,
                   width: 320,
                   height: 480,
                   constraints: {
                       video: {
                           mandatory: {
                               maxWidth: 1280,
                               maxHeight: 720
                           },
                           optional: [{
                               sourceId: true
                           }]
                       },
                       audio: false
                   },
                   flipVertical: false,
                   flipHorizontal: false,
                   zoom: -1,
                   beep: 'assets/plugins/webcodecamjs/audio/beep.mp3',
                   decoderWorker: 'assets/plugins/webcodecamjs/js/DecoderWorker.js',
                   brightness: 0,
                   autoBrightnessValue: false,
                   grayScale: false,
                   contrast: 0,
                   threshold: 0,
                   sharpness: [],
                   resultFunction: qrSuccess,
                   cameraSuccess: function(stream) {
                       console.log('cameraSuccess');
                   },
                   canPlayFunction: function() {
                       console.log('canPlayFunction');
                   },
                   getDevicesError: function(error) {
                   	console.error('Error al encender la camara');
                   },
                   getUserMediaError: function(error) {
                   	console.error('Error al encender la camara');
                   },
                   cameraError: function(error) {
                   	console.error('Error al encender la camara');
                   }
               };
       	var decoder = $(element).WebCodeCamJQuery(options).data().plugin_WebCodeCamJQuery;
       	decoder.init();
       	return decoder;
       }

       /**
        * 25/02/2016
        * Acciones a realizar al leer correctamente
        * un codigo.
        * @param result resultado de la lectura
        * @author Jesus Perales.
        */
        function qrSuccess(result){
       	console.debug('qrSuccess -->');
         document.cancelFullScreen();
         qrService.getQr().stop();
         scope.$emit('scannerSuccess', result);
         console.log(result);
       	console.debug('qrSuccess //>');
       }

    }
  }

})();
