package cn.com.rexen.extjs.core.internal;

import cn.com.rexen.core.util.SystemUtil;
import org.apache.camel.component.servlet.DefaultHttpRegistry;
import org.apache.camel.component.servlet.HttpRegistry;
import org.apache.log4j.Logger;
import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;
import org.osgi.service.http.HttpService;

/**
 * Created by sunlf on 14-3-23.
 */
public class InitActivator implements BundleActivator {

    private static final String BUNDLE_NAME = " Extjs Core Web ";
    private static BundleContext context;
    private static Logger logger = Logger.getLogger(InitActivator.class);
    private ServiceReference reference;
    private HttpService httpService;

    @Override
    public void start(BundleContext bundleContext) throws Exception {
        SystemUtil.succeedPrintln(String.format("Start-up %s bundle!!", BUNDLE_NAME));
        context = bundleContext;
        reference = bundleContext.getServiceReference(HttpService.class.getName());
        //httpService = (HttpService) bundleContext.getService(reference);
//        WebContainer webContainer;
//        webContainer.unregisterConstraintMapping();
//        httpService.registerResources("/kalix/view", "/view", null);
    }

    @Override
    public void stop(BundleContext bundleContext) throws Exception {
        SystemUtil.succeedPrintln(String.format("Stop %s bundle!!", BUNDLE_NAME));
        /*if(httpService!=null){
            httpService.unregister("CamelServlet");
        }*/
        HttpRegistry httpRegistry = DefaultHttpRegistry.getHttpRegistry("CamelServlet");
        DefaultHttpRegistry.removeHttpRegistry("CamelServlet");
        if (httpRegistry != null) {
            httpRegistry.unregister(httpRegistry.getCamelServlet("CamelServlet"));
            //httpRegistry = null;
        }

        if (reference != null){
            bundleContext.ungetService(reference);
        }

        context = null;
    }
}
