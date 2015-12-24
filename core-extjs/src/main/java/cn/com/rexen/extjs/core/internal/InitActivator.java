package cn.com.rexen.extjs.core.internal;

import cn.com.rexen.core.util.SystemUtil;
import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;

/**
 * Created by sunlf on 14-3-23.
 */
public class InitActivator implements BundleActivator {

    private static final String BUNDLE_NAME = " Extjs Core Web ";
    //private static BundleContext context;
    //private static Logger logger = Logger.getLogger(InitActivator.class);
    //private ServiceReference reference;
    //private HttpService httpService;

    @Override
    public void start(BundleContext bundleContext) throws Exception {
        SystemUtil.succeedPrintln(String.format("Start-up %s bundle!!", BUNDLE_NAME));
        //context = bundleContext;
        //reference = bundleContext.getServiceReference(HttpService.class.getName());
    }

    @Override
    public void stop(BundleContext bundleContext) throws Exception {
        SystemUtil.succeedPrintln(String.format("Stop %s bundle!!", BUNDLE_NAME));

        //if (reference != null){
        //    bundleContext.ungetService(reference);
        //}

        //context = null;
    }
}
