package br.gov.go.agr.webapp.controller;

import javax.inject.Inject;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

import br.com.caelum.vraptor.Controller;
import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Post;
import br.com.caelum.vraptor.Result;

/**
 * <p>Controla o processo de autenticação de usuários do sistema.</p>
 * 
 * @author thiago-amm
 * @version v1.0.0 21/09/2017
 * @since v1.0.0
 */
@Controller
public class AutenticacaoController {
   
   @Inject
   Result result;
   
   @Get("/login")
   public void form() {
      
   }
   
   @Post("/logout")
   @Get("/logout")
   public void logout() {
      Subject subject = SecurityUtils.getSubject();
      subject.logout();
      result.redirectTo(this).form();
   }
   
}
