<%@ include file="/WEB-INF/jsp/includes/header.jsp"%>
<b:container
    style="margin-top: 100px;"
    ng-controller="LoginController">
    <form
        class="autenticacao"
        name="form"
        ng-submit="login(usuario)"
        novalidate>
        <i class="autenticacao fa fa-address-book-o fa-5x"></i>
        <h1
            class="autenticacao"
            style="text-align: center;">Login</h1>
        <b:row>
            <b:column class="col-md-12">
                <b:formgroup>
                    <b:inputgroup
                        ng-style="(form.login.$touched || form.login.$dirty) && form.login.$invalid ? {border: '1px solid #a94442'} : {border: 'auto'}">
                        <b:inputgroupaddon
                            ng-style="(form.login.$touched || form.login.$dirty) && form.login.$invalid ? {color: '#a94442'} : {color: 'auto'}">
                            <i
                                class="fa fa-user"
                                aria-hidden="true"></i>
                        </b:inputgroupaddon>
                        <b:formcontrol
                            type="text"
                            id="login"
                            name="login"
                            placeholder="Usuário"
                            class="autenticacao login"
                            ng-model="usuario.login"
                            ng-required="true" />
                        <span
                            class="glyphicon glyphicon-remove form-control-feedback autenticacao"
                            ng-show="(form.login.$touched || form.login.$dirty) && form.login.$invalid"></span>
                    </b:inputgroup>
                    <span
                        class="help-block autenticacao"
                        ng-show="(form.login.$touched || form.login.$dirty) && form.login.$invalid">Campo de preenchimento obrigatório.</span>
                    <b:inputgroup
                        ng-style="(form.senha.$touched || form.senha.$dirty) && form.senha.$invalid ? {border: '1px solid #a94442'} : {border: auto}">
                        <b:inputgroupaddon
                            ng-style="(form.senha.$touched || form.senha.$dirty) && form.senha.$invalid ? {color: '#a94442'} : {color: 'auto'}">
                            <i
                                class="fa fa-key"
                                aria-hidden="true"></i>
                        </b:inputgroupaddon>
                        <b:formcontrol
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            class="autenticacao senha"
                            ng-model="usuario.senha"
                            ng-required="true" />
                        <span
                            class="glyphicon glyphicon-remove form-control-feedback"
                            ng-show="(form.senha.$touched || form.senha.$dirty) && form.senha.$invalid"></span>
                    </b:inputgroup>
                    <span
                        class="help-block"
                        ng-show="(form.senha.$touched || form.senha.$dirty) && form.senha.$invalid">Campo de preenchimento obrigatório!</span>
                </b:formgroup>
            </b:column>
        </b:row>
        <b:row>
            <b:column class="col-md-12">
                <b:formgroup>
                    <b:button
                        type="submit"
                        name="entrar"
                        class="btn btn-sm btn-primary autenticacao"
                        ng-disabled="form.$invalid">
                        <i class="fa fa-sign-in"></i>ENTRAR</b:button>
                </b:formgroup>
            </b:column>
        </b:row>
    </form>
</b:container>
<script src="/webapp/static/js/angular/controllers/login-controller.js"></script>
<%@ include file="/WEB-INF/jsp/includes/footer.jsp"%>