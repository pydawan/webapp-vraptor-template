/**
 * @author thiago-amm
 * @version v1.0.0
 * @date 21/09/2017
 */

var app = angular.module('WebApp');

app.factory('$api', function($http) {
    var url = '';
    var tipoConteudo = {
        'json' : {
            'Content-Type' : 'application/json;charset=UTF-8'
        },
        'xml' : {
            'Content-Type' : 'application/xml;charset=UTF-8'
        }
    };
    return {
        'buscar' : function(entidade, formato) {
            url = '/ramais/api/{0}.{1}'.format(entidade, formato);
            console.log('BUSCANDO {0} em: {1}'.format(entidade.upper(), url));
            return $http.get(url);
        },
        'buscarPeloId' : function(entidade, id, formato) {
            url = '/ramais/api/{0}.{1}/id={2}'.format(entidade, formato, id);
            console.log('BUSCANDO {0} PELO ID em: {1}'.format(entidade.upper(), url));
            return $http.get(url);
        },
        'buscarPelaSituacao' : function(entidade, situacao, formato) {
            url = '/ramais/api/{0}.{1}/situacao={2}'.format(entidade, formato, situacao);
            console.log('BUSCANDO {0} PELA SITUAÇÃO em: {1}'.format(entidade.upper(), url));
            return $http.get(url);
        },
        'buscarPeloNome' : function(entidade, nome, formato) {
            url = '/ramais/api/{0}.{1}/nome={2}'.format(entidade, formato, nome);
            console.log('BUSCANDO {0} PELO NOME em: {1}'.format(entidade.upper(), url));
            return $http.get(url);
        },
        'total' : function(entidade, formato) {
             url = '/ramais/api/{0}.{1}/total'.format(entidade, formato);
             console.log('TOTALIZANDO (AS/OS) {0}  CADASTRAD(AS/OS) em: {1}'.format(entidade.upper(), url));
            return $http.get(url);
        },
        'totalPeloNome' : function(entidade, nome, formato) {
            url = '/ramais/api/{0}.{1}/nome={2}/total'.format(entidade, formato, nome);
            console.log('TOTALIZANDO (AS/OS) {0}  CADASTRAD(AS/OS) PELO NOME em: {1}'.format(entidade.upper(), url));
            return $http.get(url);
        },
        'buscarPagina' : function(entidade, pagina, formato, registros) {
            if (registros === undefined) {
                url = '/ramais/api/{0}.{1}/p={2}'.format(entidade, formato, pagina);
            } else {
                url = '/ramais/api/{0}.{1}/p={2}/r={3}'.format(entidade, formato, pagina, registros);
            }
            console.log('BUSCANDO PÁGINA DE {0} em: {1}'.format(entidade.upper(), url));
            return $http.get(url);
        },
        'salvar' : function(entidade, parametros) {
            url = "/ramais/api/{0}".format(entidade);
            parametros = angular.toJson(parametros);
            if (parametros.id != 0) {
                console.log('ADICIONANDO {0} em: {1}'.format(entidade.upper(), url));
                return $http.put(url, parametros, { headers : tipoConteudo.json });
            } else {
                console.log('EDITANDO {0} em: {1}'.format(entidade.upper(), url));
                return $http.post(url, parametros, { headers : tipoConteudo.json });
            }
        },
        'remover' : function(entidade, parametros) {
            url = "/ramais/api/{0}".format(entidade);
            parametros = angular.toJson(parametros);
            console.log('REMOVENDO {0} em: {1}'.format(entidade.upper(), url));
            // $http.delete não suporta o envio de dados exceto se for na url.
            return $http({
                method: 'DELETE',
                url: url,
                headers: tipoConteudo.json,
                data: parametros
            });
        },
        'pesquisar' : function(entidade, nome, pagina, registros, formato) {
            url = '/ramais/api/{0}.{1}/nome={2}/p={3}/r={4}'.format(entidade, formato, nome, pagina, registros);
            console.log('PESQUISANDO {0} em: {1}'.format(entidade.upper(), url));
            return $http.get(url);
        },
        'login' : function(usuario) {
            parametros = angular.toJson(usuario);
            return $http.post('/cadservidor/login', parametros, { headers : tipoConteudo.json });
        }
    };
});

app.factory('$alerta', function(alertify) {
    return {
        'erro' : function(mensagem) {
            alertify.delay(7000).logPosition("top right").error(mensagem);
        }
    };
});

app.factory('$erroHttp', function(alertify) {
    var extrairMensagem = function(erro) {
        var inicio = erro.indexOf('<h1>');
        var fim = erro.indexOf('</h1>');
        var mensagem = erro.substring(inicio, fim);
        mensagem = mensagem.replace('<h1>', '<h5>');
        mensagem = mensagem.replace('HTTP Status 404 - ', '');
        mensagem = mensagem.replace('HTTP Status 500 - ', '');
        return mensagem;
    };
    var mostrarMensagem = function(erro) {
        mensagem = extrairMensagem(erro);
        alertify.delay(7000).logPosition("top right").error(mensagem);
    };
    return {
        'codigo404' : function(erro) {
            mostrarMensagem(erro);
        },
        'codigo500' : function(erro) {
            mostrarMensagem(erro);
        },
        'mensagem' : function(erro, status) {
            switch (status) {
                case '404':
                    codigo404(erro);
                    break;
                case '500':
                    codigo500(erro);
                    break;
                default:
                    mostrarMensagem(erro);
            }
        }
    };
});

app.factory('$form', function() {
    return {
        'bind' : function(entidade, scope) {
            scope.formEntidade = entidade;
            scope.formRegistro = {};
            scope.formRegistro = angular.copy(scope.$eval(entidade), scope.formRegistro);
            scope.formRegistroNovo = angular.copy(scope.formRegistro, scope.formRegistroNovo);
            scope.campoValido = function(campo) {
                return (campo.$touched || campo.$dirty) && campo.$invalid;
            };
            scope.estilizarCampoValidado = function(campo) {
                return scope.campoValido(campo) ? {
                    'border' : '1.5px solid #a94442',
                    'color' : '#a94442'
                } : {
                    'border' : 'auto',
                    'color' : 'auto'
                };
            };
            scope.mensagemValidacao = function(campo) {
                return scope.campoValido(campo) ? {'visibility': 'visible'} : {'visibility': 'hidden'};
            };
            scope.cancelar = function(form) {
                if (form === undefined) {
                    form = $scope.form;
                }
                if (form != null) {
                    scope.formRegistro = angular.copy(scope.formRegistroNovo, scope.formRegistro);
                    form.$setPristine();
                    form.$setUntouched();
                }
            };
        }
    };
});
