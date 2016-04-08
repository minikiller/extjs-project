package cn.com.rexen.extjs.core.wrapper.internal;

import cn.com.rexen.core.api.osgi.KalixBundleActivator;
import cn.com.rexen.core.util.SystemUtil;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;
import org.osgi.service.http.HttpService;

public class InitActivator extends KalixBundleActivator {
    private static final String BUNDLE_NAME = " Extjs Wrapper ";
    private ServiceReference reference;
    private HttpService httpService;

    @Override
    public void start(BundleContext bundleContext) throws Exception {
        SystemUtil.succeedPrintln(String.format("Start-up %s bundle!!", BUNDLE_NAME) + bundleContext.getBundle());

        reference = bundleContext.getServiceReference(HttpService.class.getName());
        httpService = (HttpService) bundleContext.getService(reference);

        httpService.registerResources(contextPath + "/Ext", "/ext-6.0.0", null);
        httpService.registerResources(contextPath + "/resources", "/resources", null);
        httpService.registerResources(contextPath + "/app", "/app", null);
        httpService.registerResources(contextPath + "/bpmn", "/bpmn", null);
    }

    @Override
    public void stop(BundleContext bundleContext) throws Exception {
        SystemUtil.succeedPrintln(String.format("Stop %s bundle!!", BUNDLE_NAME) + bundleContext.getBundle());
        if (reference != null)
            bundleContext.ungetService(reference);

        if(httpService!=null){
            httpService.unregister(contextPath + "/Ext");
            httpService.unregister(contextPath + "/resources");
            httpService.unregister(contextPath + "/app");
            httpService.unregister(contextPath + "/bpmn");
        }

    }
}
