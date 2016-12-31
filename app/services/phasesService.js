var schemaBuilder = lf.schema.create('phases', 1);

schemaBuilder.createTable('Phase').
    addColumn('id', lf.Type.INTEGER).
    addColumn('content', lf.Type.STRING).
    addColumn('checked', lf.Type.BOOLEAN).
    addPrimaryKey(['id'], true);

var todoDb;
var item;

schemaBuilder.connect().then((db) => {
    todoDb = db;
    item = todoDb.getSchema().table('Phase');
});

/*
return todoDb.insertOrReplace().into(item).values([row]).exec()
        .then(() => {
            navigator.serviceWorker.ready.then(reg => reg.sync.register('send-messages'))
                .then(() => console.log('Sync registered!'))
                .catch(() => console.log('Sync registration failed :('));
        });
 */

app.factory('PhasesService', function($http) {
    return {
        getUnchecked: function(id) {
            return "";
        }
    };
});