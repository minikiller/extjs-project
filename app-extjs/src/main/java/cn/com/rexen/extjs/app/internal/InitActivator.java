package cn.com.rexen.extjs.app.internal;

import cn.com.rexen.core.api.osgi.KalixBundleActivator;
import cn.com.rexen.core.util.SystemUtil;
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
public class InitActivator extends KalixBundleActivator {

    private static final String BUNDLE_NAME = " Extjs Admin App ";
    private ServiceReference reference;
    private HttpService httpService;

    @Override
    public void start(BundleContext bundleContext) throws Exception {
        SystemUtil.succeedPrintln(String.format("Start-up %s bundle!!", BUNDLE_NAME) + bundleContext.getBundle());

        reference = bundleContext.getServiceReference(HttpService.class.getName());
        httpService = (HttpService) bundleContext.getService(reference);
        httpService.registerResources(contextPath + "/app/app", "/app", null);
        httpService.registerResources(contextPath + "/app/resources/images", "/resources/images", null);
    }

    @Override
    public void stop(BundleContext bundleContext) throws Exception {
        SystemUtil.succeedPrintln(String.format("Stop %s bundle!!", BUNDLE_NAME) + bundleContext.getBundle());

        if (reference != null)
            bundleContext.ungetService(reference);

        if (httpService != null) {
            httpService.unregister(contextPath + "/app/app");
            httpService.unregister(contextPath + "/app/resources/images");
        }
    }
}
