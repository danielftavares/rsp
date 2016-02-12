package rtp;

import java.util.Hashtable;
import java.util.UUID;

import javax.naming.Context;
import javax.naming.NameClassPair;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import javax.naming.ldap.Control;
import javax.naming.ldap.InitialLdapContext;
import javax.naming.ldap.LdapContext;
import javax.naming.ldap.SortControl;

public class Teste {
	
	public static void main(String[] args) {
		Hashtable env = new Hashtable();
		env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
		env.put(Context.PROVIDER_URL, "ldap://sonora.procergs.reders:389");
//		env.put(Context.SECURITY_AUTHENTICATION, "simple");
//
//		// Authenticate as S. User and password "mysecret"
//		env.put(Context.SECURITY_PRINCIPAL, "procergs-daniel-tavares");
//		env.put(Context.SECURITY_PRINCIPAL, "procergs-daniel-tavares");
//		env.put(Context.SECURITY_CREDENTIALS, "p@Cadela3112");

		// Create the initial context
		try {
			LdapContext ctx = new InitialLdapContext(env, null);
//			ctx.set
			
//				ctx.getResponseControls();
//				NamingEnumeration<NameClassPair> contentsEnum = ctx.list("DC=procergs"); 
//	            while (contentsEnum.hasMore())
//	            {
//	                NameClassPair ncp =  contentsEnum.next();
//	                String userName = ncp.getName();
//	                System.out.println("User: "+userName); 
//	            }
//				
		      SearchControls ctls = new SearchControls();
		      ctls.setSearchScope(2);
		      String[] atrib = { "uid" , "cn", "jpegPhoto"};
		      ctls.setReturningAttributes(atrib);
		      ctls.setCountLimit(100L);
		      
		      NamingEnumeration<SearchResult> sr = ctx.search("ou=procergs,o=estado,c=br","uid=procergs-daniel-tavares", ctls);
		      String uds = null;
		      while(sr.hasMore()){
		    	  SearchResult sre =  sr.next();
		    	  uds = sre.getNameInNamespace();
		    	  System.out.println(sre.getAttributes().get("jpegPhoto").get());
		      }
		      
		      
		      
		      
				env = new Hashtable();
				env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
				env.put(Context.PROVIDER_URL, "ldap://sonora.procergs.reders:389");
				env.put(Context.SECURITY_AUTHENTICATION, "simple");
		//
//				// Authenticate as S. User and password "mysecret"
//				env.put(Context.SECURITY_PRINCIPAL, "procergs-daniel-tavares");
				env.put(Context.SECURITY_PRINCIPAL, uds);
				env.put(Context.SECURITY_CREDENTIALS, "p@Cadela3112");
				ctx = new InitialLdapContext(env, null);
		} catch (NamingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
