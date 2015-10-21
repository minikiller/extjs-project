/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('kalix.core.controller.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onRouteChange'
            }
        }
    },

    routes: {
        ':node': 'onRouteChange'
    },

    //willdo
    setCurrentView: function (hashTag) {
        hashTag = hashTag || '';
        hashTag = hashTag.path.join('.');
        var mainCard = this.getReferences().mainCardPanel;
        var mainLayout = mainCard.getLayout();
        var lastView = this.getViewModel().getData().currentView;
        var existingItem = mainCard.child('component[routeId=' + hashTag + ']');
        var newView;

        // Kill any previously routed window
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }

        lastView = mainLayout.getActiveItem();
        if (!existingItem) {
            console.log(hashTag);
            console.log('kalix.' + (hashTag || 'pages.Error404Window') + '.Main');
            newView = Ext.create('kalix.' + (hashTag || 'pages.Error404Window') + '.Main', {
                hideMode: 'offsets',
                routeId: hashTag
            });
        }

        if (!newView || !newView.isWindow) {
            // !newView means we have an existing view, but if the newView isWindow
            // we don't add it to the card layout.
            if (existingItem) {
                // We don't have a newView, so activate the existing view.
                if (existingItem !== lastView) {
                    mainLayout.setActiveItem(existingItem);
                }
                newView = existingItem;
            }
            else {
                // newView is set (did not exist already), so add it and make it the
                // activeItem.
                Ext.suspendLayouts();
                mainLayout.setActiveItem(mainCard.add(newView));
                Ext.resumeLayouts(true);
            }
        }

        var node = node = Ext.getStore('NavigationTree').findNode('routeId', hashTag);
        this.getReferences().navigationTreeList.setSelection(node);

        if (newView.isFocusable(true)) {
            newView.focus();
        }

        //vmData.currentView = newView;
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        if (node && node.get('view')) {
            this.redirectTo(node.get("routeId"));
        }
    },

    onToggleNavigationSize: function () {
        var me = this,
            refs = me.getReferences(),
            navigationList = refs.navigationTreeList,
            wrapContainer = refs.mainContainerWrap,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 64 : 250;

        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            refs.senchaLogo.setWidth(new_width);

            navigationList.setWidth(new_width);
            navigationList.setMicro(collapsing);

            Ext.resumeLayouts(); // do not flush the layout here...

            // No animation for IE9 or lower...
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout();  // ... since this will flush them
        }
        else {
            if (!collapsing) {
                // If we are leaving micro mode (expanding), we do that first so that the
                // text of the items in the navlist will be revealed by the animation.
                navigationList.setMicro(false);
            }

            // Start this layout first since it does not require a layout
            refs.senchaLogo.animate({dynamic: true, to: {width: new_width}});

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            navigationList.width = new_width;
            wrapContainer.updateLayout({isRoot: true});

            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            if (collapsing) {
                navigationList.on({
                    afterlayoutanimation: function () {
                        navigationList.setMicro(true);
                    },
                    single: true
                });
            }
        }
    },

    onRouteChange: function (hash) {
        hash = this.parseHash(hash);
        Ext.getStore('MainToolbar').load();
        Ext.getStore('NavigationTree').load(this.getFirstPath(hash));
        this.setCurrentView(hash);
    },


    getFirstPath: function (hashObj) {
        return hashObj.path[0];
    },


    // admin/deashoard?name=soni
    parseHash: function (hash) {
        var ary = hash.split('?');
        var path = ary[0];
        var query = '';
        if (ary.length > 1) {
            query = ary[1];
        }
        return {
            path: path.split('/'),
            query: this.parseQuery(query)
        };
    },

    parseQuery: function (query) {
        if (!query) {
            return query;
        }
        var querys = query.split('&');
        return querys.reduce(function (previousValue, currentValue) {
            var ary = currentValue.split('=');
            var key = ary[0];
            var value = ary[1];
            if (previousValue[key] !== undefined) {
                if (Array.isArray(previousValue[key])) {
                    previousValue[key].push(value);
                } else {
                    previousValue[key] = [previousValue[key], value];
                }
            } else {
                previousValue[key] = value;
            }

            return previousValue;
        }, {});
    }
});
