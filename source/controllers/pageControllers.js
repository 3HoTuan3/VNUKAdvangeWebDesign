
exports.about = (req, res) => {
    res.render('about', { title: 'Giới thiệu' });
};

exports.contact = (req, res) => {
    res.render('contacts', { title: 'Liên hệ' });
};