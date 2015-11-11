/**
 * @author chenyanxu
 */
Ext.define('kalix.admin.dict.component.DictGridColumn', {
    extend: 'Ext.grid.column.Template',
    tpl: "",
    alias: 'widget.dictGridColumn',
    xtype:'dictGridColumn',
    listeners:{
        beforerender:function(){
            var store=kalix.getApplication().getStore('dictNoPageStore');

            store.filter('type',this.dictType);

            var data=store.getData().clone().items;

            if(data.length>0){
                var tplStr='';

                for(var idx=0;idx<data.length;++idx){
                    var tempValue=data[idx].data.value;
                    var tempLabel=data[idx].data.label;

                    tplStr+='<tpl if="'+this.dictType+'=='+tempValue+'">'+tempLabel+'</tpl>'
                }

                var tpl = new Ext.XTemplate(tplStr);
                this.tpl=tpl;
            }
            else{
                this.tpl="<tpl>{"+this.dictType+"}</tpl>"
            }

            return true;
        }
    }
});