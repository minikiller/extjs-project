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

                if (destoryItem != null) {
                    destoryItem.destroy();
                }
            });

            var hasFind=false;

            navigationTreeStore.each(function (recorder) {
                var item = self.getItem(recorder);

                if (navigationTreeStore.treeSelInfo.selected) {
                    var routeId=navigationTreeStore.treeSelInfo.level1+ '/' +
                        navigationTreeStore.treeSelInfo.level2;
                    var childNodes=item.getNode().childNodes;

                    for(var idx=0;idx<childNodes.length;++idx)
                    {
                        var childItem=self.getItem(childNodes[idx]);

                        if(childItem.getNode().getData().routeId==routeId){
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
