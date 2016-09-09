module.exports = function (request) {
    return function (req, res) {
        var id = req.params.id;
        request
            .get('localhost:5984/notions/' + id)
            .end(function (err, doc) {
                var notion = JSON.parse(doc.text);
                res.status(200).render('notion/notion', {notion: notion});
            });
    }
};