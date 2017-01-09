
app.factory('SentencesService', function ($http) {

    return {
        get: function (sententesDb, tableDb) {
            return sententesDb.select().from(tableDb).exec();
        },
        addSentence: function (sententesDb, tableDb, sentence) {

            var row = tableDb.createRow({
                'id': 1,
                'content': sentence,
                'lastPractice': null
            });

            return sententesDb.insertOrReplace().into(tableDb).values([row]).exec();

        }
    };
});