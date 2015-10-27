package cn.com.rexen.extjs.app.internal;

import cn.com.rexen.core.util.SystemUtil;
import org.apache.log4j.Logger;
import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;
import org.osgi.service.http.HttpService;

/**
 * 应用管理启动监听器
 *
 * @author majian <br/>
 *         date:2015-7-24
 * @version 1.0.0
 */
public class InitActivator implements BundleActivator {

    private static final String BUNDLE_NAME = " Extjs Admin App ";
    private static BundleContext context;
    private static Logger logger = Logger.getLogger(InitActivator.class);
    private ServiceReference reference;

    @Override
    public void start(BundleContext bundleContext) throws Exception {
        SystemUtil.succeedPrintln(String.format("Start-up %s bundle!!", BUNDLE_NAME));
        context = bundleContext;

        reference = bundleContext.getServiceReference(HttpService.class.getName());
        HttpService httpService = (HttpService) bundleContext.getService(reference);
        httpService.registerResources("/kalix/app/app", "/app", null);
        httpService.registerResources("/kalix/app/resources/images", "/resources/images", null);
    }

    @Override
    public void stop(BundleContext bundleContext) throws Exception {
        SystemUtil.succeedPrintln(String.format("Stop %s bundle!!", BUNDLE_NAME));

        if (reference != null)
            bundleContext.ungetService(reference);
        context = null;
    }
}
