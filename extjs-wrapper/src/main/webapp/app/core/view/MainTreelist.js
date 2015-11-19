Ext.define('kalix.core.view.MainTreelist', {
    extend: 'Ext.list.Tree',
    xtype: 'maintreelist',
    constructor: function () {
        this.callParent(arguments);


        var navigationTreeStore = this.getStore('NavigationTree');
        var self = this;
        var last = [];

        navigationTreeStore.on("beforeload", function () {
            last = [];
            navigationTreeStore.each(function (recorder) {
                last.push(recorder);
            });
            navigationTreeStore.treeSelInfo.tree=this;
        }, this);

        navigationTreeStore.on("load", function () {
            _.each(last, function (item) {
                var destoryItem = self.getItem(item);
                //if the module parent item has been destroy.
                //the child menu item will auto release.
                //this will happen in case that module is expanded.
                if (destoryItem != null) {
                    destoryItem.destroy();
                }
            });

            var hasFind=false;
            //the auto select tree item logic.
            navigationTreeStore.each(function (recorder) {
                var item = self.getItem(recorder);

                if (navigationTreeStore.treeSelInfo.selected) {
                    var childNodes=item.getNode().childNodes;

                    for(var idx=0;idx<childNodes.length;++idx)
                    {
                        var childItem=self.getItem(childNodes[idx]);
                        //we don't care about the app level anchor.
                        //we just match the menu level anchor.
                        //so we can config the menu unit to any module.
                        if(childItem.getNode().getData().routeId.split('/')[1]==navigationTreeStore.treeSelInfo.level2){
                            item.expand();
                            self.setSelection(childItem.getNode());
                            hasFind=true;
                            break;
                        }
                    }

                    if(hasFind)
                    {
                        return false;
                    }
                }
            });

        }, this);

    }
});
