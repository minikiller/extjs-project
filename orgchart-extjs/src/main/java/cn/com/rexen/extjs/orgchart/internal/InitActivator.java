package cn.com.rexen.extjs.orgchart.internal;

import cn.com.rexen.core.api.osgi.KalixBundleActivator;
import cn.com.rexen.core.util.SystemUtil;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;
import org.osgi.service.http.HttpService;

/**
 * @author chenyanxu
 */
public class InitActivator extends KalixBundleActivator {
    private static final String BUNDLE_NAME = " Extjs OrgChart Web ";
    private ServiceReference reference;
    private HttpService httpService;


    @Override
    public void start(BundleContext bundleContext) throws Exception {
        SystemUtil.succeedPrintln(String.format("Start-up %s bundle!!", BUNDLE_NAME) + bundleContext.getBundle());

        reference = bundleContext.getServiceReference(HttpService.class.getName());
        httpService = (HttpService) bundleContext.getService(reference);

        httpService.registerResources(contextPath + "/app/orgchart", "/orgchart", null);
        httpService.registerResources(contextPath + "/orgchart/resources", "/resources", null);
    }

    @Override
    public void stop(BundleContext bundleContext) throws Exception {
        SystemUtil.succeedPrintln(String.format("Stop %s bundle!!", BUNDLE_NAME) + bundleContext.getBundle());

        if (reference != null)
            bundleContext.ungetService(reference);

        if(httpService!=null){
            httpService.unregister(contextPath + "/app/orgchart");
            httpService.unregister(contextPath + "/orgchart/resources");
        }
    }
}
