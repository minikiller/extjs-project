package cn.com.rexen.extjs.attachment.internal;

import cn.com.rexen.core.util.SystemUtil;
import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;
import org.osgi.service.http.HttpService;

//import org.apache.log4j.Logger;

/**
 * Created by sunlf on 14-3-23.
 */
public class InitActivator implements BundleActivator {

    private static final String BUNDLE_NAME = " Extjs Attachment Web ";
    //private static BundleContext context;
    // private static Logger logger = Logger.getLogger(InitActivator.class);
    private ServiceReference reference;
    private HttpService httpService;

    @Override
    public void start(BundleContext bundleContext) throws Exception {
        SystemUtil.succeedPrintln(String.format("Start-up %s bundle!!", BUNDLE_NAME));
        //context = bundleContext;

        reference = bundleContext.getServiceReference(HttpService.class.getName());
        httpService = (HttpService) bundleContext.getService(reference);
        httpService.registerResources("/kalix/app/attachment", "/attachment", null);
        httpService.registerResources("/kalix/attachment/resources/images", "/resources/images", null);
    }

    @Override
    public void stop(BundleContext bundleContext) throws Exception {
        SystemUtil.succeedPrintln(String.format("Stop %s bundle!!", BUNDLE_NAME));

        if (httpService != null) {
            httpService.unregister("/kalix/app/attachment");
            httpService.unregister("/kalix/attachment/resources/images");
        }

        if (reference != null)
            bundleContext.ungetService(reference);
        //context = null;
    }
}
