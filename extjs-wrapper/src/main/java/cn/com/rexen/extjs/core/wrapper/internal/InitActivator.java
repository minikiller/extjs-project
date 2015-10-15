package cn.com.rexen.extjs.core.wrapper.internal;

import cn.com.rexen.core.util.SystemUtil;
import org.apache.log4j.Logger;
import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;
import org.osgi.service.http.HttpService;

public class InitActivator implements BundleActivator {
    private static final String BUNDLE_NAME = " Extjs Wrapper ";
    private static BundleContext context;
    private static Logger logger = Logger.getLogger(InitActivator.class);
    private ServiceReference reference;
    private HttpService httpService;

    @Override
    public void start(BundleContext bundleContext) throws Exception {
        SystemUtil.succeedPrintln(String.format("Start-up %s bundle!!", BUNDLE_NAME));
        context = bundleContext;
        reference = bundleContext.getServiceReference(HttpService.class.getName());
        httpService = (HttpService) bundleContext.getService(reference);
        httpService.registerResources("/core-web/ext-5.1.0", "/ext-5.1.0", null);
        httpService.registerResources("/kalix/Ext", "/ext-6.0.0", null);
    }

    @Override
    public void stop(BundleContext bundleContext) throws Exception {
        SystemUtil.succeedPrintln(String.format("Stop %s bundle!!", BUNDLE_NAME));
        if (reference != null)
            bundleContext.ungetService(reference);
        context = null;

        if(httpService!=null){
            httpService.unregister("/core-web");
        }

    }
}
